import React from 'react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#fafafa] border-t border-[#ebebeb] py-16 text-xs text-[#4d4d4d]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2 text-[#171717]">
              <svg width="20" height="20" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#171717]">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor"/>
              </svg>
              <span className="font-bold text-base tracking-tight text-[#171717]">GEIST</span>
            </div>
            <p className="text-xs text-[#8f8f8f] max-w-sm leading-relaxed">
              Engineering the web platform with zero-config edge hosting, intelligent AI Gateways, and high-contrast design systems.
            </p>
            <div className="text-[11px] font-mono text-[#8f8f8f]">
              © {new Date().getFullYear()} Geist Platform Inc. All rights reserved.
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-2.5">
            <div className="font-mono font-semibold text-[#171717] uppercase text-[11px]">Product</div>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('frameworks')} className="hover:text-[#171717]">Frameworks</button></li>
              <li><button onClick={() => onNavigate('ai-gateway')} className="hover:text-[#171717]">AI Gateway</button></li>
              <li><button onClick={() => onNavigate('pipeline')} className="hover:text-[#171717]">Edge Functions</button></li>
              <li><button onClick={() => onNavigate('templates')} className="hover:text-[#171717]">Templates</button></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-2.5">
            <div className="font-mono font-semibold text-[#171717] uppercase text-[11px]">Resources</div>
            <ul className="space-y-2">
              <li><a href="#docs" className="hover:text-[#171717]">Documentation</a></li>
              <li><a href="#guides" className="hover:text-[#171717]">Geist Design Spec</a></li>
              <li><a href="#integrations" className="hover:text-[#171717]">API Reference</a></li>
              <li><a href="#status" className="hover:text-[#171717]">Global Status (99.99%)</a></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-2.5">
            <div className="font-mono font-semibold text-[#171717] uppercase text-[11px]">Company</div>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('customers')} className="hover:text-[#171717]">Customers</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-[#171717]">Pricing</button></li>
              <li><a href="#careers" className="hover:text-[#171717]">Careers</a></li>
              <li><a href="#privacy" className="hover:text-[#171717]">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#ebebeb] flex flex-col sm:flex-row items-center justify-between text-[#8f8f8f] font-mono text-[11px] gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#50e3c2]" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div>POWERED BY GEIST DESIGN SYSTEM & EDGE RUNTIME</div>
        </div>

      </div>
    </footer>
  );
};
