/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, RefreshCw, Sparkles, X } from "lucide-react";
import { sendChatMessage } from "../services/geminiService";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hi! I'm your Kolkata Event Scout. Looking for tech meetups or startup networking this week?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // Map common UI messages to Gemini history format
      const history = messages.map(msg => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));

      const response = await sendChatMessage(history, userMessage);
      setMessages((prev) => [...prev, { role: "model", text: response }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        id="chat-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-brand-dark text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40 group"
      >
        <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] z-50 flex flex-col border-l border-brand-border"
          >
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-white relative">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-dark flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-brand-dark uppercase tracking-widest leading-tight">Event Scout Assistant</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">V1.0 • Kolkata Guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 border border-brand-border text-gray-400 hover:text-brand-dark hover:border-brand-dark transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-brand-bg/30 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 shrink-0 flex items-center justify-center border font-bold text-[10px] ${msg.role === 'user' ? 'bg-white border-brand-border text-gray-400' : 'bg-brand-dark border-brand-dark text-white'}`}>
                      {msg.role === 'user' ? 'U' : 'B'}
                    </div>
                    <div className={`p-5 text-xs font-medium leading-relaxed shadow-sm ${
                      msg.role === 'user' ? 'bg-brand-dark text-white' : 'bg-white border border-brand-border text-brand-dark'
                    }`}>
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 border border-brand-dark bg-brand-dark flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 text-white animate-spin" />
                    </div>
                    <div className="p-5 bg-white border border-brand-border text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                      Searching India Databases...
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-brand-border bg-white">
              <div className="relative group">
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about events this week..."
                  className="w-full bg-white border border-brand-border px-6 py-4 pr-16 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-brand-dark transition-all placeholder:text-gray-300"
                />
                <button
                  id="send-button"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark text-white flex items-center justify-center hover:bg-black disabled:bg-gray-200 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center text-gray-400 mt-4 font-bold uppercase tracking-[0.3em]">
                Verified May 2026 Sync
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
