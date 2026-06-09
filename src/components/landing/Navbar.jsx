import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 py-4 bg-background/70 backdrop-blur-xl border-b border-border">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
          <Eye className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-heading font-bold text-sm text-white tracking-tight">AEOvision</span>
      </Link>

      <ul className="hidden md:flex gap-8">
        {['How it works', 'Features', 'Pricing'].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">
              {item}
            </a>
          </li>
        ))}
        <li>
          <Link to="/history" className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide">
            History
          </Link>
        </li>
      </ul>

      <div className="flex gap-3 items-center">
        <Link to="/login" className="hidden sm:inline-flex font-heading text-xs font-semibold tracking-wider px-5 py-2.5 border border-border rounded-full text-muted-foreground hover:border-white/20 hover:text-foreground transition-all">
          Log in
        </Link>
        <Link to="/register" className="font-heading text-xs font-bold tracking-wider px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all">
          Start free
        </Link>
      </div>
    </nav>
  );
}