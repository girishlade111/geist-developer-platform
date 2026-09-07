import React, { useState } from 'react';
import { X, Terminal, CheckCircle2, Copy, Check, ExternalLink, RefreshCw, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { Template } from '../types';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate?: Template | null;
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  selectedTemplate,
}) => {
  const [repoUrl, setRepoUrl] = useState(
    selectedTemplate ? `github.com/geist-templates/${selectedTemplate.id}` : 'github.com/my-org/my-ai-platform'
  );
  const [framework, setFramework] = useState(selectedTemplate?.framework || 'Next.js');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleStartDeploy = () => {
    setIsDeploying(true);
    setDeployedUrl(null);
    setLogs(['▲ geist-cli v2026.8.1', '▲ Initializing deployment pipeline...']);
    setDeployStep(1);

    setTimeout(() => {
      setLogs(prev => [...prev, '✔ Cloned git repository: ' + repoUrl]);
      setDeployStep(2);
    }, 600);

    setTimeout(() => {
      setLogs(prev => [...prev, '✔ Framework detected: ' + framework + ' (App Router)']);
      setLogs(prev => [...prev, '▲ Compiling Edge Functions and static assets...']);
      setDeployStep(3);
    }, 1200);

    setTimeout(() => {
      setLogs(prev => [...prev, '✔ Built 14 Edge Routes in 380ms']);
      setLogs(prev => [...prev, '▲ Provisioning SSL certificate & Anycast DNS...']);
      setDeployStep(4);
    }, 1800);

    setTimeout(() => {
      const generatedUrl = `https://${repoUrl.split('/').pop() || 'my-app'}.geist.app`;
      setLogs(prev => [...prev, `✔ DEPLOYMENT COMPLETE: ${generatedUrl}`]);
      setDeployedUrl(generatedUrl);
      setIsDeploying(false);
      setDeployStep(5);
    }, 2400);
  };

  const handleCopyUrl = () => {
    if (deployedUrl) {
      navigator.clipboard.writeText(deployedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#ebebeb] rounded-[16px] w-full max-w-2xl shadow-floating overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="bg-[#fafafa] border-b border-[#ebebeb] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#171717]" />
            <h3 className="text-sm font-semibold text-[#171717] tracking-tight">
              {selectedTemplate ? `Deploy Template: ${selectedTemplate.name}` : 'Deploy Project to Geist'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#8f8f8f] hover:text-[#171717] rounded-[4px]"
            id="button-close-deploy-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Step 1: Config Form */}
          {!isDeploying && !deployedUrl && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8f8f8f] uppercase">GIT REPOSITORY</label>
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full mt-1 bg-white border border-[#ebebeb] text-[#171717] text-sm rounded-[6px] px-3.5 py-2.5 font-mono focus:outline-none focus:border-[#171717]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#8f8f8f] uppercase">FRAMEWORK PRESET</label>
                  <select
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                    className="w-full mt-1 bg-white border border-[#ebebeb] text-[#171717] text-sm rounded-[6px] px-3.5 py-2.5 font-mono focus:outline-none focus:border-[#171717]"
                  >
                    <option value="Next.js">Next.js 15 (App Router)</option>
                    <option value="SvelteKit">SvelteKit</option>
                    <option value="Astro">Astro Edge</option>
                    <option value="Vite">Vite React SPA</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8f8f8f] uppercase">REGION TARGET</label>
                  <select className="w-full mt-1 bg-white border border-[#ebebeb] text-[#171717] text-sm rounded-[6px] px-3.5 py-2.5 font-mono focus:outline-none focus:border-[#171717]">
                    <option value="iad1">Global Anycast (iad1 primary)</option>
                    <option value="fra1">Europe Central (fra1)</option>
                    <option value="hnd1">Asia Pacific (hnd1)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleStartDeploy}
                id="button-start-deploy-submit"
                className="w-full bg-[#171717] text-white text-sm font-medium py-3 rounded-[6px] hover:bg-[#333333] transition-colors flex items-center justify-center space-x-2"
              >
                <span>Deploy Now to Global Edge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Deployment Streaming Terminal */}
          {(isDeploying || deployedUrl) && (
            <div className="space-y-4">
              <div className="bg-[#171717] text-white p-4 rounded-[12px] font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-[#8f8f8f] select-none">&gt;</span>
                    <span className={log.includes('COMPLETE') ? 'text-[#00dfd8] font-bold' : ''}>
                      {log}
                    </span>
                  </div>
                ))}
                {isDeploying && (
                  <div className="flex items-center space-x-2 text-[#8f8f8f] pt-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0070f3]" />
                    <span>Processing deployment pipeline step {deployStep}/4...</span>
                  </div>
                )}
              </div>

              {/* Step 3: Deployment Success Card */}
              {deployedUrl && (
                <div className="p-4 bg-[#fafafa] border border-[#ebebeb] rounded-[12px] animate-in fade-in duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-xs font-mono text-[#50e3c2]">
                      <CheckCircle2 className="w-4 h-4 fill-current text-[#50e3c2]" />
                      <span className="font-bold text-[#171717]">DEPLOYMENT LIVE</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCopyUrl}
                        className="px-2.5 py-1 text-xs font-mono bg-white border border-[#ebebeb] text-[#171717] rounded-[4px] hover:bg-[#f2f2f2] flex items-center space-x-1"
                      >
                        {copied ? <Check className="w-3 h-3 text-[#0070f3]" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy URL'}</span>
                      </button>

                      <a
                        href={deployedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-xs font-mono bg-[#171717] text-white rounded-[4px] hover:bg-[#333333] flex items-center space-x-1"
                      >
                        <span>Visit App</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-[#ebebeb] rounded-[6px] font-mono text-xs text-[#0070f3] truncate">
                    {deployedUrl}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
