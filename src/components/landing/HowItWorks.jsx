import React from 'react';
import { Link2, Bot, BarChart3, Rocket } from 'lucide-react';

const steps = [
  { icon: Link2, title: 'Paste your URL', desc: 'Enter any domain or specific page URL. We analyse your entire site architecture, content structure, schema markup, and llms.txt status.' },
  { icon: Bot, title: 'We query 6 LLMs', desc: 'Our engine fires thousands of niche prompts across ChatGPT, Gemini, Perplexity, Grok, Copilot, and Claude to check where your brand appears.' },
  { icon: BarChart3, title: 'Get your AEO score', desc: 'Receive a full breakdown — citation frequency, sentiment, competitor gaps, and a prioritised fix list to improve your AI visibility fast.' },
  { icon: Rocket, title: 'Track weekly changes', desc: 'Monitor your AI presence over time with weekly automated scans, email alerts when citations change, and competitor benchmark reports.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 md:px-14 max-w-[1320px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-accent mb-3 flex items-center gap-3">
            01 — How it works
            <span className="w-8 h-px bg-border" />
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3.8rem)] leading-[1.05] tracking-tight mb-4">
            From URL to<br /><span className="text-muted-foreground">full AI audit</span><br />in seconds.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-[480px] mb-12">
            No integrations, no API keys. Just paste your domain and we run a deep scan across every major LLM to see where you stand.
          </p>

          <div className="flex flex-col">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="grid grid-cols-[56px_1fr] gap-6 py-7 border-b border-border first:border-t group hover:pl-3 transition-all cursor-default">
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                      <Icon className="w-4.5 h-4.5 text-accent group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-base mb-1 group-hover:text-primary transition-colors">{step.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mock dashboard card */}
        <div className="hidden lg:block" style={{ animation: 'floatY 7s ease-in-out infinite' }}>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(123,108,255,0.08)]">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-[0.65rem] text-white/20">AEOvision — AI Visibility Report</div>
            </div>
            <div className="p-5">
              <div className="bg-white/[0.04] border border-border rounded-lg px-4 py-2.5 mb-4 font-mono text-[0.7rem] text-muted-foreground flex items-center gap-3">
                <span className="text-primary">yourdomain.com</span>
                <span className="text-white/20">— Last scan: 2 min ago</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[
                  { val: '74', label: 'AEO Score', color: 'text-primary' },
                  { val: '2.8K', label: 'Citations', color: 'text-cyan-400' },
                  { val: '4/6', label: 'LLMs Found', color: 'text-accent' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] border border-border rounded-xl px-3 py-3.5 text-center">
                    <span className={`font-heading font-bold text-2xl leading-none block mb-0.5 ${s.color}`}>{s.val}</span>
                    <span className="text-[0.62rem] text-white/20 tracking-wider">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { name: 'ChatGPT', pct: 88, color: '#10a37f' },
                  { name: 'Gemini', pct: 61, color: '#4285f4' },
                  { name: 'Perplexity', pct: 74, color: '#ff6b35' },
                  { name: 'Copilot', pct: 45, color: '#7b6cff' },
                ].map((llm, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 bg-white/[0.02] rounded-lg text-xs">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: llm.color }} />
                      {llm.name}
                    </span>
                    <div className="flex-1 mx-3 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${llm.pct}%`, background: llm.color }} />
                    </div>
                    <span className="font-mono text-[0.65rem] text-muted-foreground">{llm.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}