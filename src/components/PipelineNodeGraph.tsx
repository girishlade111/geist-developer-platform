import React, { useState } from 'react';
import { GitBranch, Play, CheckCircle2, ArrowRight, ExternalLink, RefreshCw, Layers, ShieldCheck, Globe } from 'lucide-react';
import { PipelineStage } from '../types';

export const PipelineNodeGraph: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'develop' | 'preview' | 'ship'>('preview');
  const [isBuilding, setIsBuilding] = useState(false);
  const [pipelineState, setPipelineState] = useState<Record<string, PipelineStage>>({
    develop: {
      id: 'develop',
      name: '1. DEVELOP',
      status: 'success',
      gradient: 'from-[#007cf0] to-[#00dfd8]', // Blue to Cyan
      durationMs: 420,
      commitHash: 'a7f19b2',
      author: 'alex@geist.app',
      message: 'feat: add Geist AI Gateway proxy middleware',
      branch: 'main'
    },
    preview: {
      id: 'preview',
      name: '2. PREVIEW',
      status: 'success',
      gradient: 'from-[#7928ca] to-[#ff0080]', // Violet to Pink
      durationMs: 1240,
      commitHash: 'a7f19b2',
      author: 'alex@geist.app',
      message: 'feat: add Geist AI Gateway proxy middleware',
      branch: 'feat/ai-gateway',
      url: 'https://my-ai-platform-git-feat-ai-gateway.geist.app'
    },
    ship: {
      id: 'ship',
      name: '3. SHIP',
      status: 'success',
      gradient: 'from-[#ff4d4d] to-[#f9cb28]', // Red to Amber
      durationMs: 180,
      commitHash: 'a7f19b2',
      author: 'alex@geist.app',
      message: 'feat: add Geist AI Gateway proxy middleware',
      branch: 'main',
      url: 'https://my-ai-platform.geist.app'
    }
  });

  const handleTriggerPipeline = () => {
    setIsBuilding(true);
    
    // Reset statuses
    setPipelineState(prev => ({
      develop: { ...prev.develop, status: 'building' },
      preview: { ...prev.preview, status: 'idle' },
      ship: { ...prev.ship, status: 'idle' }
    }));

    setTimeout(() => {
      setPipelineState(prev => ({
        ...prev,
        develop: { ...prev.develop, status: 'success' },
        preview: { ...prev.preview, status: 'building' }
      }));
    }, 800);

    setTimeout(() => {
      setPipelineState(prev => ({
        ...prev,
        preview: { ...prev.preview, status: 'success' },
        ship: { ...prev.ship, status: 'building' }
      }));
    }, 1600);

    setTimeout(() => {
      setPipelineState(prev => ({
        ...prev,
        ship: { ...prev.ship, status: 'success' }
      }));
      setIsBuilding(false);
    }, 2200);
  };

  return (
    <section id="pipeline" className="py-20 bg-[#fafafa] border-b border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#8f8f8f]">
              CONTINUOUS INTEGRATION // THE LEGACY TRIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
              Develop. Preview. Ship.
            </h2>
            <p className="text-[#4d4d4d] text-base max-w-xl mt-1">
              Every git push spins up an isolated, production-identical edge preview deployment in sub-second time.
            </p>
          </div>

          <button
            onClick={handleTriggerPipeline}
            disabled={isBuilding}
            id="button-trigger-pipeline"
            className="mt-4 md:mt-0 bg-[#171717] text-white text-xs sm:text-sm font-medium rounded-[6px] px-4 py-2.5 hover:bg-[#333333] transition-colors shadow-whisper flex items-center space-x-2"
          >
            {isBuilding ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Play className="w-4 h-4 fill-current text-white" />
            )}
            <span>{isBuilding ? 'Running Pipeline...' : 'Trigger Git Push'}</span>
          </button>
        </div>

        {/* Node Graph Grid (3-Up hairline cards with connecting node graph lines) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Node 1: DEVELOP (#007cf0 -> #00dfd8) */}
          <div
            onClick={() => setActiveStage('develop')}
            className={`p-6 bg-white border rounded-[12px] cursor-pointer transition-all shadow-whisper relative ${
              activeStage === 'develop' ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-[#ebebeb] hover:border-[#8f8f8f]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#8f8f8f] uppercase">
                {pipelineState.develop.name}
              </span>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#007cf0] to-[#00dfd8]" />
            </div>

            <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
              Local & Edge DX
            </h3>
            <p className="text-xs text-[#4d4d4d] mb-4 leading-relaxed">
              Zero-config dev server with TypeScript type stripping and instant Hot-Reload fallback.
            </p>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px] font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-[#8f8f8f]">
                <span>Branch:</span>
                <span className="text-[#171717] font-medium">{pipelineState.develop.branch}</span>
              </div>
              <div className="flex justify-between text-[#8f8f8f]">
                <span>Commit:</span>
                <span className="text-[#0070f3]">{pipelineState.develop.commitHash}</span>
              </div>
              <div className="flex justify-between text-[#8f8f8f]">
                <span>Compile:</span>
                <span className="text-[#171717]">{pipelineState.develop.durationMs}ms</span>
              </div>
            </div>
          </div>

          {/* Node 2: PREVIEW (#7928ca -> #ff0080) */}
          <div
            onClick={() => setActiveStage('preview')}
            className={`p-6 bg-white border rounded-[12px] cursor-pointer transition-all shadow-whisper relative ${
              activeStage === 'preview' ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-[#ebebeb] hover:border-[#8f8f8f]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#8f8f8f] uppercase">
                {pipelineState.preview.name}
              </span>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#7928ca] to-[#ff0080]" />
            </div>

            <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
              Isolated Preview URL
            </h3>
            <p className="text-xs text-[#4d4d4d] mb-4 leading-relaxed">
              Every PR gets its own live URL to share with stakeholders, complete with visual comments.
            </p>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px] font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-[#8f8f8f]">
                <span>Status:</span>
                <span className="text-[#7928ca] font-semibold uppercase">{pipelineState.preview.status}</span>
              </div>
              <div className="flex justify-between text-[#8f8f8f]">
                <span>Build Time:</span>
                <span className="text-[#171717]">{pipelineState.preview.durationMs}ms</span>
              </div>
              {pipelineState.preview.url && (
                <div className="pt-1 border-t border-[#ebebeb] flex items-center justify-between text-[#0070f3] truncate">
                  <span className="truncate">{pipelineState.preview.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 ml-1" />
                </div>
              )}
            </div>
          </div>

          {/* Node 3: SHIP (#ff4d4d -> #f9cb28) */}
          <div
            onClick={() => setActiveStage('ship')}
            className={`p-6 bg-white border rounded-[12px] cursor-pointer transition-all shadow-whisper relative ${
              activeStage === 'ship' ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-[#ebebeb] hover:border-[#8f8f8f]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#8f8f8f] uppercase">
                {pipelineState.ship.name}
              </span>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ff4d4d] to-[#f9cb28]" />
            </div>

            <h3 className="text-lg font-semibold text-[#171717] tracking-tight mb-1">
              Global Anycast Production
            </h3>
            <p className="text-xs text-[#4d4d4d] mb-4 leading-relaxed">
              Instant atomic traffic shift across 350+ POPs with zero downtime and 1-click rollbacks.
            </p>

            <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[6px] font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-[#8f8f8f]">
                <span>Propagation:</span>
                <span className="text-[#50e3c2] font-semibold">100% GLOBAL</span>
              </div>
              <div className="flex justify-between text-[#8f8f8f]">
                <span>DNS Latency:</span>
                <span className="text-[#171717]">18ms</span>
              </div>
              {pipelineState.ship.url && (
                <div className="pt-1 border-t border-[#ebebeb] flex items-center justify-between text-[#171717] font-semibold truncate">
                  <span className="truncate">{pipelineState.ship.url}</span>
                  <Globe className="w-3.5 h-3.5 text-[#50e3c2] shrink-0 ml-1" />
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
