import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!url.trim()) return;
    navigate(`/dashboard?url=${encodeURIComponent(url.trim())}`);
  };

  return (
    <section className="bg-[hsl(260,50%,4%)] border-t border-border py-32 px-6 md:px-14 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(123,108,255,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-[680px] mx-auto">
        <h2 className="font-heading font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tighter mb-5">
          Start tracking your<br /><span className="text-primary">AI visibility</span> today.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-10">
          Over 3,400 SEO professionals already know where they stand in AI search. Do you?
        </p>
        <div className="flex flex-col sm:flex-row gap-0 max-w-[520px] mx-auto bg-white/[0.04] border border-white/[0.16] rounded-xl sm:rounded-full p-1.5 sm:pl-6 focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(200,242,71,0.08)] transition-all">
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            placeholder="https://yourdomain.com"
            className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-foreground px-3 sm:px-0 py-2.5"
          />
          <button
            onClick={handleAnalyze}
            className="flex-shrink-0 font-heading text-sm font-bold bg-primary text-primary-foreground rounded-lg sm:rounded-full px-6 py-3 hover:bg-[#d4ff55] transition-all"
          >
            Analyse free
          </button>
        </div>
      </div>
    </section>
  );
}