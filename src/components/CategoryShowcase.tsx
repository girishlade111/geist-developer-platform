import React, { useState } from 'react';
import { Bot, Globe, ShoppingBag, Cpu, Play, Check, RefreshCw, Zap, Server, Activity, ArrowRight } from 'lucide-react';
import { INITIAL_AI_LOGS } from '../data/mockData';
import { AIGatewayLog } from '../types';

export const CategoryShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AI Apps' | 'Web Apps' | 'E-commerce' | 'Edge Functions'>('AI Apps');
  
  // AI Gateway Sandbox State
  const [aiLogs, setAiLogs] = useState<AIGatewayLog[]>(INITIAL_AI_LOGS);
  const [promptInput, setPromptInput] = useState('Explain Edge KV caching vs Redis in 2 sentences.');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Edge KV Test state
  const [kvKey, setKvKey] = useState('user_session_9021');
  const [kvVal, setKvVal] = useState('{"auth": true, "region": "iad1"}');
  const [kvLogs, setKvLogs] = useState<{ action: string; key: string; ms: number }[]>([
    { action: 'READ', key: 'user_session_9021', ms: 1.8 },
    { action: 'WRITE', key: 'cart_state_410', ms: 3.2 },
  ]);

  const handleTestAiGateway = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai-gateway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptInput, model: selectedModel }),
      });

      if (response.ok) {
        const data = await response.json();
        const newLog: AIGatewayLog = {
          id: `log-${Date.now()}`,
          timestamp: 'Just now',
          model: selectedModel,
          prompt: promptInput,
          response: data.response || 'Edge response generated successfully.',
          latencyMs: data.latencyMs || Math.floor(Math.random() * 80) + 40,
          tokens: data.tokens || Math.floor(Math.random() * 200) + 100,
          cost: '$0.00003',
          cached: data.cached || false,
        };
        setAiLogs([newLog, ...aiLogs]);
      } else {
        // Fallback simulation if route isn't hit
        simulateAiResponse();
      }
    } catch {
      simulateAiResponse();
    } finally {
      setIsAiLoading(false);
    }
  };

  const simulateAiResponse = () => {
    setTimeout(() => {
      const answers = [
        'Edge KV provides zero-latency reads directly at edge POP nodes worldwide, whereas standard Redis requires regional TCP hops to a primary database cluster.',
        'Geist Edge Functions terminate TLS at the closest point of presence, reducing global TTFB from 220ms to 12ms.',
        'Vercel AI Gateway automatically handles model retries, semantic caching, and token quota enforcement with zero infrastructure setup.',
      ];
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      const newLog: AIGatewayLog = {
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        model: selectedModel,
        prompt: promptInput,
        response: randomAnswer,
        latencyMs: Math.floor(Math.random() * 60) + 35,
        tokens: Math.floor(Math.random() * 180) + 80,
        cost: '$0.00002',
        cached: Math.random() > 0.5,
      };
      setAiLogs([newLog, ...aiLogs.slice(0, 4)]);
      setIsAiLoading(false);
    }, 600);
  };

  const handleKvWrite = () => {
    const ms = parseFloat((Math.random() * 2 + 1.2).toFixed(1));
    setKvLogs([{ action: 'WRITE', key: kvKey, ms }, ...kvLogs.slice(0, 3)]);
  };

  const handleKvRead = () => {
    const ms = parseFloat((Math.random() * 1.5 + 0.8).toFixed(1));
    setKvLogs([{ action: 'READ', key: kvKey, ms }, ...kvLogs.slice(0, 3)]);
  };

  const tabs = [
    { id: 'AI Apps', label: 'AI Apps', icon: Bot },
    { id: 'Web Apps', label: 'Web Apps', icon: Globe },
    { id: 'E-commerce', label: 'E-commerce', icon: ShoppingBag },
    { id: 'Edge Functions', label: 'Edge Functions', icon: Cpu },
  ] as const;

  return (
    <section id="ai-gateway" className="py-20 bg-[#fafafa] border-b border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="text-center mb-4">
          <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#8f8f8f]">
            WORKLOAD SHOWCASE // BREADTH OF THE PLATFORM
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
            Engineered for every modern web workload.
          </h2>
          <p className="text-[#4d4d4d] text-base max-w-2xl mx-auto mt-2">
            Explore live interactive benchmarks across AI streaming, edge compute, and commerce storefronts.
          </p>
        </div>

        {/* Category Pills Bar ({rounded.pill-category} - 64px) */}
        <div className="flex flex-wrap items-center justify-center gap-2 my-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                id={`pill-category-${tab.id.toLowerCase().replace(/\s+/g, '-')}`}
                className={`flex items-center space-x-2 px-5 py-2 text-sm font-medium rounded-[64px] transition-all shadow-whisper ${
                  isActive
                    ? 'bg-[#171717] text-white shadow-md'
                    : 'bg-white border border-[#ebebeb] text-[#171717] hover:bg-[#f2f2f2]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8f8f8f]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Panel */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-6 shadow-whisper">
          
          {/* TAB 1: AI Apps / AI Gateway Tester */}
          {activeTab === 'AI Apps' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-[#ebebeb] gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0070f3]" />
                    <h3 className="text-lg font-semibold text-[#171717] tracking-tight">
                      Vercel AI Gateway & Semantic Cache
                    </h3>
                  </div>
                  <p className="text-xs text-[#8f8f8f] font-mono mt-0.5">
                    ENDPOINT: https://gateway.geist.app/v1/chat/completions
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs text-[#8f8f8f] font-mono">MODEL:</span>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-white border border-[#ebebeb] text-[#171717] text-xs font-mono rounded-[6px] px-3 py-1.5 focus:outline-none focus:border-[#0070f3]"
                  >
                    <option value="gemini-2.5-flash">gemini-2.5-flash (ultra-fast)</option>
                    <option value="gemini-2.5-pro">gemini-2.5-pro (reasoning)</option>
                  </select>
                </div>
              </div>

              {/* Prompt Input Form */}
              <form onSubmit={handleTestAiGateway} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Ask a question or test AI Gateway prompt caching..."
                  className="flex-1 bg-white border border-[#ebebeb] text-[#171717] text-sm rounded-[6px] px-4 py-2.5 focus:outline-none focus:border-[#171717] shadow-whisper"
                />
                <button
                  type="submit"
                  disabled={isAiLoading}
                  className="bg-[#171717] text-white text-sm font-medium rounded-[6px] px-5 py-2.5 hover:bg-[#333333] transition-colors flex items-center justify-center space-x-2 shrink-0 min-h-[44px]"
                >
                  {isAiLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-current text-white" />
                  )}
                  <span>Send</span>
                </button>
              </form>

              {/* AI Logs Table */}
              <div className="overflow-x-auto border border-[#ebebeb] rounded-[12px]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#fafafa] border-b border-[#ebebeb] text-[#8f8f8f] uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Time</th>
                      <th className="px-4 py-3 font-medium">Model</th>
                      <th className="px-4 py-3 font-medium">Prompt / Response</th>
                      <th className="px-4 py-3 font-medium text-right">Latency</th>
                      <th className="px-4 py-3 font-medium text-right">Tokens</th>
                      <th className="px-4 py-3 font-medium text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ebebeb] text-[#171717]">
                    {aiLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#fafafa] transition-colors">
                        <td className="px-4 py-3">
                          {log.cached ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] bg-[#d3e5ff] text-[#0761d1] font-semibold">
                              CACHE HIT
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[10px] bg-[#f2f2f2] text-[#4d4d4d] font-semibold">
                              PASSTHROUGH
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[#8f8f8f]">{log.timestamp}</td>
                        <td className="px-4 py-3 text-[#7928ca] font-medium">{log.model}</td>
                        <td className="px-4 py-3 max-w-md">
                          <div className="font-semibold text-[#171717] truncate">{log.prompt}</div>
                          <div className="text-[#4d4d4d] text-[11px] truncate mt-0.5">{log.response}</div>
                        </td>
                        <td className="px-4 py-3 text-right text-[#0070f3] font-semibold">{log.latencyMs}ms</td>
                        <td className="px-4 py-3 text-right text-[#8f8f8f]">{log.tokens}</td>
                        <td className="px-4 py-3 text-right text-[#171717]">{log.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Web Apps */}
          {activeTab === 'Web Apps' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#ebebeb]">
                <div>
                  <h3 className="text-lg font-semibold text-[#171717] tracking-tight">
                    Next.js App Router & Server Components
                  </h3>
                  <p className="text-xs text-[#8f8f8f] font-mono mt-0.5">
                    ISR Revalidation, Streaming SSR, and Parallel Routes
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-mono bg-[#f2f2f2] text-[#171717] border border-[#ebebeb] rounded-[4px]">
                  Next.js v15.2 Ready
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#fafafa] border border-[#ebebeb] rounded-[12px] p-4 font-mono text-xs text-[#171717]">
                  <div className="text-[#8f8f8f] mb-2">// app/dashboard/page.tsx</div>
                  <pre className="overflow-x-auto text-[#171717] leading-relaxed">
{`import { Suspense } from 'react';
import { AnalyticsChart, RevenueStream } from '@/components';

export default async function Page() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Suspense fallback={<SkeletonChart />}>
        <AnalyticsChart />
      </Suspense>
      <Suspense fallback={<SkeletonFeed />}>
        <RevenueStream />
      </Suspense>
    </div>
  );
}`}
                  </pre>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-[#ebebeb] rounded-[12px] bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#171717]">Edge ISR Status</span>
                      <span className="text-xs font-mono text-[#0070f3] bg-[#d3e5ff] px-2 py-0.5 rounded-[4px]">FRESH (Cache 60s)</span>
                    </div>
                    <p className="text-xs text-[#4d4d4d] mt-2">
                      Static HTML generated at edge POPs, automatically revalidated in background when stale.
                    </p>
                  </div>

                  <div className="p-4 border border-[#ebebeb] rounded-[12px] bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#171717]">TTFB Baseline</span>
                      <span className="text-xs font-mono text-[#171717]">14ms Global Avg</span>
                    </div>
                    <div className="w-full bg-[#f2f2f2] h-2 rounded-full mt-3 overflow-hidden">
                      <div className="bg-[#0070f3] h-full w-[15%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: E-commerce */}
          {activeTab === 'E-commerce' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#ebebeb]">
                <div>
                  <h3 className="text-lg font-semibold text-[#171717] tracking-tight">
                    Sub-Second Global Commerce
                  </h3>
                  <p className="text-xs text-[#8f8f8f] font-mono mt-0.5">
                    Localized pricing, dynamic inventory, and Edge Cart state
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { region: 'North America (iad1)', price: '$120.00 USD', ttfb: '8ms', status: 'In Stock' },
                  { region: 'Europe (fra1)', price: '€110.00 EUR', ttfb: '12ms', status: 'In Stock' },
                  { region: 'Asia Pacific (hnd1)', price: '¥18,000 JPY', ttfb: '16ms', status: 'Low Stock' },
                ].map((card, i) => (
                  <div key={i} className="p-4 border border-[#ebebeb] rounded-[12px] bg-[#fafafa]">
                    <div className="flex items-center justify-between text-xs font-mono text-[#8f8f8f]">
                      <span>{card.region}</span>
                      <span className="text-[#0070f3] font-semibold">{card.ttfb}</span>
                    </div>
                    <div className="text-2xl font-semibold text-[#171717] my-2">{card.price}</div>
                    <div className="text-xs text-[#4d4d4d] flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-[#50e3c2]" />
                      <span>{card.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Edge Functions & KV */}
          {activeTab === 'Edge Functions' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#ebebeb]">
                <div>
                  <h3 className="text-lg font-semibold text-[#171717] tracking-tight">
                    Geist Edge KV Storage Test
                  </h3>
                  <p className="text-xs text-[#8f8f8f] font-mono mt-0.5">
                    Global key-value store with sub-5ms read latencies
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-[#8f8f8f]">KEY NAME</label>
                    <input
                      type="text"
                      value={kvKey}
                      onChange={(e) => setKvKey(e.target.value)}
                      className="w-full mt-1 bg-white border border-[#ebebeb] text-[#171717] text-sm rounded-[6px] px-3 py-2 font-mono focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-[#8f8f8f]">VALUE (JSON)</label>
                    <input
                      type="text"
                      value={kvVal}
                      onChange={(e) => setKvVal(e.target.value)}
                      className="w-full mt-1 bg-white border border-[#ebebeb] text-[#171717] text-sm rounded-[6px] px-3 py-2 font-mono focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleKvRead}
                      className="bg-[#171717] text-white text-xs font-medium rounded-[6px] px-4 py-2 hover:bg-[#333333]"
                    >
                      KV.GET()
                    </button>
                    <button
                      onClick={handleKvWrite}
                      className="bg-white border border-[#ebebeb] text-[#171717] text-xs font-medium rounded-[6px] px-4 py-2 hover:bg-[#f2f2f2]"
                    >
                      KV.SET()
                    </button>
                  </div>
                </div>

                <div className="bg-[#fafafa] border border-[#ebebeb] rounded-[12px] p-4">
                  <div className="text-xs font-mono text-[#8f8f8f] mb-3">EDGE TELEMETRY BENCHMARK</div>
                  <div className="space-y-2 font-mono text-xs">
                    {kvLogs.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-white border border-[#ebebeb] rounded-[6px]">
                        <span className="font-semibold text-[#0070f3]">{item.action}</span>
                        <span className="text-[#171717]">{item.key}</span>
                        <span className="text-[#7928ca] font-bold">{item.ms}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
