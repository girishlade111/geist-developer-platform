import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomerLogoStrip } from './components/CustomerLogoStrip';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CodeEditorCard } from './components/CodeEditorCard';
import { PipelineNodeGraph } from './components/PipelineNodeGraph';
import { FeatureGrid } from './components/FeatureGrid';
import { TemplateLibrary } from './components/TemplateLibrary';
import { PricingSection } from './components/PricingSection';
import { CtaBand } from './components/CtaBand';
import { Footer } from './components/Footer';
import { AskAIModal } from './components/AskAIModal';
import { DeployModal } from './components/DeployModal';
import { Template } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [askAiOpen, setAskAiOpen] = useState(false);
  const [deployOpen, setDeployOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartDeploy = () => {
    setSelectedTemplate(null);
    setDeployOpen(true);
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setDeployOpen(true);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedTemplate(null);
    setDeployOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] font-sans selection:bg-[#171717] selection:text-white flex flex-col antialiased">
      
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenAskAI={() => setAskAiOpen(true)}
        onOpenDeploy={handleStartDeploy}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section with Mesh Gradient */}
        <Hero
          onStartDeploy={handleStartDeploy}
          onOpenAskAI={() => setAskAiOpen(true)}
        />

        {/* Customer Logos & Case Studies */}
        <CustomerLogoStrip />

        {/* Category Workloads & AI Gateway Showcase */}
        <CategoryShowcase />

        {/* Code Editor & Edge API Spec Sheet */}
        <CodeEditorCard />

        {/* Pipeline Node Graph (Develop -> Preview -> Ship) */}
        <PipelineNodeGraph />

        {/* Feature Grid with Micro-Benchmarks */}
        <FeatureGrid />

        {/* Template Registry */}
        <TemplateLibrary onSelectTemplate={handleSelectTemplate} />

        {/* Pricing & Interactive Usage Estimator */}
        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* Final CTA Band */}
        <CtaBand onStartDeploy={handleStartDeploy} />

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Floating Modals */}
      <AskAIModal
        isOpen={askAiOpen}
        onClose={() => setAskAiOpen(false)}
      />

      <DeployModal
        isOpen={deployOpen}
        onClose={() => setDeployOpen(false)}
        selectedTemplate={selectedTemplate}
      />

    </div>
  );
}
