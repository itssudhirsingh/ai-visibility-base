import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  'Scanning site architecture...',
  'Querying ChatGPT...',
  'Querying Gemini...',
  'Querying Perplexity...',
  'Querying Grok...',
  'Querying Copilot...',
  'Querying Claude...',
  'Analyzing citations...',
  'Generating optimization report...',
];

export default function AnalysisLoader({ currentStep = 0, url }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated ring */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <svg className="w-full h-full animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(260 20% 12%)" strokeWidth="4" />
            <circle cx="64" cy="64" r="56" fill="none" stroke="hsl(75 88% 61%)" strokeWidth="4" strokeLinecap="round"
              strokeDasharray="352" strokeDashoffset={352 - (352 * ((currentStep + 1) / steps.length))} className="transition-all duration-700" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading font-bold text-2xl text-primary">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
        </div>

        <h2 className="font-heading font-bold text-xl mb-2">Analyzing your site</h2>
        <p className="font-mono text-xs text-primary mb-8 tracking-wider">{url}</p>

        <div className="flex flex-col gap-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i <= currentStep ? 1 : 0.2, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`flex items-center gap-3 text-sm px-4 py-2 rounded-lg ${
                i < currentStep ? 'text-green-400' : i === currentStep ? 'text-primary bg-primary/5' : 'text-white/15'
              }`}
            >
              <span className="font-mono text-[0.65rem] w-4">
                {i < currentStep ? '✓' : i === currentStep ? '→' : '·'}
              </span>
              {step}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}