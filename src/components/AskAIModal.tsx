import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, RefreshCw, Terminal, ArrowUpRight } from 'lucide-react';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Hello! I am Geist Assistant, powered by Gemini 2.5 Flash on Edge. Ask me anything about edge routing, Next.js 15, AI Gateway caching, or Geist design tokens.'
    }
  ]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userText = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'Request processed.' }]);
      } else {
        simulateReply(userText);
      }
    } catch {
      simulateReply(userText);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateReply = (query: string) => {
    setTimeout(() => {
      let reply = 'Geist platforms utilize near-zero chromatic chrome with high-contrast typography (-2.4px tracking on display) and sub-10ms edge rendering.';
      if (query.toLowerCase().includes('next') || query.toLowerCase().includes('route')) {
        reply = 'Next.js 15 App Router on Geist Edge uses React Server Components (RSC) and automatic ISR revalidation across 350+ POPs.';
      } else if (query.toLowerCase().includes('ai') || query.toLowerCase().includes('gateway')) {
        reply = 'Vercel AI Gateway provides semantic prompt caching, automated rate-limiting, and multi-model fallback with zero setup.';
      } else if (query.toLowerCase().includes('deploy') || query.toLowerCase().includes('price')) {
        reply = 'Deploying on Geist is free for personal projects on the Hobby tier, and $20/mo on Pro for teams requiring 1TB bandwidth and unlimited preview branches.';
      }
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#ebebeb] rounded-[16px] w-full max-w-xl shadow-floating overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#fafafa] border-b border-[#ebebeb] px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#7928ca]" />
            <span className="text-sm font-semibold text-[#171717]">Ask Geist AI Assistant</span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-[#d3e5ff] text-[#0761d1] rounded-[4px]">
              gemini-2.5-flash
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#8f8f8f] hover:text-[#171717] rounded-[4px]"
            id="button-close-ai-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="p-5 max-h-[380px] overflow-y-auto space-y-3.5 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-[12px] ${
                msg.role === 'user'
                  ? 'bg-[#171717] text-white ml-8'
                  : 'bg-[#fafafa] border border-[#ebebeb] text-[#171717] mr-8'
              }`}
            >
              <div className="font-mono text-[10px] text-[#8f8f8f] mb-1 uppercase">
                {msg.role === 'user' ? 'YOU' : 'GEIST AI'}
              </div>
              <p className="leading-relaxed text-sm">{msg.text}</p>
            </div>
          ))}

          {isLoading && (
            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] text-[#8f8f8f] rounded-[12px] text-xs font-mono flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#7928ca]" />
              <span>Generating response via Edge AI Gateway...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3.5 bg-[#fafafa] border-t border-[#ebebeb] flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about Geist tokens, Edge APIs, or Next.js 15..."
            className="flex-1 bg-white border border-[#ebebeb] text-[#171717] text-xs rounded-[6px] px-3.5 py-2.5 focus:outline-none focus:border-[#171717] shadow-whisper"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            id="button-submit-ai-prompt"
            className="bg-[#171717] text-white text-xs font-medium rounded-[6px] px-4 py-2.5 hover:bg-[#333333] transition-colors flex items-center space-x-1"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
