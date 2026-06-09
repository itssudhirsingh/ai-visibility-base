import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export default function RankedPrompts({ prompts = [] }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-accent" />
          Ranked Prompts
        </h3>
        <span className="font-mono text-[0.62rem] text-white/20 tracking-wider">{prompts.length} PROMPTS</span>
      </div>
      <div className="divide-y divide-border">
        {prompts.map((p, i) => (
          <div key={i} className="hover:bg-white/[0.02] transition-colors">
            <div
              className="flex items-center justify-between px-5 py-3.5 cursor-pointer"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className={`font-mono text-xs font-bold flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                  p.position <= 3 ? 'bg-primary/10 text-primary' : 'bg-white/[0.05] text-white/30'
                }`}>
                  #{p.position}
                </span>
                <span className="text-sm text-foreground truncate">{p.prompt}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                <span className="font-mono text-[0.65rem] text-accent px-2 py-0.5 bg-accent/10 rounded">{p.llm}</span>
                <span className={`font-mono text-[0.62rem] ${
                  p.sentiment === 'Positive' ? 'text-green-400' : p.sentiment === 'Neutral' ? 'text-primary' : 'text-red-400'
                }`}>
                  {p.sentiment}
                </span>
                {expanded === i ? <ChevronUp className="w-3.5 h-3.5 text-white/30" /> : <ChevronDown className="w-3.5 h-3.5 text-white/30" />}
              </div>
            </div>
            {expanded === i && (
              <div className="px-5 pb-4 pl-16">
                <div className="text-sm text-muted-foreground leading-relaxed bg-white/[0.02] rounded-lg p-4 border border-border">
                  <span className="font-mono text-[0.62rem] text-white/20 uppercase tracking-wider block mb-2">AI Response Context</span>
                  {p.context}
                </div>
              </div>
            )}
          </div>
        ))}
        {prompts.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">No ranked prompts found.</div>
        )}
      </div>
    </div>
  );
}