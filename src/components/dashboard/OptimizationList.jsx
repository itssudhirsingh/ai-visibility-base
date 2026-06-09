import React from 'react';
import { AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';

const priorityStyles = {
  high: { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400', badge: 'bg-red-500/10 text-red-400' },
  medium: { bg: 'bg-primary/10 border-primary/20', text: 'text-primary', badge: 'bg-primary/10 text-primary' },
  low: { bg: 'bg-accent/10 border-accent/20', text: 'text-accent', badge: 'bg-accent/10 text-accent' },
};

export default function OptimizationList({ optimizations = [] }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-primary" />
          Optimization Recommendations
        </h3>
        <span className="font-mono text-[0.62rem] text-white/20 tracking-wider">{optimizations.length} ACTIONS</span>
      </div>
      <div className="divide-y divide-border">
        {optimizations.map((opt, i) => {
          const style = priorityStyles[opt.priority] || priorityStyles.medium;
          return (
            <div key={i} className="px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${style.bg}`}>
                  {opt.priority === 'high' ? (
                    <AlertTriangle className={`w-3.5 h-3.5 ${style.text}`} />
                  ) : (
                    <ArrowRight className={`w-3.5 h-3.5 ${style.text}`} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-semibold text-sm">{opt.title}</span>
                    <span className={`font-mono text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded ${style.badge}`}>
                      {opt.priority}
                    </span>
                    {opt.category && (
                      <span className="font-mono text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded bg-white/[0.05] text-white/30">
                        {opt.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{opt.description}</p>
                  {opt.impact && (
                    <p className="text-xs text-accent mt-2 font-mono">Expected impact: {opt.impact}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {optimizations.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">No optimizations generated yet.</div>
        )}
      </div>
    </div>
  );
}