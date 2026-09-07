import React, { useState } from 'react';
import { TEMPLATES } from '../data/mockData';
import { Template } from '../types';
import { Star, GitFork, ArrowUpRight, Search, Code, Terminal } from 'lucide-react';

interface TemplateLibraryProps {
  onSelectTemplate: (template: Template) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI Apps', 'Web Apps', 'E-commerce', 'Edge Functions'];

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.framework.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="templates" className="py-20 bg-[#fafafa] border-b border-[#ebebeb]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[12px] font-mono font-medium tracking-wider uppercase text-[#8f8f8f]">
              TEMPLATE REGISTRY // PRODUCTION STARTERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
              Start with a battle-tested template.
            </h2>
            <p className="text-[#4d4d4d] text-base mt-1">
              Clone and deploy open-source Geist templates directly to your edge account.
            </p>
          </div>

          {/* Search bar (tight 6px input) */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8f8f8f] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#ebebeb] text-[#171717] text-xs sm:text-sm rounded-[6px] pl-9 pr-3 py-2 focus:outline-none focus:border-[#171717] shadow-whisper"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors border ${
                selectedCategory === cat
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white border-[#ebebeb] text-[#4d4d4d] hover:text-[#171717] hover:bg-[#f2f2f2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="p-6 bg-white border border-[#ebebeb] rounded-[12px] shadow-whisper flex flex-col justify-between hover:border-[#8f8f8f] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#f2f2f2] text-[#171717] border border-[#ebebeb] rounded-[4px]">
                    {template.framework}
                  </span>
                  <div className="flex items-center space-x-3 text-xs text-[#8f8f8f] font-mono">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-current text-[#f9cb28]" />
                      <span>{template.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{template.deployCount}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#171717] tracking-tight group-hover:text-[#0070f3] transition-colors mb-2">
                  {template.name}
                </h3>
                <p className="text-xs text-[#4d4d4d] leading-relaxed mb-4">
                  {template.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#f2f2f2] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8f8f8f] uppercase">
                  {template.category}
                </span>

                <button
                  onClick={() => onSelectTemplate(template)}
                  id={`button-deploy-template-${template.id}`}
                  className="bg-[#171717] text-white text-xs font-medium rounded-[6px] px-3 py-1.5 hover:bg-[#333333] transition-colors flex items-center space-x-1"
                >
                  <Terminal className="w-3 h-3" />
                  <span>Deploy Starter</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
