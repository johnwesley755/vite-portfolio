import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useInteraction } from "../../lib/interaction-context";
import { portfolioData } from "../../data/portfolio";

type ChatMessage = { role: "user" | "assistant"; content: string };

function buildSuggestions(selectedSkill: string | null, messages: ChatMessage[]): string[] {
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content.toLowerCase() || "";
    const base: string[] = [];
    if (selectedSkill) {
        base.push(
            `Show projects with ${selectedSkill}`,
            `Certifications related to ${selectedSkill}`,
            "What should I learn next?"
        );
    } else {
        base.push(
            "What projects should I start with?",
            "What are your top skills?",
            "How can I contact you?"
        );
    }
    if (lastUser.includes("contact") || lastUser.includes("email")) {
        return ["Share your email", "Share LinkedIn", "Where are you located?"];
    }
    if (lastUser.includes("certification") || lastUser.includes("certifications")) {
        return ["List all certifications", "Any hackathon achievements?", "Show education highlights"];
    }
    return [...base, "Do you have any certifications?"].slice(0, 4);
}

async function callAiApi(messages: ChatMessage[]): Promise<string> {
    // Optional proxy to avoid CORS/key leaks
    const proxyUrl = import.meta.env.VITE_GEMINI_PROXY_URL as string | undefined;
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    const configuredModel = (import.meta.env.VITE_GEMINI_MODEL as string) || "gemini-1.5-flash";
    try {
        if (proxyUrl) {
            const res = await fetch(proxyUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: configuredModel, messages }),
            });
            if (!res.ok) throw new Error(`Proxy error ${res.status}`);
            const data = await res.json();
            return data.reply || data.text || data.message || "";
        }
        if (!apiKey) throw new Error("Missing Gemini API key");

        const systemPreamble = {
            role: "user",
            parts: [{ text: "You are a helpful portfolio assistant for John Wesley. Answer briefly and point to sections when relevant." }],
        };
        const contents = [systemPreamble, ...messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }))];

        const versions = ["v1beta", "v1"];
        const models = Array.from(new Set([configuredModel, "gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"]));
        let lastErrorText = "";
        for (const v of versions) {
            for (const m of models) {
                const url = `https://generativelanguage.googleapis.com/${v}/models/${m}:generateContent?key=${encodeURIComponent(apiKey)}`;
                try {
                    const res = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ contents }),
                    });
                    if (!res.ok) {
                        lastErrorText = await res.text();
                        // Try next combination on 404/400; otherwise throw
                        if (res.status === 404 || res.status === 400) continue;
                        throw new Error(`${res.status}: ${lastErrorText}`);
                    }
                    const data = await res.json();
                    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) return text;
                } catch (inner) {
                    lastErrorText = (inner as any)?.message || String(inner);
                    continue;
                }
            }
        }
        throw new Error(lastErrorText || "No valid Gemini response");
    } catch (e: any) {
        console.warn("Gemini error", e);
        return `I couldn't reach Gemini right now. Ask about skills, projects, or contact info, or try again later.`;
    }
}

function localAnswer(question: string): string | null {
    const q = question.toLowerCase();
    // Contact
    if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
        const p = portfolioData.personal;
        return `You can contact me at ${p.email}. LinkedIn: ${p.linkedin}. GitHub: ${p.github}.`;
    }
    // Certifications
    if (q.includes("certification") || q.includes("certifications") || q.includes("certified")) {
        const certs = (portfolioData.experiences || []).filter((e: any) => e.type === "certification");
        if (certs.length === 0) return null;
        const summary = certs.map((c: any) => `${c.title} (${c.organization}, ${c.period})`).join("; ");
        return `Certifications: ${summary}. See the Experience section for details.`;
    }
    // Skills overview
    if (q.includes("skill") || q.includes("skills")) {
        const categories = Object.keys(portfolioData.skills || {});
        return `Top skill areas: ${categories.join(", ")}. Click a skill to filter related projects.`;
    }
    // Location
    if (q.includes("location") || q.includes("where are you") || q.includes("based")) {
        const p = portfolioData.personal;
        return `I'm based in ${p.location}.`;
    }
    // Recommendations / getting started
    if (q.includes("start") || q.includes("recommend") || q.includes("begin")) {
        const allProjects: any[] = (portfolioData as any).projects || [];
        const byStars = [...allProjects].sort((a, b) => (b.stars || 0) - (a.stars || 0));
        const top = byStars.slice(0, 3).map((p) => `${p.title} (${p.category})`).join(", ");
        return `Great places to start: ${top}. You can also filter by a skill in the Skills section.`;
    }
    // Projects prompt
    if (q.includes("project") || q.includes("projects")) {
        return "Browse the Projects section. You can filter by category, or click a skill to see matching projects.";
    }
    return null;
}

export const Chatbot: React.FC = () => {
    const { selectedSkill } = useInteraction();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
		{ role: "assistant", content: "Hi! I'm your guide. Ask about projects, skills, or contact." },
	]);
	const endRef = useRef<HTMLDivElement>(null);

    const suggestions = useMemo(() => buildSuggestions(selectedSkill, messages), [selectedSkill, messages]);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, open]);

	useEffect(() => {
		if (selectedSkill) {
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: `You selected ${selectedSkill}. I can show related projects in the Projects section.` },
			]);
		}
	}, [selectedSkill]);

    const handleSend = async (override?: string) => {
        const content = (override ?? input).trim();
        if (!content || isSending) return;
        const userMsg: ChatMessage = { role: "user", content };
		setMessages((prev) => [...prev, userMsg]);
        setInput(override ? input : "");
		setIsSending(true);
        const local = localAnswer(userMsg.content);
        const reply = local || (await callAiApi([...messages, userMsg]));
		setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
		setIsSending(false);
	};

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{!open && (
				<button
					onClick={() => setOpen(true)}
					className="p-4 rounded-full bg-emerald-500 text-black shadow-xl hover:bg-emerald-400 transition"
					aria-label="Open chat"
				>
					<MessageCircle className="w-6 h-6" />
				</button>
			)}

			{open && (
				<div className="w-80 sm:w-96 h-96 bg-black/90 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col">
					<div className="flex items-center justify-between p-3 border-b border-gray-700">
						<div className="text-sm font-semibold text-white">Portfolio Assistant</div>
						<button onClick={() => setOpen(false)} className="p-1 text-gray-300 hover:text-white" aria-label="Close chat">
							<X className="w-4 h-4" />
						</button>
					</div>
					<div className="flex-1 overflow-y-auto p-3 space-y-2">
						{messages.map((m, i) => (
							<div key={i} className={`text-sm ${m.role === "user" ? "text-right" : "text-left"}`}>
								<span className={`inline-block px-3 py-2 rounded-xl ${m.role === "user" ? "bg-emerald-500 text-black" : "bg-gray-800 text-gray-100"}`}>
									{m.content}
								</span>
							</div>
						))}
						<div ref={endRef} />
					</div>
					<div className="p-3 border-t border-gray-700 space-y-2">
                        <div className="flex gap-2 flex-wrap">
                            {suggestions.map((q) => (
                                <button key={q} onClick={() => handleSend(q)} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700">
                                    {q}
                                </button>
                            ))}
						</div>
						<div className="flex items-center gap-2">
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="flex-1 px-3 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 outline-none"
								placeholder="Ask about my work..."
							/>
							<button onClick={handleSend} disabled={isSending} className="px-3 py-2 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50">
								<Send className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chatbot;


