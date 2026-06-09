import React from 'react';
import { Eye } from 'lucide-react';

const cols = [
  { title: 'Product', links: ['How it works', 'Features', 'Dashboard', 'Pricing', 'API (coming soon)'] },
  { title: 'Resources', links: ['AEO Guide', 'llms.txt Generator', 'BLUF Content Templates', 'Blog', 'Changelog'] },
  { title: 'Company', links: ['About', 'Privacy Policy', 'Terms of Service', 'Contact'] },
];

export default function Footer() {
  return (
    <footer>
      <div className="border-t border-border px-6 md:px-14 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Eye className="w-3 h-3 text-white" />
            </div>
            <span className="font-heading font-bold text-base text-white">AEOvision</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
            AI visibility intelligence for the next era of search.
          </p>
        </div>
        {cols.map((col, i) => (
          <div key={i}>
            <div className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-white/20 mb-4">{col.title}</div>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link, j) => (
                <li key={j}><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-6 md:px-14 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="font-mono text-[0.65rem] text-white/20 tracking-wider">© 2025 <span className="text-muted-foreground">AEOvision</span> — AI Visibility Intelligence Platform</div>
        <div className="font-mono text-[0.65rem] text-white/20 tracking-wider">Built for the next era of search.</div>
      </div>
    </footer>
  );
}