const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Eye, ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import AnalysisLoader from '../components/dashboard/AnalysisLoader';
import ScoreCard from '../components/dashboard/ScoreCard';
import LLMBreakdown from '../components/dashboard/LLMBreakdown';
import RankedPrompts from '../components/dashboard/RankedPrompts';
import OptimizationList from '../components/dashboard/OptimizationList';

export default function Dashboard() {
  const urlParams = new URLSearchParams(window.location.search);
  const siteUrl = urlParams.get('url') || '';

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (!siteUrl) { setLoading(false); return; }
    runAnalysis();
  }, [siteUrl]);

  const runAnalysis = async () => {
    setLoading(true);
    setAnalysis(null);
    setLoadingStep(0);

    // Animate through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= 8) { clearInterval(stepInterval); return 8; }
        return prev + 1;
      });
    }, 2500);

    const result = await db.integrations.Core.InvokeLLM({
      prompt: `You are an AI visibility analysis engine. Analyze the website "${siteUrl}" for its visibility and presence across major AI language models (ChatGPT, Gemini, Perplexity, Grok, Copilot, Claude).

Research this website and provide a comprehensive analysis including:
1. An overall AEO (Answer Engine Optimization) score from 0-100
2. Estimated total citations across all LLMs
3. How many LLMs out of 6 are likely to cite this domain
4. Overall sentiment percentage (0-100)
5. Per-LLM breakdown with visibility percentage, citation count, sentiment, and trend
6. Top 8-12 specific prompts/queries where this site would be mentioned or ranked by AI tools, with position, the LLM that mentions it, context of the mention, and sentiment
7. 6-8 specific actionable optimization recommendations to improve AI visibility, each with title, description, priority (high/medium/low), category, and expected impact

Be realistic and data-driven based on what you know about the site. If you don't know the site well, make reasonable estimates based on the domain name and common patterns.`,
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          aeo_score: { type: 'number' },
          total_citations: { type: 'number' },
          llms_found: { type: 'number' },
          sentiment_score: { type: 'number' },
          llm_results: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                visibility_pct: { type: 'number' },
                citations: { type: 'number' },
                sentiment: { type: 'string' },
                trend: { type: 'string' },
                color: { type: 'string' }
              }
            }
          },
          ranked_prompts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                prompt: { type: 'string' },
                llm: { type: 'string' },
                position: { type: 'number' },
                context: { type: 'string' },
                sentiment: { type: 'string' }
              }
            }
          },
          optimizations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                priority: { type: 'string' },
                category: { type: 'string' },
                impact: { type: 'string' }
              }
            }
          }
        }
      }
    });

    clearInterval(stepInterval);
    setLoadingStep(8);

    // Save to entity
    const saved = await db.entities.SiteAnalysis.create({
      url: siteUrl,
      aeo_score: result.aeo_score,
      total_citations: result.total_citations,
      llms_found: result.llms_found,
      sentiment_score: result.sentiment_score,
      llm_results: result.llm_results,
      ranked_prompts: result.ranked_prompts,
      optimizations: result.optimizations,
      status: 'completed'
    });

    setAnalysis({ ...result, id: saved.id });
    setLoading(false);
  };

  if (!siteUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl mb-4">No URL provided</h2>
          <p className="text-muted-foreground mb-6">Please enter a URL to analyze.</p>
          <Link to="/" className="text-primary hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <AnalysisLoader currentStep={loadingStep} url={siteUrl} />;
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl mb-4">Analysis failed</h2>
          <p className="text-muted-foreground mb-6">Something went wrong. Please try again.</p>
          <Link to="/" className="text-primary hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6 md:px-14 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Eye className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-heading font-bold text-sm text-white tracking-tight">AEOvision</span>
            </Link>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="hidden sm:inline font-mono text-xs text-muted-foreground tracking-wider">AI Visibility Report</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={runAnalysis}
              className="flex items-center gap-2 font-heading text-xs font-semibold px-4 py-2 border border-border rounded-full text-muted-foreground hover:border-white/20 hover:text-foreground transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              Re-scan
            </button>
            <Link to="/" className="flex items-center gap-2 font-heading text-xs font-semibold px-4 py-2 border border-border rounded-full text-muted-foreground hover:border-white/20 hover:text-foreground transition-all">
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-14 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading font-bold text-2xl md:text-3xl">AI Visibility Report</h1>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <a href={siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline">
              {siteUrl} <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-white/10">•</span>
            <span>Scanned just now</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ScoreCard value={analysis.aeo_score} label="AEO Score" color="text-primary" delta="Your visibility score" deltaColor="text-white/20" />
          <ScoreCard value={analysis.total_citations?.toLocaleString()} label="Est. Citations" color="text-cyan-400" />
          <ScoreCard value={`${analysis.llms_found}/6`} label="LLMs Found" color="text-accent" />
          <ScoreCard value={`${analysis.sentiment_score}%`} label="Sentiment" color="text-green-400" />
        </div>

        {/* LLM Breakdown */}
        <div className="mb-8">
          <LLMBreakdown results={analysis.llm_results || []} />
        </div>

        {/* Two columns: Prompts + Optimizations */}
        <div className="grid lg:grid-cols-2 gap-8">
          <RankedPrompts prompts={analysis.ranked_prompts || []} />
          <OptimizationList optimizations={analysis.optimizations || []} />
        </div>
      </div>
    </div>
  );
}