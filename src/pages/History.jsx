const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Eye, ArrowLeft, ExternalLink, Clock, TrendingUp } from 'lucide-react';
import moment from 'moment';

export default function History() {
  const navigate = useNavigate();
  const { data: analyses = [], isLoading } = useQuery({
    queryKey: ['analyses'],
    queryFn: () => db.entities.SiteAnalysis.list('-created_date', 50),
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6 md:px-14 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Eye className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading font-bold text-sm text-white tracking-tight">AEOvision</span>
            </Link>
            <span className="text-white/10">|</span>
            <span className="font-mono text-xs text-muted-foreground tracking-wider">Scan History</span>
          </div>
          <Link to="/" className="flex items-center gap-2 font-heading text-xs font-semibold px-4 py-2 border border-border rounded-full text-muted-foreground hover:border-white/20 hover:text-foreground transition-all">
            <ArrowLeft className="w-3 h-3" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-14 py-8">
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-8">Scan History</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
          </div>
        ) : analyses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No scans yet. Analyze your first URL!</p>
            <Link to="/" className="text-primary hover:underline">Go to home</Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {analyses.map((a) => (
              <div
                key={a.id}
                onClick={() => navigate(`/dashboard?url=${encodeURIComponent(a.url)}`)}
                className="bg-card border border-border rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-white/15 hover:bg-white/[0.02] transition-all group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-semibold text-sm truncate">{a.url}</span>
                      <ExternalLink className="w-3 h-3 text-white/20 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[0.62rem] text-white/30">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{moment(a.created_date).fromNow()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="font-heading font-bold text-2xl text-primary leading-none">{a.aeo_score}</div>
                    <div className="font-mono text-[0.6rem] text-white/20 tracking-wider">AEO SCORE</div>
                  </div>
                  <div className="text-right hidden md:block">
                    <div className="font-heading font-bold text-lg text-cyan-400 leading-none">{a.total_citations?.toLocaleString()}</div>
                    <div className="font-mono text-[0.6rem] text-white/20 tracking-wider">CITATIONS</div>
                  </div>
                  <div className="text-right hidden md:block">
                    <div className="font-heading font-bold text-lg text-accent leading-none">{a.llms_found}/6</div>
                    <div className="font-mono text-[0.6rem] text-white/20 tracking-wider">LLMs</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}