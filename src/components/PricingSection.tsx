import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, ArrowRight, Calculator, Zap } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(true);
  
  // Usage Cost Calculator state
  const [bandwidthGb, setBandwidthGb] = useState(250);
  const [buildMins, setBuildMins] = useState(1200);
  const [aiRequestsM, setAiRequestsM] = useState(5);

  // Calculate estimated usage cost
  const estimatedExtraBandwidth = Math.max(0, bandwidthGb - 100) * 0.15; // $0.15/GB above 100GB
  const estimatedExtraBuild = Math.max(0, buildMins - 1000) * 0.01; // $0.01/min above 1000m
  const estimatedExtraAi = Math.max(0, aiRequestsM - 1) * 2.5; // $2.50 per M above 1M
  const baseProPrice = isYearly ? 16 : 20;
  const totalEstimatedCost = Math.round(baseProPrice + estimatedExtraBandwidth + estimatedExtraBuild + estimatedExtraAi);

  return (
    <section id="pricing" className="py-20 bg-[#fafafa] border-b border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#8f8f8f]">
            PREDICTABLE PRICING // ZERO SURPRISES
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
            Predictable pricing that scales with you.
          </h2>
          <p className="text-[#4d4d4d] text-base mt-2">
            Start for free, then upgrade to Pro as your traffic grows.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center space-x-2 bg-white border border-[#ebebeb] p-1 rounded-[100px] mt-6 shadow-whisper">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-1.5 text-xs font-medium rounded-[100px] transition-colors ${
                !isYearly ? 'bg-[#171717] text-white' : 'text-[#4d4d4d] hover:text-[#171717]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-1.5 text-xs font-medium rounded-[100px] transition-colors flex items-center space-x-1 ${
                isYearly ? 'bg-[#171717] text-white' : 'text-[#4d4d4d] hover:text-[#171717]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-[#0070f3] text-white px-1.5 py-0.2 rounded-full font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`p-8 bg-white border rounded-[16px] shadow-whisper flex flex-col justify-between relative ${
                  plan.popular
                    ? 'border-[#171717] ring-1 ring-[#171717]'
                    : 'border-[#ebebeb]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0070f3] text-white text-[11px] font-mono font-bold uppercase px-3 py-0.5 rounded-[100px]">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-[#171717] tracking-tight">{plan.name}</h3>
                  </div>
                  <p className="text-xs text-[#4d4d4d] mb-6 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline space-x-1 mb-6">
                    <span className="text-4xl font-semibold text-[#171717] tracking-tight">${price}</span>
                    <span className="text-xs text-[#8f8f8f] font-mono">/ user / month</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#171717]">
                        <Check className="w-4 h-4 text-[#0070f3] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPlan(plan.name)}
                  id={`button-select-plan-${plan.id}`}
                  className={`w-full text-xs sm:text-sm font-medium py-3 rounded-[6px] transition-colors flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-[#171717] text-white hover:bg-[#333333]'
                      : 'bg-white border border-[#ebebeb] text-[#171717] hover:bg-[#f2f2f2]'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Usage Cost Calculator */}
        <div className="bg-white border border-[#ebebeb] rounded-[16px] p-8 shadow-whisper">
          <div className="flex items-center space-x-2 mb-6 border-b border-[#ebebeb] pb-4">
            <Calculator className="w-5 h-5 text-[#0070f3]" />
            <h3 className="text-lg font-semibold text-[#171717] tracking-tight">
              Interactive Usage Cost Estimator
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bandwidth Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#8f8f8f]">BANDWIDTH:</span>
                <span className="text-[#171717] font-semibold">{bandwidthGb} GB / mo</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={bandwidthGb}
                onChange={(e) => setBandwidthGb(Number(e.target.value))}
                className="w-full accent-[#171717]"
              />
            </div>

            {/* Build Minutes Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#8f8f8f]">BUILD MINUTES:</span>
                <span className="text-[#171717] font-semibold">{buildMins} Mins / mo</span>
              </div>
              <input
                type="range"
                min="200"
                max="10000"
                step="200"
                value={buildMins}
                onChange={(e) => setBuildMins(Number(e.target.value))}
                className="w-full accent-[#171717]"
              />
            </div>

            {/* AI Gateway Requests */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-[#8f8f8f]">AI GATEWAY REQUESTS:</span>
                <span className="text-[#171717] font-semibold">{aiRequestsM} Million</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={aiRequestsM}
                onChange={(e) => setAiRequestsM(Number(e.target.value))}
                className="w-full accent-[#171717]"
              />
            </div>
          </div>

          {/* Calculated Output Box */}
          <div className="mt-8 p-4 bg-[#fafafa] border border-[#ebebeb] rounded-[12px] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#8f8f8f]">ESTIMATED MONTHLY TOTAL (PRO)</div>
              <div className="text-2xl font-semibold text-[#171717] tracking-tight">
                ${totalEstimatedCost} <span className="text-xs font-normal text-[#8f8f8f]">/ month</span>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Pro Custom Estimate')}
              className="bg-[#171717] text-white text-xs font-medium px-5 py-2.5 rounded-[6px] hover:bg-[#333333] transition-colors"
            >
              Start Pro Plan with Estimate
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
