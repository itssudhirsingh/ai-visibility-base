import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import HeroCanvas from './HeroCanvas';

export default function HeroSection() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!url.trim()) return;
    navigate(`/dashboard?url=${encodeURIComponent(url.trim())}`);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden text-center">
      <HeroCanvas />
      
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(4,3,12,0.8) 70%, hsl(260 50% 3%) 100%)'
      }} />

      <div className="relative z-[2] max-w-[780px]">
        <div className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: 'blink 2s ease-in-out infinite' }} />
          {"Now tracking ChatGPT, Gemini, Perplexity & Grok"}
        </div>

        <h1 className="font-heading font-bold text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-tighter mb-6">
          Is your site<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(237,233,255,0.3)' }}>visible</span>{" to"}<br />
          <span className="text-primary">AI engines?</span>
        </h1>

        <p className="text-[clamp(0.95rem,2vw,1.15rem)] text-muted-foreground leading-relaxed max-w-[540px] mx-auto mb-10">
          AEOvision tracks how often your website gets cited, mentioned, and recommended by large language models. Paste your URL and get your AI visibility score in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-0 max-w-[620px] mx-auto mb-5 bg-white/[0.04] border border-white/[0.16] rounded-xl sm:rounded-full p-1.5 sm:pl-6 focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(200,242,71,0.08),0_8px_32px_rgba(0,0,0,0.4)] transition-all">
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            placeholder="https://yourdomain.com"
            className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-foreground tracking-wide px-3 sm:px-0 py-2.5"
          />
          <button
            onClick={handleAnalyze}
            className="flex-shrink-0 font-heading text-sm font-bold tracking-wider bg-primary text-primary-foreground rounded-lg sm:rounded-full px-6 py-3 flex items-center justify-center gap-2 hover:bg-[#d4ff55] transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            Analyse now
          </button>
        </div>

        <div className="flex items-center justify-center gap-5 flex-wrap font-mono text-[0.65rem] tracking-[0.08em] text-white/20">
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary" />Free forever plan</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary" />No credit card needed</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-primary" />{"Results in <30 seconds"}</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2" style={{ animation: 'pulseGlow 2.5s ease-in-out infinite' }}>
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/50" />
      </div>
    </section>
  );
}