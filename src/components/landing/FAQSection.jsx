import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What exactly is AEO and why does it matter now?', a: 'AEO (Answer Engine Optimisation) is the practice of making your content visible and citable within AI-generated answers from tools like ChatGPT, Gemini, and Perplexity. As more users skip Google and go straight to AI assistants for answers, being cited in those answers is becoming as important as ranking on page one.' },
  { q: 'How do you check if an LLM has cited my site?', a: 'We run thousands of relevant prompts across each LLM engine, spanning categories relevant to your niche. We record whether your domain appears in the response, the context it appears in, and the sentiment of the mention.' },
  { q: 'Is this different from tracking AI Overviews in Google Search Console?', a: 'Yes. GSC tracks your visibility in Google\'s traditional search results and AI Overviews. AEOvision tracks your visibility in standalone AI chat tools like ChatGPT, Perplexity, and Gemini that have hundreds of millions of direct users.' },
  { q: 'What is llms.txt and why should I care?', a: 'llms.txt is an emerging standard (similar to robots.txt) that tells AI crawlers how to access and use your content. Sites with a well-structured llms.txt file signal authority and crawlability to LLM training pipelines.' },
  { q: 'Can I track competitor domains on the free plan?', a: 'Competitor tracking is available on Pro and Agency plans. The free plan allows you to scan your own domain and see a limited snapshot of how you compare to the industry average in your niche.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-28 px-6 md:px-14 max-w-[1320px] mx-auto text-center">
      <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-accent mb-3 flex items-center justify-center gap-3">
        05 — FAQ
      </div>
      <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3.8rem)] leading-[1.05] tracking-tight mb-12">
        Common <span className="text-muted-foreground">questions.</span>
      </h2>

      <div className="max-w-[800px] mx-auto text-left">
        {faqs.map((faq, i) => (
          <div key={i} className={`border-t border-border py-6 cursor-pointer ${i === faqs.length - 1 ? 'border-b' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex justify-between items-center gap-4 font-heading font-medium text-base text-foreground hover:text-primary transition-colors">
              {faq.q}
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${open === i ? 'border-primary text-primary rotate-180' : 'border-border text-muted-foreground'}`}>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className={`text-sm text-muted-foreground leading-relaxed overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 pt-3' : 'max-h-0'}`}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}