import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

interface CtaBandProps {
  onStartDeploy: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onStartDeploy }) => {
  return (
    <section className="py-24 bg-[#fafafa] border-b border-[#ebebeb] text-center">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#8f8f8f]">
          ZERO-CONFIG INFRASTRUCTURE
        </span>

        <h2 className="text-3xl sm:text-5xl font-semibold text-[#171717] tracking-[-2.4px] max-w-2xl mx-auto my-4 leading-tight">
          Ready to deploy your next application?
        </h2>

        <p className="text-[#4d4d4d] text-base max-w-xl mx-auto mb-8">
          Get started for free on our Hobby plan. Scale seamlessly to Pro and Enterprise as your traffic grows.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartDeploy}
            id="button-cta-primary-deploy"
            className="w-full sm:w-auto bg-[#171717] text-white text-base font-medium rounded-[100px] px-8 py-3.5 hover:bg-[#333333] transition-all shadow-whisper flex items-center justify-center space-x-2 group"
          >
            <span>Start Deploying</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
