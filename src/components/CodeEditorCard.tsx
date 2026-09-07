import React, { useState } from 'react';
import { Copy, Check, Play, Terminal, FileCode, CheckCircle, RefreshCw } from 'lucide-react';

export const CodeEditorCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'route' | 'middleware' | 'config'>('route');
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState<string | null>(null);

  const codeFiles = {
    route: {
      filename: 'app/api/ai/route.ts',
      language: 'typescript',
      content: `import { GoogleGenAI } from '@google/genai';
import { geolocation, ipAddress } from '@vercel/functions';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const config = { runtime: 'edge' };

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const { country } = geolocation(req);
  
  // High-performance streaming completion
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  });

  return Response.json({
    text: response.text,
    region: country || 'US-EAST',
    timestamp: new Date().toISOString()
  });
}`
    },
    middleware: {
      filename: 'middleware.ts',
      language: 'typescript',
      content: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Inject security and edge performance headers
  response.headers.set('x-geist-edge-pop', 'iad1');
  response.headers.set('x-content-type-options', 'nosniff');
  response.headers.set('strict-transport-security', 'max-age=63072000; includeSubDomains; preload');
  
  return response;
}`
    },
    config: {
      filename: 'geist.config.ts',
      language: 'typescript',
      content: `import { defineConfig } from '@geist/config';

export default defineConfig({
  framework: 'nextjs',
  regions: ['iad1', 'fra1', 'hnd1', 'syd1'],
  aiGateway: {
    cache: 'semantic',
    ttlSeconds: 86400,
    maxTokensPerMinute: 50000,
  },
  crons: [
    { path: '/api/cron/revalidate', schedule: '0 * * * *' }
  ]
});`
    }
  };

  const currentFile = codeFiles[activeTab];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setExecutionLog('Executing TypeScript file on Geist Edge Runtime v2.4...');
    setTimeout(() => {
      setExecutionLog(`[SUCCESS] Compiled in 12ms. Endpoint listening on /api/ai [Status: 200 OK]`);
      setIsExecuting(false);
    }, 800);
  };

  return (
    <section id="frameworks" className="py-20 bg-[#fafafa] border-b border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#8f8f8f]">
            SPEC SHEET // CLEAN CODE SURFACE
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
            Write code. We handle the rest.
          </h2>
          <p className="text-[#4d4d4d] text-base mt-2">
            Native support for TypeScript, ES Modules, and Edge Runtime Web APIs out of the box.
          </p>
        </div>

        {/* Code Editor Card ({components.code-block} - hairline-bordered white card) */}
        <div className="max-w-4xl mx-auto bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper overflow-hidden">
          
          {/* Top Editor Bar */}
          <div className="bg-[#fafafa] border-b border-[#ebebeb] px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
            
            {/* File Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {(['route', 'middleware', 'config'] as const).map((tabKey) => {
                const file = codeFiles[tabKey];
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    id={`tab-code-${tabKey}`}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-[6px] transition-colors ${
                      isActive
                        ? 'bg-white border border-[#ebebeb] text-[#171717] font-semibold shadow-whisper'
                        : 'text-[#8f8f8f] hover:text-[#171717]'
                    }`}
                  >
                    <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-[#0070f3]' : 'text-[#8f8f8f]'}`} />
                    <span>{file.filename}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                id="button-execute-code"
                className="bg-[#171717] text-white text-xs font-medium rounded-[6px] px-2.5 py-1 hover:bg-[#333333] transition-colors flex items-center space-x-1"
              >
                {isExecuting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                <span>Test Code</span>
              </button>

              <button
                onClick={handleCopyCode}
                id="button-copy-code"
                className="p-1 text-[#8f8f8f] hover:text-[#171717] rounded-[4px] border border-[#ebebeb] bg-white transition-colors"
                title="Copy snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#0070f3]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Code Text Content */}
          <div className="p-5 font-mono text-xs sm:text-sm text-[#171717] overflow-x-auto leading-relaxed bg-white">
            <pre>
              <code>{currentFile.content}</code>
            </pre>
          </div>

          {/* Test Log Terminal Footer */}
          {executionLog && (
            <div className="bg-[#171717] text-white font-mono text-xs p-3.5 border-t border-[#ebebeb] flex items-center justify-between animate-in fade-in duration-150">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5 text-[#00dfd8]" />
                <span>{executionLog}</span>
              </div>
              <span className="text-[10px] text-[#8f8f8f] uppercase">REGIONAL POP: IAD1</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
