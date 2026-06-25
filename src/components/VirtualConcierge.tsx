import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";
import { Sparkles, MessageSquare, X, Send, CornerDownLeft, MapPin, Coffee, HelpCircle, Calendar } from "lucide-react";

export default function VirtualConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Namaste! I am Devi, your virtual host at Nirvana. How may I assist you in designing your perfect Chamba mountain escape today? I can suggest rooms, design local itineraries, or answer any stay questions.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: "What rooms do you have?", icon: Calendar },
    { text: "Local food suggestions", icon: Coffee },
    { text: "How do I reach Nirvana?", icon: MapPin },
    { text: "Are you pet friendly?", icon: HelpCircle }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Gather raw message list history for the server
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.text || "I am listening to the sound of the wind through the cedar trees. Please rephrase that, dear guest.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error("Concierge query failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I seem to have lost connection with the valley for a second. The mountains are calling, please try sending your note again!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="virtual-concierge-root" className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      <motion.button
        id="concierge-launcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg hover:bg-brand-green-hover transition-colors duration-300 relative group"
        aria-label="Open Virtual Concierge"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-beige opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-beige"></span>
        </span>
        <MessageSquare className="h-6 w-6 group-hover:rotate-6 transition-transform" />
      </motion.button>

      {/* Slide-out Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="concierge-drawer"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[calc(100vh-120px)] rounded-2xl bg-white border border-brand-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-green p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-brand-beige">
                  <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl tracking-wide leading-none">Devi</h3>
                  <p className="text-[10px] text-brand-beige uppercase tracking-wider mt-1">Your Mountain Host</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg/50 no-scrollbar">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-brand-green text-white rounded-br-none"
                        : "bg-white text-brand-text border border-brand-border rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                  </div>
                  <span className="text-[9px] text-brand-text-sec mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="bg-white text-brand-text border border-brand-border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-green/40 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-brand-green/70 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions & Input */}
            <div className="p-4 bg-white border-t border-brand-border space-y-3">
              {/* Quick Prompt Badges */}
              {messages.length === 1 && (
                <div className="grid grid-cols-2 gap-1.5 pb-2">
                  {quickPrompts.map((qp, idx) => {
                    const IconComp = qp.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSend(qp.text)}
                        className="flex items-center gap-1.5 text-[11px] text-brand-text-sec hover:text-brand-green bg-brand-bg hover:bg-brand-beige/20 border border-brand-border rounded-lg p-2 text-left transition-colors duration-200"
                      >
                        <IconComp className="h-3.5 w-3.5 text-brand-green shrink-0" />
                        <span className="truncate">{qp.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Text Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2 border border-brand-border rounded-xl p-1.5 focus-within:border-brand-green/50 bg-brand-bg/25 transition-all"
              >
                <input
                  type="text"
                  placeholder="Ask Devi about staying..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-brand-text-sec/60 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="h-8 w-8 rounded-lg bg-brand-green text-white flex items-center justify-center hover:bg-brand-green-hover disabled:opacity-30 disabled:hover:bg-brand-green transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
