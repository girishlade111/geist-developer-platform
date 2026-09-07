import React, { useState } from 'react';
import { Zap, ShieldCheck, Activity, RotateCcw, ImageIcon, Cpu, Check, Lock, ChevronRight } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  // Micro-interactivity state
  const [coldStartMs, setColdStartMs] = useState(0);
  const [rollbackActive, setRollbackActive] = useState(false);
  const [rateLimitCount, setRateLimitCount] = useState(14);
  const [imageFormat, setImageFormat] = useState<'avif' | 'webp' | 'png'>('avif');

  const imageSizes = {
    png: '2.4 MB',
    webp: '380 KB (84% savings)',
    avif: '190 KB (92% savings)'
  };

  return (
    <section className="py-20 bg-[#fafafa] border-b border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#8f8f8f]">
            INFRASTRUCTURE // HAIRLINE PRECISION
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
            Built for extreme reliability & performance.
          </h2>
          <p className="text-[#4d4d4d] text-base mt-2">
            Every feature card is an engineered micro-tool running directly on Geist Edge Infrastructure.
          </p>
        </div>

        {/* 3-Up Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature Card 1: Zero Cold Starts */}
          <div className="p-6 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] mb-4">
                <Zap className="w-4 h-4 text-[#0070f3]" />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
                Zero Cold Starts
              </h3>
              <p className="text-sm text-[#4d4d4d] leading-relaxed mb-4">
                V8 isolates keep edge compute warm globally without expensive baseline server costs.
              </p>
            </div>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px]">
              <div className="flex items-center justify-between text-xs font-mono text-[#8f8f8f] mb-1">
                <span>BENCHMARK LATENCY</span>
                <span className="text-[#0070f3] font-bold">{coldStartMs}ms</span>
              </div>
              <button
                onClick={() => setColdStartMs(Math.floor(Math.random() * 2))}
                className="w-full text-xs font-mono bg-white border border-[#ebebeb] text-[#171717] py-1.5 rounded-[4px] hover:bg-[#f2f2f2] transition-colors"
                id="button-test-cold-start"
              >
                Invoke Warm Function
              </button>
            </div>
          </div>

          {/* Feature Card 2: Instant Rollbacks */}
          <div className="p-6 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] mb-4">
                <RotateCcw className="w-4 h-4 text-[#7928ca]" />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
                Instant Rollbacks
              </h3>
              <p className="text-sm text-[#4d4d4d] leading-relaxed mb-4">
                Detected a regression? Revert traffic to any historical deployment in under 200ms.
              </p>
            </div>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px]">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#8f8f8f]">ACTIVE RELEASE</span>
                <span className={`font-semibold ${rollbackActive ? 'text-[#ff0080]' : 'text-[#0070f3]'}`}>
                  {rollbackActive ? 'v1.1.8-rollback' : 'v1.2.0-main'}
                </span>
              </div>
              <button
                onClick={() => setRollbackActive(!rollbackActive)}
                className="w-full text-xs font-mono bg-white border border-[#ebebeb] text-[#171717] py-1.5 rounded-[4px] hover:bg-[#f2f2f2] transition-colors"
                id="button-toggle-rollback"
              >
                {rollbackActive ? 'Restore Production v1.2.0' : 'Simulate 1-Click Rollback'}
              </button>
            </div>
          </div>

          {/* Feature Card 3: Realtime Web Vitals */}
          <div className="p-6 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] mb-4">
                <Activity className="w-4 h-4 text-[#50e3c2]" />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
                Real User Web Vitals
              </h3>
              <p className="text-sm text-[#4d4d4d] leading-relaxed mb-4">
                Field data telemetry collected directly from edge visits without external tracking bloat.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 bg-[#fafafa] border border-[#ebebeb] rounded-[6px]">
                <div className="text-[10px] text-[#8f8f8f]">LCP</div>
                <div className="text-sm font-semibold text-[#50e3c2]">0.6s</div>
              </div>
              <div className="p-2 bg-[#fafafa] border border-[#ebebeb] rounded-[6px]">
                <div className="text-[10px] text-[#8f8f8f]">INP</div>
                <div className="text-sm font-semibold text-[#50e3c2]">12ms</div>
              </div>
              <div className="p-2 bg-[#fafafa] border border-[#ebebeb] rounded-[6px]">
                <div className="text-[10px] text-[#8f8f8f]">CLS</div>
                <div className="text-sm font-semibold text-[#50e3c2]">0.00</div>
              </div>
            </div>
          </div>

          {/* Feature Card 4: Edge Image Optimization */}
          <div className="p-6 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] mb-4">
                <ImageIcon className="w-4 h-4 text-[#ff367f]" />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
                Edge Image Optimization
              </h3>
              <p className="text-sm text-[#4d4d4d] leading-relaxed mb-4">
                Automatic image resizing, WebP/AVIF format conversion, and caching at edge nodes.
              </p>
            </div>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px]">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-[#8f8f8f]">FORMAT:</span>
                <span className="text-[#171717] font-semibold">{imageSizes[imageFormat]}</span>
              </div>
              <div className="flex gap-1">
                {(['avif', 'webp', 'png'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setImageFormat(fmt)}
                    className={`flex-1 text-[11px] font-mono py-1 rounded-[4px] uppercase border transition-colors ${
                      imageFormat === fmt
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white border-[#ebebeb] text-[#4d4d4d] hover:bg-[#f2f2f2]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Card 5: Smart Edge Security */}
          <div className="p-6 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] mb-4">
                <ShieldCheck className="w-4 h-4 text-[#0070f3]" />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
                Automated Edge Firewall & DDoS
              </h3>
              <p className="text-sm text-[#4d4d4d] leading-relaxed mb-4">
                Global rate-limiting and bot mitigation active on every deployment by default.
              </p>
            </div>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px] flex items-center justify-between">
              <div className="text-xs font-mono">
                <span className="text-[#8f8f8f]">BLOCKED THREATS: </span>
                <span className="text-[#0070f3] font-semibold">{rateLimitCount} requests/s</span>
              </div>
              <button
                onClick={() => setRateLimitCount(c => c + 1)}
                className="px-2 py-1 bg-white border border-[#ebebeb] text-[10px] font-mono rounded-[4px] hover:bg-[#f2f2f2]"
              >
                + Test Rate Limit
              </button>
            </div>
          </div>

          {/* Feature Card 6: Managed SSL & Anycast DNS */}
          <div className="p-6 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-[6px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center text-[#171717] mb-4">
                <Lock className="w-4 h-4 text-[#50e3c2]" />
              </div>
              <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
                Managed SSL & Custom Domains
              </h3>
              <p className="text-sm text-[#4d4d4d] leading-relaxed mb-4">
                Auto-renewing Let's Encrypt certificates provisioned in sub-3 seconds upon CNAME verification.
              </p>
            </div>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px] flex items-center justify-between text-xs font-mono">
              <span className="text-[#171717]">TLS 1.3 / ECDSA_P256</span>
              <span className="inline-flex items-center text-[#50e3c2] font-semibold">
                <Check className="w-3 h-3 mr-1" /> ACTIVE
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
