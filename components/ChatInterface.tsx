import React, { useState, useRef, useEffect } from 'react';
import { Agent, Message } from '../types';
import { generateAgentResponse } from '../services/geminiService';
import { Send, X, Bot, User, RefreshCw, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  agent: Agent;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ agent, onClose }) => {
  const storageKey = `synth_hive_chat_${agent.id}`;

  // Initialize state from localStorage if available
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Revive date strings back to Date objects
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      }
    } catch (error) {
      console.warn("Failed to load chat history:", error);
    }
    
    // Default initial state if no history found
    return [
      {
        id: 'init',
        role: 'model',
        content: `**SYSTEM MSG:** Connection established with **${agent.name}**. \n\n${agent.description} How can I assist?`,
        timestamp: new Date()
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClear = () => {
    const newHistory: Message[] = [
        {
          id: Date.now().toString(),
          role: 'model',
          content: `**SYSTEM MSG:** Context cleared. Memory reset for **${agent.name}**. Ready for new input.`,
          timestamp: new Date()
        }
    ];
    setMessages(newHistory);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const streamResult = await generateAgentResponse(agent, history, userMsg.content);
      
      let fullResponseText = '';
      const responseId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, {
        id: responseId,
        role: 'model',
        content: '',
        timestamp: new Date()
      }]);

      for await (const chunk of streamResult) {
         const chunkText = chunk.text();
         fullResponseText += chunkText;
         
         setMessages(prev => prev.map(msg => 
            msg.id === responseId 
                ? { ...msg, content: fullResponseText } 
                : msg
         ));
      }

    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: "```error\nConnection interrupted. Packet loss detected.\n```",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl h-[80vh] bg-zinc-900 border-4 border-nb-contrast shadow-hard-lg flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b-4 border-nb-contrast ${agent.color.replace('text-', 'bg-')} text-black`}>
            <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 border-2 border-black text-white">
                    <Bot size={24} />
                </div>
                <div>
                    <h2 className="font-black text-xl uppercase tracking-tighter">{agent.name}</h2>
                    <div className="flex items-center gap-2 text-xs font-mono opacity-90 font-bold">
                        <span className="w-2 h-2 bg-green-900 rounded-full animate-pulse border border-black"></span>
                        ONLINE // {agent.role}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={handleClear}
                    className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors" 
                    title="Clear Context"
                >
                    <RefreshCw size={20} />
                </button>
                <button onClick={onClose} className="p-2 bg-black border-2 border-black text-white hover:bg-red-600 transition-colors">
                    <X size={20} />
                </button>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-nb-bg relative">
            {/* Grid Pattern BG */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                    <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 shrink-0 border-2 border-nb-contrast flex items-center justify-center ${msg.role === 'user' ? 'bg-nb-orange text-black' : 'bg-zinc-800 text-white'}`}>
                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={`
                            border-2 border-nb-contrast p-4 shadow-hard-sm
                            ${msg.role === 'user' ? 'bg-zinc-100 text-black' : 'bg-zinc-800 text-nb-contrast'}
                        `}>
                            <div className="font-mono text-xs font-bold mb-2 opacity-50 uppercase">
                                {msg.role === 'user' ? 'OPERATOR' : agent.name} // {msg.timestamp.toLocaleTimeString()}
                            </div>
                            <div className={`prose prose-sm prose-p:font-mono font-medium ${msg.role === 'user' ? 'prose-headings:text-black' : 'prose-invert'}`}>
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start relative z-10">
                   <div className="bg-nb-contrast text-black px-4 py-2 font-mono text-sm animate-pulse border-2 border-transparent">
                      AWAITING RESPONSE...
                   </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t-4 border-nb-contrast bg-zinc-900 flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="TRANSMIT MESSAGE..."
                    className="w-full flex-1 border-2 border-nb-contrast p-4 font-mono text-sm focus:outline-none focus:shadow-hard-sm transition-all resize-none h-16 bg-black text-white placeholder-zinc-500"
                />
                <div className="flex justify-end">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider">
                        CHARS: {input.length}
                    </span>
                </div>
            </div>
            <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="bg-nb-contrast text-black px-8 font-bold border-2 border-transparent hover:bg-nb-orange hover:border-nb-contrast hover:shadow-hard disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1 h-full"
            >
                <Send size={24} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;