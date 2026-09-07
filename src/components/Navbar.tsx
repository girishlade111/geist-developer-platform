import React, { useState } from 'react';
import { Search, Sparkles, Menu, X, Terminal, ArrowUpRight, Github } from 'lucide-react';

interface NavbarProps {
  onOpenAskAI: () => void;
  onOpenDeploy: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAskAI,
  onOpenDeploy,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Frameworks', id: 'frameworks' },
    { label: 'AI Gateway', id: 'ai-gateway' },
    { label: 'Pipeline', id: 'pipeline' },
    { label: 'Templates', id: 'templates' },
    { label: 'Customers', id: 'customers' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fafafa]/90 backdrop-blur-md border-b border-[#ebebeb] transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Left: Wordmark */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center space-x-2 text-[#171717] hover:opacity-80 transition-opacity focus:outline-none"
            id="nav-brand-logo"
          >
            <svg width="20" height="20" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#171717]">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor"/>
            </svg>
            <span className="font-bold text-base tracking-tight text-[#171717]">GEIST</span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-[#f2f2f2] text-[#8f8f8f] border border-[#ebebeb] rounded-[4px]">
              Platform 2026
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`px-3 py-1.5 text-sm font-normal rounded-full transition-all ${
                    isActive
                      ? 'bg-[#171717] text-white font-medium'
                      : 'text-[#4d4d4d] hover:text-[#171717] hover:bg-[#f2f2f2]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Ask AI Command trigger (button-ghost-sm - tight 6px square) */}
          <button
            onClick={onOpenAskAI}
            id="button-ask-ai"
            className="hidden sm:flex items-center space-x-1.5 bg-white border border-[#ebebeb] text-[#171717] text-xs font-medium rounded-[6px] px-2.5 py-1.5 hover:bg-[#f2f2f2] transition-colors shadow-whisper"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7928ca]" />
            <span>Ask AI</span>
            <kbd className="hidden md:inline-block ml-1 px-1 py-0.2 bg-[#f2f2f2] text-[#8f8f8f] border border-[#ebebeb] rounded-[3px] text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Log In (button-ghost-sm) */}
          <button
            onClick={() => onNavigate('pricing')}
            id="button-log-in"
            className="hidden sm:inline-block bg-white border border-[#ebebeb] text-[#171717] text-xs sm:text-sm font-medium rounded-[6px] px-3 py-1.5 hover:bg-[#f2f2f2] transition-colors shadow-whisper"
          >
            Log In
          </button>

          {/* Sign Up / Deploy CTA (button-primary-sm - tight 6px square) */}
          <button
            onClick={onOpenDeploy}
            id="button-sign-up"
            className="bg-[#171717] text-white text-xs sm:text-sm font-medium rounded-[6px] px-3 py-1.5 hover:bg-[#333333] transition-colors shadow-whisper flex items-center space-x-1"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Deploy App</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="button-mobile-menu"
            className="md:hidden p-1.5 text-[#4d4d4d] hover:text-[#171717] rounded-[6px] border border-[#ebebeb] bg-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#ebebeb] bg-white px-4 py-3 space-y-2 shadow-floating animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-1 pb-2 border-b border-[#ebebeb]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 text-sm font-medium text-[#4d4d4d] hover:bg-[#f2f2f2] hover:text-[#171717] rounded-[6px] min-h-[44px] flex items-center"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                onOpenAskAI();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-xs font-medium text-[#171717] bg-[#f2f2f2] border border-[#ebebeb] px-3 py-2.5 rounded-[6px] w-full justify-center min-h-[44px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7928ca]" />
              <span>Ask Geist AI Assistant</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
