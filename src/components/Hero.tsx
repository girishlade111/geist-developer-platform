import React, { useState } from 'react';
import { Terminal, ArrowRight, Copy, Check, Play, Zap, Shield, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartDeploy: () => void;
  onOpenAskAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartDeploy, onOpenAskAI }) => {
  const [copied, setCopied] = useState(false);
  const [cliOutput, setCliOutput] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const commandText = 'npx create-geist-app@latest my-ai-platform';

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRun = () => {
    setIsSimulating(true);
    setCliOutput('▲ Fetching latest Geist 2026 starter template...');
    setTimeout(() => {
      setCliOutput('✔ Template initialized in ./my-ai-platform\n▲ Provisioning Edge AI Gateway & Regional Routes...\n✔ Deployed: https://my-ai-platform.geist.app [1.2s]');
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-16 md:py-24 border-b border-[#ebebeb]">
      
      {/* Background Soft Mesh Gradient - The single decorative bloom of cyan, blue, violet, magenta, amber */}
      <div 
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-60 pointer-events-none geist-mesh-gradient" 
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Uppercase Technical Eyebrow (Geist Mono) */}
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-[#ebebeb] px-3 py-1 rounded-[100px] mb-6 shadow-whisper">
          <span className="w-2 h-2 rounded-full bg-[#50e3c2] animate-pulse" />
          <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#4d4d4d]">
            GEIST PLATFORM 2026 // ENGINEERING EXCELLENCE
          </span>
        </div>

        {/* Display Headline - Geist Sans w/ smooth responsive tracking */}
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-semibold text-[#171717] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-2.4px] leading-[1.08] max-w-4xl mx-auto mb-6">
          Build for the web. <br className="hidden sm:inline"/>
          <span className="bg-gradient-to-r from-[#007cf0] via-[#7928ca] to-[#ff0080] bg-clip-text text-transparent">
            Deploy at edge speed.
          </span>
        </h1>

        {/* Lead Copy */}
        <p className="text-base sm:text-xl text-[#4d4d4d] max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Geist combines zero-config edge hosting, an intelligent AI Gateway, and instant preview environments into a single, cohesive developer canvas.
        </p>

        {/* CTAs - Bimodal Marketing Pills ({rounded.pill} - 100px) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          
          {/* Primary Marketing Pill ({components.button-primary}) */}
          <button
            onClick={onStartDeploy}
            id="button-hero-primary-deploy"
            className="w-full sm:w-auto bg-[#171717] text-white text-base font-medium rounded-[100px] px-7 py-3.5 hover:bg-[#333333] transition-all shadow-whisper flex items-center justify-center space-x-2 group"
          >
            <span>Start Deploying</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Secondary Marketing Pill ({components.button-secondary}) */}
          <button
            onClick={onOpenAskAI}
            id="button-hero-secondary-demo"
            className="w-full sm:w-auto bg-white border border-[#ebebeb] text-[#171717] text-base font-medium rounded-[100px] px-7 py-3.5 hover:bg-[#f2f2f2] transition-colors shadow-whisper flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#7928ca]" />
            <span>Interactive AI Sandbox</span>
          </button>
        </div>

        {/* Hairline Code Terminal / Quick CLI Simulator */}
        <div className="max-w-2xl mx-auto bg-white border border-[#ebebeb] rounded-[12px] p-4 text-left shadow-whisper">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f2f2f2]">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ebebeb]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ebebeb]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ebebeb]" />
              <span className="ml-2 text-xs font-mono text-[#8f8f8f]">bash — geist-cli</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSimulateRun}
                disabled={isSimulating}
                className="text-xs font-medium text-[#0070f3] hover:underline flex items-center space-x-1"
                id="button-hero-cli-run"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{isSimulating ? 'Running...' : 'Run in Browser'}</span>
              </button>
              
              <button
                onClick={handleCopyCommand}
                className="p-1 text-[#8f8f8f] hover:text-[#171717] rounded-[4px] transition-colors"
                title="Copy Command"
                id="button-hero-cli-copy"
              >
                {copied ? <Check className="w-4 h-4 text-[#0070f3]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Command display */}
          <div className="font-mono text-sm text-[#171717] flex items-center space-x-2 bg-[#fafafa] p-3 rounded-[6px] border border-[#ebebeb]">
            <span className="text-[#8f8f8f]">$</span>
            <span className="flex-1 overflow-x-auto select-all">{commandText}</span>
          </div>

          {/* Simulated stdout output if clicked */}
          {cliOutput && (
            <div className="mt-3 p-3 bg-[#171717] text-white font-mono text-xs rounded-[6px] whitespace-pre-wrap animate-in fade-in duration-200">
              {cliOutput}
            </div>
          )}
        </div>

        {/* Spec Sheet Micro Highlights */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto">
          <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper">
            <div className="text-xl font-semibold tracking-tight text-[#171717]">350+</div>
            <div className="text-xs font-mono text-[#8f8f8f] uppercase mt-0.5">Edge Locations</div>
          </div>
          <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper">
            <div className="text-xl font-semibold tracking-tight text-[#171717]">&lt;10ms</div>
            <div className="text-xs font-mono text-[#8f8f8f] uppercase mt-0.5">TTFB Latency</div>
          </div>
          <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper">
            <div className="text-xl font-semibold tracking-tight text-[#171717]">99.99%</div>
            <div className="text-xs font-mono text-[#8f8f8f] uppercase mt-0.5">SLA Uptime</div>
          </div>
          <div className="p-3 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper">
            <div className="text-xl font-semibold tracking-tight text-[#171717]">Zero</div>
            <div className="text-xs font-mono text-[#8f8f8f] uppercase mt-0.5">Cold Starts</div>
          </div>
        </div>

      </div>
    </section>
  );
};
