import React, { useState } from 'react';
import { CUSTOMERS } from '../data/mockData';
import { CustomerCaseStudy } from '../types';
import { Quote, X, ArrowUpRight } from 'lucide-react';

export const CustomerLogoStrip: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerCaseStudy | null>(null);

  return (
    <section id="customers" className="py-16 bg-[#fafafa] border-b border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <p className="text-center text-xs font-mono text-[#8f8f8f] uppercase tracking-wider mb-8">
          TRUSTED BY MODERN ENGINEERING TEAMS WORLDWIDE
        </p>

        {/* Greyscale Logo Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-75">
          {CUSTOMERS.map((customer) => (
            <button
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className="text-lg sm:text-xl font-bold font-mono tracking-tighter text-[#4d4d4d] hover:text-[#171717] transition-colors focus:outline-none"
              title={`View ${customer.name} case study`}
              id={`customer-logo-${customer.id}`}
            >
              {customer.logoText}
            </button>
          ))}
        </div>

        {/* Selected Customer Case Study Card */}
        {selectedCustomer && (
          <div className="mt-8 p-6 bg-white border border-[#ebebeb] rounded-[16px] shadow-floating relative max-w-2xl mx-auto animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-[#8f8f8f] hover:text-[#171717] p-1 rounded-[4px]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xl font-bold font-mono text-[#171717]">
                {selectedCustomer.logoText}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-[#d3e5ff] text-[#0761d1] rounded-[4px]">
                CASE STUDY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[8px]">
                <div className="text-2xl font-bold text-[#171717]">{selectedCustomer.metric}</div>
                <div className="text-[11px] text-[#8f8f8f] font-mono mt-0.5">{selectedCustomer.metricLabel}</div>
              </div>
              <div className="sm:col-span-2 p-3 bg-[#fafafa] border border-[#ebebeb] rounded-[8px] flex items-start space-x-2">
                <Quote className="w-4 h-4 text-[#8f8f8f] shrink-0 mt-0.5" />
                <p className="text-xs text-[#4d4d4d] italic leading-relaxed">
                  "{selectedCustomer.quote}"
                </p>
              </div>
            </div>

            <div className="text-xs text-[#8f8f8f] font-mono">
              <strong className="text-[#171717]">{selectedCustomer.author}</strong> — {selectedCustomer.role}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
