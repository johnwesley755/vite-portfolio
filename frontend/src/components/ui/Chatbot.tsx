import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useInteraction } from "../../lib/interaction-context";
import { portfolioData } from "../../data/portfolio";

type ChatMessage = { role: "user" | "assistant"; content: string };

function buildSuggestions(
  selectedSkill: string | null,
  messages: ChatMessage[]
): string[] {
  const lastUser =
    [...messages]
      .reverse()
      .find((m) => m.role === "user")
      ?.content.toLowerCase() || "";
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
  if (
    lastUser.includes("certification") ||
    lastUser.includes("certifications")
  ) {
    return [
      "List all certifications",
      "Any hackathon achievements?",
      "Show education highlights",
    ];
  }
  return [...base, "Do you have any certifications?"].slice(0, 4);
}

// Call Botpress API
async function callBotpressApi(messages: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_BOTPRESS_API_KEY;

  // This is your specific Bot ID
  const botId = "c8b17e5c-c5dd-47b6-ad7f-c1994436323d";

  if (!apiKey) {
    console.error("VITE_BOTPRESS_API_KEY is not set.");
    return "Bot is not configured properly. (Missing API key)";
  }

  const lastUserMsg = messages[messages.length - 1]?.content || "";

  try {
    // The URL now uses your specific botId
    const res = await fetch(
      `https://api.botpress.cloud/v1/bots/${botId}/converse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          type: "text",
          text: lastUserMsg,
        }),
      }
    );

    if (!res.ok) throw new Error(`Botpress error ${res.status}`);
    const data = await res.json();
    // Extract the first text reply from Botpress
    const reply =
      data?.responses?.[0]?.text ||
      "I'm not sure how to answer that. Try asking about projects, skills, or contact info.";
    return reply;
  } catch (e: any) {
    console.error("Botpress API error:", e);
    return "I couldn't reach the assistant right now. Try again later.";
  }
}

// Local static answers (NO LONGER USED, but left here if you want to re-enable it)
function localAnswer(question: string): string | null {
  const q = question.toLowerCase();
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    const p = portfolioData.personal;
    return `You can contact me at ${p.email}. LinkedIn: ${p.linkedin}. GitHub: ${p.github}.`;
  }
  if (q.includes("certification") || q.includes("certifications")) {
    const certs = (portfolioData.experiences || []).filter(
      (e: any) => e.type === "certification"
    );
    if (!certs.length) return null;
    return certs
      .map((c: any) => `${c.title} (${c.organization}, ${c.period})`)
      .join("; ");
  }
  if (q.includes("skill") || q.includes("skills")) {
    const categories = Object.keys(portfolioData.skills || {});
    return `Top skill areas: ${categories.join(
      ", "
    )}. Click a skill to filter related projects.`;
  }
  if (
    q.includes("location") ||
    q.includes("where are you") ||
    q.includes("based")
  ) {
    return `I'm based in ${portfolioData.personal.location}.`;
  }
  return null;
}

export const Chatbot: React.FC = () => {
  const { selectedSkill } = useInteraction();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your portfolio assistant. Ask me about projects, skills, or contact info.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(
    () => buildSuggestions(selectedSkill, messages),
    [selectedSkill, messages]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (selectedSkill) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `You selected ${selectedSkill}. I can show related projects in the Projects section.`,
        },
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

    // --- MODIFICATION ---
    // This now bypasses the localAnswer function and always calls Botpress
    const reply = await callBotpressApi([...messages, userMsg]);
    // --------------------

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setIsSending(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-4 rounded-full bg-emerald-500 text-black shadow-xl hover:bg-emerald-400 transition-transform hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="w-80 sm:w-96 h-96 bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-700 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-gray-700">
            <div className="text-sm font-semibold text-white">
              Portfolio Assistant
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-gray-300 hover:text-white"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm ${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-xl ${
                    m.role === "user"
                      ? "bg-emerald-500 text-black"
                      : // Adjusted assistant bubble color for better contrast
                        "bg-gray-700 text-gray-100"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-gray-700 space-y-2">
            <div className="flex gap-2 flex-wrap">
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  // Adjusted suggestion chip color
                  className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                // Adjusted input color
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Ask about my work..."
              />
              <button
                onClick={() => handleSend()} // Corrected to call without param
                disabled={isSending}
                className="px-3 py-2 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50 transition"
              >
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
