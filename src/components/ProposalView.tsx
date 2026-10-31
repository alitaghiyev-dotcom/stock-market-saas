'use client';

import React from 'react';
import { FileText } from 'lucide-react';

export const ProposalView: React.FC = () => {
  return (
    <div className="py-4 max-w-5xl mx-auto space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Academic Submission • 2026
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 text-xs">Innovation &amp; Entrepreneurship</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Real-Time Stock Market Tracking &amp; Analytics
          </h2>
          <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
            AI-powered financial intelligence SaaS platform designed to eliminate expensive institutional terminal barriers for retail investors and analysts.
          </p>
        </div>

        <a
          href="/Project_Proposal_Updated.pdf"
          target="_blank"
          className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs px-3.5 py-2 rounded-lg transition active:scale-98 shadow-sm whitespace-nowrap"
        >
          <FileText size={14} />
          <span>View 1-Page Proposal PDF</span>
        </a>
      </div>

      {/* Team Breakdown */}
      <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-6 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
          Team Members &amp; BMC Responsibilities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-lg">
            <span className="text-xs font-semibold text-white block">Muhammed Ali Yağmurlu</span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">BMC Roles:</span>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              Key Partners, Acquisition Channels, Cost Structure &amp; Licensing.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-lg">
            <span className="text-xs font-semibold text-white block">Ali Tağıyev</span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">BMC Roles:</span>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              Key Activities, Technical Infrastructure, Data APIs &amp; Engineering.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-lg">
            <span className="text-xs font-semibold text-white block">Muhammed Furkan Tokalak</span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">BMC Roles:</span>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              Value Propositions, Freemium Subscriptions &amp; Revenue Models.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-lg">
            <span className="text-xs font-semibold text-white block">Kerem Eyvel</span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">BMC Roles:</span>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
              Customer Relationships, Community Ecosystem &amp; Customer Segments.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Verified Grid */}
      <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-6 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">
          System Architecture &amp; Technologies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
            <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px]">Next.js (App Router, TS)</strong>
            <span className="text-zinc-400 text-[11px]">High performance full-stack framework with optimized data endpoints.</span>
          </div>

          <div className="p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
            <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px]">Tailwind CSS &amp; Shadcn</strong>
            <span className="text-zinc-400 text-[11px]">Minimalist dark monochrome financial design system.</span>
          </div>

          <div className="p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
            <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px]">Google Gemini API</strong>
            <span className="text-zinc-400 text-[11px]">Automated NLP sentiment analysis, research thesis &amp; downside evaluation.</span>
          </div>

          <div className="p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
            <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px]">SVG Interactive Charting</strong>
            <span className="text-zinc-400 text-[11px]">Multi-timeframe toggles, SMA (20) moving averages and volume histograms.</span>
          </div>

          <div className="p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
            <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px]">Portfolio P&amp;L Tracking</strong>
            <span className="text-zinc-400 text-[11px]">Real-time portfolio valuation and asset allocation weighting spread.</span>
          </div>

          <div className="p-3 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
            <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px]">BetterAuth Architecture</strong>
            <span className="text-zinc-400 text-[11px]">Encrypted session handling, user identity and 2FA authentication state.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
