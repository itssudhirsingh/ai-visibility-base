import React from 'react';

const defaultColors = {
  'ChatGPT': '#10a37f',
  'Gemini': '#4285f4',
  'Perplexity': '#ff6b35',
  'Grok': '#f472b6',
  'Copilot': '#7b6cff',
  'Claude': '#22d3ee',
};

export default function LLMBreakdown({ results = [] }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-heading font-semibold text-sm">LLM Visibility Breakdown</h3>
        <span className="font-mono text-[0.62rem] text-white/20 tracking-wider">PER ENGINE</span>
      </div>
      <div className="divide-y divide-border">
        {results.map((llm, i) => {
          const color = llm.color || defaultColors[llm.name] || '#7b6cff';
          return (
            <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
              <span className="text-sm text-muted-foreground flex items-center gap-2.5 min-w-[100px]">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                {llm.name}
              </span>
              <div className="flex-1 mx-4 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${llm.visibility_pct}%`, background: color }}
                />
              </div>
              <div className="flex items-center gap-4 min-w-[140px] justify-end">
                <span className="font-mono text-xs text-muted-foreground">{llm.visibility_pct}%</span>
                <span className="font-mono text-[0.62rem] text-white/30">{llm.citations} cit.</span>
                <span className={`font-mono text-[0.62rem] ${
                  llm.sentiment === 'Positive' ? 'text-green-400' : llm.sentiment === 'Neutral' ? 'text-primary' : 'text-red-400'
                }`}>
                  {llm.sentiment}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}