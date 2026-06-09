import React from 'react';

const stats = [
  { num: '2.4', suffix: 'B', label: 'AI queries processed daily across tracked LLMs' },
  { num: '94', suffix: '%', label: 'Of top-cited domains have structured AEO signals' },
  { num: '6', suffix: 'x', label: 'More organic trust from AI-cited pages vs non-cited' },
  { num: '30', suffix: 's', label: 'Average time to get your full AI visibility report' },
];

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-border bg-[hsl(260,50%,4%)]">
      {stats.map((s, i) => (
        <div key={i} className="p-8 md:p-12 border-r border-border last:border-r-0 relative group overflow-hidden hover:bg-white/[0.02] transition-colors">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
          <div className="font-heading font-bold text-[clamp(2.2rem,3.5vw,3.5rem)] leading-none text-white tracking-tight mb-1">
            {s.num}<span className="text-primary text-[0.6em]">{s.suffix}</span>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">{s.label}</div>
        </div>
      ))}
    </div>
  );
}