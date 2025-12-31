
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../../types';

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm Gemini, your student assistant. How can I help you with your studies today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are a helpful student assistant for an Educational OS. Keep responses academic, concise, and safe. Do not provide information related to illegal or restricted activities.",
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      
      const assistantMessage = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection Error: Please ensure you are connected to the Studio_5G network." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a]">
       {/* AI Header */}
       <div className="h-20 border-b border-white/5 flex items-center px-10 gap-4 bg-white/2">
          <div className="p-3 bg-purple-600 rounded-2xl shadow-xl shadow-purple-600/20">
             <BrainCircuit size={28} className="text-white" />
          </div>
          <div>
             <h2 className="text-xl font-bold tracking-tight">Integrated Intelligence</h2>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Models Online • Flash 3.0</span>
             </div>
          </div>
       </div>

       {/* Chat Area */}
       <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {messages.map((m, i) => (
             <div key={i} className={`flex gap-6 animate-fade-in ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  m.role === 'assistant' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                   {m.role === 'assistant' ? <Sparkles size={20} /> : <User size={20} />}
                </div>
                <div className={`max-w-2xl px-6 py-4 rounded-3xl ${
                  m.role === 'assistant' ? 'bg-white/5 border border-white/5' : 'bg-blue-600 text-white shadow-xl shadow-blue-600/10'
                }`}>
                   <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                </div>
             </div>
          ))}
          {loading && (
            <div className="flex gap-6 animate-pulse">
               <div className="w-10 h-10 rounded-xl bg-purple-600/20"></div>
               <div className="h-10 bg-white/5 w-48 rounded-2xl"></div>
            </div>
          )}
       </div>

       {/* Input Area */}
       <div className="p-8 border-t border-white/5 bg-white/2">
          <div className="max-w-4xl mx-auto relative">
             <input 
               autoFocus
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Ask anything about your homework..."
               className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-8 pr-20 text-lg outline-none focus:border-purple-500/50 transition-all shadow-2xl"
             />
             <button 
               onClick={handleSend}
               className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
               disabled={loading}
             >
                <Send size={24} />
             </button>
          </div>
          <p className="text-center mt-4 text-[10px] text-slate-600 font-medium uppercase tracking-[0.2em]">
             Powered by Gemini Pro • Student Edition Restricted Mode
          </p>
       </div>
    </div>
  );
};

export default GeminiChat;
