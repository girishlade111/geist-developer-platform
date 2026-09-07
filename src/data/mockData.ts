import { Template, CustomerCaseStudy, PricingPlan, AIGatewayLog } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'nextjs-ai-chatbot',
    name: 'Next.js AI Chatbot',
    description: 'Full-featured AI chat app with streaming responses, conversation history, and tool calling.',
    category: 'AI Apps',
    framework: 'Next.js',
    stars: 12400,
    deployCount: '185k',
    codeSnippet: `import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const { text } = await generateText({
    model: google('gemini-2.5-flash'),
    prompt,
  });
  return Response.json({ text });
}`
  },
  {
    id: 'ai-gateway-proxy',
    name: 'Edge AI Gateway',
    description: 'Low-latency proxy with multi-provider failover, semantic caching, and token usage limits.',
    category: 'AI Apps',
    framework: 'Next.js',
    stars: 8900,
    deployCount: '92k',
    codeSnippet: `export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const cacheKey = req.headers.get('x-cache-key');
  const cached = await kv.get(cacheKey);
  if (cached) return new Response(cached, { headers: { 'x-cache': 'HIT' } });
  
  const res = await fetch('https://api.gateway.vercel.com/v1/chat');
  return res;
}`
  },
  {
    id: 'commerce-storefront',
    name: 'Next.js Commerce',
    description: 'High-performance e-commerce starter powered by Edge Middleware and ISR.',
    category: 'E-commerce',
    framework: 'Next.js',
    stars: 18200,
    deployCount: '310k',
    codeSnippet: `export async function getStaticProps() {
  const products = await shopifyFetch({ query: GET_ALL_PRODUCTS });
  return {
    props: { products },
    revalidate: 60, // Incremental Static Regeneration
  };
}`
  },
  {
    id: 'edge-middleware-auth',
    name: 'Edge Auth & Geo-Routing',
    description: 'Instant JWT validation and regional content personalization at sub-10ms response times.',
    category: 'Edge Functions',
    framework: 'Astro',
    stars: 6400,
    deployCount: '54k',
    codeSnippet: `import { geolocation } from '@vercel/functions';

export function middleware(request: Request) {
  const { country } = geolocation(request);
  if (country === 'JP') {
    return Response.redirect('https://jp.vercel.app');
  }
}`
  },
  {
    id: 'sveltekit-dashboard',
    name: 'SvelteKit Realtime Analytics',
    description: 'Ultra-fast realtime web vitals & stream analytics dashboard with zero client-side overhead.',
    category: 'Web Apps',
    framework: 'SvelteKit',
    stars: 4300,
    deployCount: '41k',
    codeSnippet: `import { readable } from 'svelte/store';

export const realtimeMetrics = readable({}, (set) => {
  const eventSource = new EventSource('/api/vitals/stream');
  eventSource.onmessage = (event) => set(JSON.parse(event.data));
  return () => eventSource.close();
});`
  }
];

export const CUSTOMERS: CustomerCaseStudy[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    logoText: 'OpenAI',
    metric: '99.99%',
    metricLabel: 'Uptime on ChatGPT Web',
    quote: 'Vercel allows us to deploy frontend changes to millions of users in seconds with total confidence.',
    author: 'Sam Altman',
    role: 'CEO, OpenAI'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    logoText: 'Perplexity',
    metric: '40ms',
    metricLabel: 'Global TTFB via Edge',
    quote: 'The AI Gateway and Edge Middleware give us unparalleled speed for real-time generative search.',
    author: 'Aravind Srinivas',
    role: 'CEO, Perplexity AI'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    logoText: 'Supabase',
    metric: '10x',
    metricLabel: 'Faster Build Pipelines',
    quote: 'Geist design patterns and Vercel infrastructure empower us to maintain a world-class dev experience.',
    author: 'Paul Copplestone',
    role: 'Co-founder, Supabase'
  },
  {
    id: 'linear',
    name: 'Linear',
    logoText: 'LINEAR',
    metric: '<100ms',
    metricLabel: 'Sync Latency',
    quote: 'Zero-config previews and Instant Rollbacks make product iterations seamless across our entire team.',
    author: 'Karri Saarinen',
    role: 'CEO, Linear'
  },
  {
    id: 'notion',
    name: 'Notion',
    logoText: 'Notion',
    metric: '5B+',
    metricLabel: 'Monthly Edge Requests',
    quote: 'Vercel is the quiet backbone of our web platform. It scales effortlessly with our user base.',
    author: 'Ivan Zhao',
    role: 'Co-founder, Notion'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'hobby',
    name: 'Hobby',
    description: 'The basics for personal projects, experiments, and open-source software.',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      '100GB Bandwidth / month',
      'Automatic SSL & Custom Domains',
      'Unlimited Preview Deployments',
      'Continuous Deployment with Git',
      '1,000 AI Gateway Tokens / day',
      'Community Support'
    ],
    cta: 'Start for Free'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For teams and growing businesses needing higher performance and security.',
    priceMonthly: 20,
    priceYearly: 16,
    popular: true,
    features: [
      '1TB Bandwidth included',
      '1,000 Build Minutes / month',
      '10M AI Gateway Request Proxying',
      'Instant Rollbacks & Parallel Builds',
      'Edge Middleware & Semantic Cache',
      'Web Analytics & Speed Insights',
      'Email & Slack Priority Support'
    ],
    cta: 'Start 14-Day Free Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom security, isolation, dedicated support, and custom AI contracts.',
    priceMonthly: 120,
    priceYearly: 99,
    features: [
      'Custom Bandwidth & Compute Scale',
      '99.99% Guaranteed SLA Uptime',
      'Dedicated Edge Network Nodes',
      'Custom AI Gateway Caching Rules',
      'SOC2 Type II & SAML SSO / Okta',
      '24/7/365 Dedicated TAM & Escalation'
    ],
    cta: 'Contact Sales'
  }
];

export const INITIAL_AI_LOGS: AIGatewayLog[] = [
  {
    id: 'log-101',
    timestamp: 'Just now',
    model: 'gemini-2.5-flash',
    prompt: 'Synthesize Next.js 15 Server Action security best practices.',
    response: 'Use input validation with Zod schemas, ensure csrf checks, and protect server endpoints with auth middleware.',
    latencyMs: 142,
    tokens: 380,
    cost: '$0.00004',
    cached: true
  },
  {
    id: 'log-102',
    timestamp: '2s ago',
    model: 'gemini-2.5-pro',
    prompt: 'Optimize Edge KV lookup latency for regional routing.',
    response: 'Utilize stale-while-revalidate headers with edge memory caching to reduce roundtrips to under 8ms.',
    latencyMs: 310,
    tokens: 520,
    cost: '$0.00012',
    cached: false
  },
  {
    id: 'log-103',
    timestamp: '5s ago',
    model: 'gemini-2.5-flash',
    prompt: 'Generate Geist Sans CSS font feature settings string.',
    response: 'font-feature-settings: "cv02", "cv03", "cv04", "cv11";',
    latencyMs: 98,
    tokens: 140,
    cost: '$0.00001',
    cached: true
  }
];
