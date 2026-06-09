import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free', price: '0', desc: 'Perfect for checking your own site and seeing where you stand.',
    features: ['1 domain scan per day', 'AEO score for 3 LLMs', 'Basic citation count', 'llms.txt validator', '7-day history'],
    cta: 'Get started free', featured: false,
  },
  {
    name: 'Pro', price: '49', desc: 'For SEO professionals managing client sites and their own brands.',
    features: ['10 domains included', 'All 6 LLMs tracked daily', 'Full citation context + sentiment', 'Competitor benchmarking (up to 5)', 'Content gap analysis', 'Weekly email digest reports', '90-day history', 'CSV/PDF exports'],
    cta: 'Start 14-day free trial', featured: true,
  },
  {
    name: 'Agency', price: '149', desc: 'For agencies managing multiple client accounts at scale.',
    features: ['Unlimited domains', 'All 6 LLMs + custom prompt testing', 'White-label reports for clients', 'Unlimited competitor tracking', 'API access (coming soon)', 'Priority Slack support', '365-day history'],
    cta: 'Contact sales', featured: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28 px-6 md:px-14 max-w-[1320px] mx-auto">
      <div className="text-center mb-14">
        <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-accent mb-3 flex items-center justify-center gap-3">
          04 — Pricing
        </div>
        <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3.8rem)] leading-[1.05] tracking-tight mb-4">
          Simple, transparent<br /><span className="text-muted-foreground">pricing.</span>
        </h2>
        <p className="text-base text-muted-foreground">Start free. Scale when you need. No lock-in.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-[440px] lg:max-w-none mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={`bg-card border rounded-2xl p-10 relative overflow-hidden transition-all hover:-translate-y-1 ${plan.featured ? 'border-primary/40 bg-gradient-to-br from-primary/[0.04] to-card' : 'border-border hover:border-white/15'}`}>
            {plan.featured && (
              <span className="absolute top-5 right-5 font-mono text-[0.6rem] tracking-[0.1em] uppercase text-primary-foreground bg-primary px-2.5 py-1 rounded font-semibold">Most Popular</span>
            )}
            <div className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-white/20 mb-3">{plan.name}</div>
            <div className="font-heading font-bold text-5xl leading-none tracking-tight mb-1">
              <sup className="text-lg text-muted-foreground align-super">$</sup>{plan.price}<span className="text-base text-muted-foreground font-normal">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground mb-7">{plan.desc}</p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <Sparkles className="w-3 h-3 text-primary flex-shrink-0 mt-1" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className={`block w-full text-center py-3.5 rounded-full font-heading font-bold text-sm tracking-wider transition-all ${
                plan.featured
                  ? 'bg-primary text-primary-foreground hover:bg-[#d4ff55] hover:-translate-y-0.5'
                  : 'border border-border text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}