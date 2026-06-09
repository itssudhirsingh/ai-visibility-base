import React from 'react';

export default function ScoreCard({ value, label, color = 'text-primary', delta, deltaColor = 'text-green-400' }) {
  return (
    <div className="bg-white/[0.03] border border-border rounded-xl p-5 hover:border-primary/20 transition-colors">
      <div className={`font-heading font-bold text-3xl leading-none mb-1 ${color}`}>
        {value}
      </div>
      <div className="font-mono text-[0.62rem] tracking-[0.06em] uppercase text-white/20 mb-1">{label}</div>
      {delta && (
        <span className={`font-mono text-[0.62rem] ${deltaColor}`}>{delta}</span>
      )}
    </div>
  );
}