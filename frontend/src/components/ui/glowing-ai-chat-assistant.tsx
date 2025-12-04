// /components/ui/glowing-ai-chat-assistant.tsx

import React, { useRef, useEffect, type RefObject } from 'react';
// Import only the necessary icons
import { Send, X, MessageCircle, Bot } from 'lucide-react'; 

type ChatMessage = { role: "user" | "assistant"; content: string };

interface FloatingAiAssistantProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  input: string;
  setInput: (input: string) => void;
  isSending: boolean;
  messages: ChatMessage[];
  endRef: RefObject<HTMLDivElement>;
  handleSend: (override?: string) => void;
}

const MAX_CHARS = 2000;

const FloatingAiAssistant: React.FC<FloatingAiAssistantProps> = ({
  open,
  setOpen,
  input,
  setInput,
  isSending,
  messages,
  endRef,
  handleSend,
}) => {
  const charCount = input.length;
  const chatRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        if (!(event.target as HTMLElement).closest('.floating-ai-button')) {
          setOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating 3D Glowing AI Logo */}
      <button
        className={`floating-ai-button relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
          open ? 'rotate-90' : 'rotate-0'
        }`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.8) 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
        <div className="relative z-10">
          {open ? <X className="w-8 h-8 text-white" /> : <MessageCircle className="w-8 h-8 text-white" />}
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500"></div>
      </button>

      {/* Chat Interface */}
      {open && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 transition-all duration-300 origin-bottom-right"
          style={{
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div className="relative flex flex-col h-full rounded-3xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 border border-zinc-500/50 shadow-2xl backdrop-blur-3xl overflow-hidden">

            {/* Header: Increased padding (px-6 pt-4 pb-4) */}
            <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-zinc-700/50">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-white">Portfolio Assistant</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Message Display Area: Increased padding (p-4) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-xl max-w-[85%] whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                        : "bg-zinc-700 text-zinc-100 shadow-md shadow-zinc-700/30"
                    }`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-zinc-700/50">
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1} 
                  className="flex-1 px-3 py-2 resize-none rounded-xl bg-zinc-800 text-white border border-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-500 overflow-hidden min-h-[40px]"
                  placeholder="Type your message..."
                  disabled={isSending}
                />
                
                {/* Send Button */}
                <button
                  onClick={() => handleSend()}
                  disabled={isSending || !input.trim()}
                  className="group relative p-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg hover:from-indigo-500 hover:to-indigo-400 hover:scale-110 hover:shadow-indigo-500/30 active:scale-95 transform disabled:opacity-50 flex-shrink-0"
                  aria-label="Send message"
                  style={{
                    boxShadow: '0 5px 15px rgba(99,102,241,0.4)',
                  }}
                >
                  {isSending ? <Bot className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                </button>
              </div>

              {/* Minimal Footer Info */}
              <div className="flex justify-between mt-2 text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Operational</span>
                </div>
                <div className="text-xs font-medium text-zinc-500">
                    <span>{charCount}</span>/<span className="text-zinc-400">{MAX_CHARS}</span>
                </div>
              </div>
            </div>

            {/* Floating Overlay */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241, 0.05), transparent, rgba(168,85,247, 0.05))'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export { FloatingAiAssistant };