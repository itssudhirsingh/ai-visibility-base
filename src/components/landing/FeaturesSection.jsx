import React from 'react';
import { Brain, TrendingUp, Search, Zap, Trophy, Mail } from 'lucide-react';

const features = [
  { icon: Brain, title: 'LLM Citation Tracking', desc: 'Monitor how often and in what context your domain is cited across ChatGPT, Gemini, Perplexity, Grok, Copilot, and Claude. Updated daily.', tag: 'Core', iconBg: 'bg-primary/10 border-primary/20' },
  { icon: TrendingUp, title: 'AEO Score', desc: 'A single composite score from 0 to 100 measuring your overall AI engine visibility, built from citation frequency, sentiment, authority, and content structure signals.', tag: 'Scoring', iconBg: 'bg-accent/10 border-accent/20' },
  { icon: Search, title: 'Content Gap Analysis', desc: 'Discover which questions your competitors get cited for that you don\'t. Get a prioritised list of BLUF-structured content topics to close the gap.', tag: 'Strategy', iconBg: 'bg-cyan-400/10 border-cyan-400/20' },
  { icon: Zap, title: 'llms.txt Validator', desc: 'Check if your llms.txt file exists, is correctly formatted, and is being respected by major crawlers. Get a one-click fix template if issues are found.', tag: 'Technical', iconBg: 'bg-pink-400/10 border-pink-400/20' },
  { icon: Trophy, title: 'Competitor Benchmarking', desc: 'Add up to 10 competitor domains and see how your AI visibility score compares across every LLM, keyword category, and content vertical.', tag: 'Intelligence', iconBg: 'bg-green-400/10 border-green-400/20' },
  { icon: Mail, title: 'Weekly Alert Reports', desc: 'Receive a curated email digest every Monday with changes in your citation count, new competitor movements, and the top 3 action items for that week.', tag: 'Monitoring', iconBg: 'bg-yellow-400/10 border-yellow-400/20' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6 md:px-14 max-w-[1320px] mx-auto">
      <div className="flex justify-between items-end mb-12 flex-wrap gap-8">
        <div>
          <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-accent mb-3 flex items-center gap-3">
            02 — Features
            <span className="w-8 h-px bg-border" />
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3.8rem)] leading-[1.05] tracking-tight">
            Everything your<br /><span className="text-muted-foreground">AEO strategy needs.</span>
          </h2>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed max-w-[480px]">
          Built for SEO professionals who know that the next frontier of search is already here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="bg-card p-8 relative overflow-hidden group hover:bg-[hsl(260,40%,9%)] transition-colors">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center border ${f.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{f.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
              <span className="inline-block mt-4 font-mono text-[0.62rem] tracking-[0.08em] uppercase text-accent bg-accent/10 border border-accent/20 rounded px-2.5 py-1">{f.tag}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}