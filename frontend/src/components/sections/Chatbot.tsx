// /components/ui/Chatbot.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
// --- DO NOT REMOVE IMPORTS ---
import { useInteraction } from "../../lib/interaction-context";
import { portfolioData } from "../../data/portfolio";
// --- END IMPORTS ---

// Import the new UI component
import { FloatingAiAssistant } from "../ui/glowing-ai-chat-assistant";

type ChatMessage = { role: "user" | "assistant"; content: string };

// REMOVED: buildSuggestions function remains removed

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
      "I'm not sure how to answer that. Try asking about projects or skills.";
    return reply;
  } catch (e: any) {
    console.error("Botpress API error:", e);
    return "I couldn't reach the assistant right now. Try again later.";
  }
}

// Local static answers (kept but unused, as per the original Chatbot.tsx)
function localAnswer(question: string): string | null {
  const q = question.toLowerCase();
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    const p = portfolioData.personal as any;
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
    return `I'm based in ${(portfolioData.personal as any).location}.`;
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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (selectedSkill) {
      if (open) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `You selected ${selectedSkill}. I can show related projects in the Projects section.`,
          },
        ]);
      }
    }
  }, [selectedSkill, open]);

  const handleSend = async (override?: string) => {
    const content = (override ?? input).trim();
    if (!content || isSending) return;

    const userMsg: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput(""); 
    setIsSending(true);

    const reply = await callBotpressApi([...messages, userMsg]);

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setIsSending(false);
  };

  return (
    // Pass the required props
    <FloatingAiAssistant
      open={open}
      setOpen={setOpen}
      input={input}
      setInput={setInput}
      isSending={isSending}
      messages={messages}
      endRef={endRef}
      handleSend={handleSend}
    />
  );
};

export default Chatbot;