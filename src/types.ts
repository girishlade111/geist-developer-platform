export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'AI Apps' | 'Web Apps' | 'E-commerce' | 'Edge Functions';
  framework: 'Next.js' | 'SvelteKit' | 'Nuxt' | 'Astro' | 'Vite';
  stars: number;
  deployCount: string;
  codeSnippet: string;
}

export interface PipelineStage {
  id: 'develop' | 'preview' | 'ship';
  name: string;
  status: 'idle' | 'building' | 'success' | 'failed';
  gradient: string;
  durationMs: number;
  commitHash: string;
  author: string;
  message: string;
  branch: string;
  url?: string;
}

export interface CustomerCaseStudy {
  id: string;
  name: string;
  logoText: string;
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
  role: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface AIGatewayLog {
  id: string;
  timestamp: string;
  model: string;
  prompt: string;
  response: string;
  latencyMs: number;
  tokens: number;
  cost: string;
  cached: boolean;
}
