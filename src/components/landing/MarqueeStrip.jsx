import React from 'react';

const items = [
  'ChatGPT Citations', 'Perplexity Mentions', 'Gemini Visibility', 'Grok Indexing',
  'Bing Copilot', 'Claude AI', 'AEO Score', 'BLUF Content', 'llms.txt',
  'E-E-A-T Signals', 'Schema Validation', 'Citation Tracking'
];

export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden border-y border-border bg-[hsl(260,50%,4%)] py-4">
      <div className="flex w-max" style={{ animation: 'marquee 28s linear infinite' }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-5 px-10 whitespace-nowrap font-mono text-[0.7rem] tracking-[0.12em] uppercase text-white/20">
            <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}