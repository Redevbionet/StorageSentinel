import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { analyzeLogWithGemini } from '../services/geminiService';
import { Send, Bot, User, Terminal, Loader2, FileText, AlertCircle } from 'lucide-react';

const DUMMY_LOGS = `
[2023-10-27 08:00:01] INFO SAN-01: Volume vol_users mounted successfully.
[2023-10-27 08:15:23] WARN OBJ-01: High latency detected on shard-42 (250ms).
[2023-10-27 08:16:05] ERROR OBJ-01: Connection timeout to replication peer 192.168.1.55.
[2023-10-27 08:20:00] INFO NAS-01: Snapshot backup_daily_01 created.
[2023-10-27 08:45:12] CRITICAL RAID-CTRL: Drive 3 in Slot 2 reporting SMART errors. Rebuild pending.
[2023-10-27 09:00:00] INFO SYSTEM: Scheduled maintenance tasks started.
`;

export const LogAnalyzer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello. I am Sentinel, your storage diagnostics assistant. I have access to the recent system logs. How can I assist you with analyzing the storage infrastructure today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await analyzeLogWithGemini(input, DUMMY_LOGS);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex gap-6 animate-fade-in">
      {/* Log Context Panel */}
      <div className="w-1/3 bg-slate-900 rounded-xl border border-slate-700 p-4 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-4 text-slate-300 border-b border-slate-800 pb-3">
          <Terminal size={18} />
          <h3 className="font-mono font-bold">System Logs (Live)</h3>
        </div>
        <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 text-slate-400 bg-black/30 p-3 rounded">
            {DUMMY_LOGS.trim().split('\n').map((line, i) => {
              const isError = line.includes('ERROR') || line.includes('CRITICAL');
              const isWarn = line.includes('WARN');
              return (
                <div key={i} className={`${isError ? 'text-red-400' : isWarn ? 'text-yellow-400' : 'text-slate-400'}`}>
                  {line}
                </div>
              )
            })}
        </div>
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800 rounded text-xs text-blue-300 flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <p>AI Context Loaded: Logs from the last 2 hours. Ask about the RAID Controller critical error or Object Storage latency.</p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 flex gap-3 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-700 text-slate-200'
              }`}>
                <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                   msg.role === 'user' ? 'bg-blue-500' : 'bg-slate-600'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-2xl p-4 flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-blue-400" />
                 <span className="text-xs text-slate-400">Analyzing log patterns...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-800 border-t border-slate-700">
           <div className="relative">
             <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder="Ask about system latency, RAID status, or backup integrity..."
               className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
             />
             <button 
               onClick={handleSend}
               disabled={isLoading || !input.trim()}
               className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               <Send size={18} />
             </button>
           </div>
           <p className="text-center text-xs text-slate-500 mt-2">
             Gemini 2.5 Flash | Storage Diagnostics Mode
           </p>
        </div>
      </div>
    </div>
  );
};