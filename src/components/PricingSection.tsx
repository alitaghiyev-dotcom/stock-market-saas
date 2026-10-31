'use client';

import React from 'react';
import { Check } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <div className="py-6 max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
          Business Model &amp; Monetization
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Transparent Tiering
        </h2>
        <p className="text-xs text-zinc-400 max-w-lg mx-auto">
          Freemium subscription architecture mapped directly to our Business Model Canvas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Free Starter */}
        <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white">Starter</h3>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                FREE
              </span>
            </div>

            <div className="mb-5">
              <span className="text-3xl font-bold text-white font-mono">$0</span>
              <span className="text-xs text-zinc-400 ml-1">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-zinc-200" />
                <span>15-Minute Delayed Market Feeds</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-zinc-200" />
                <span>5 Watchlist Assets</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-zinc-200" />
                <span>Basic Technical Charts</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-600">
                <span>— Real-time AI Sentiment Digests</span>
              </li>
            </ul>
          </div>

          <button className="mt-6 w-full py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition">
            Active Tier
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#18181c] border border-zinc-700 rounded-xl p-5 flex flex-col justify-between shadow-xl relative">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white">Pro Trader</h3>
              <span className="text-[10px] bg-zinc-100 text-zinc-900 px-2 py-0.5 rounded font-mono font-bold">
                POPULAR
              </span>
            </div>

            <div className="mb-5">
              <span className="text-3xl font-bold text-white font-mono">$19</span>
              <span className="text-xs text-zinc-400 ml-1">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-200">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-emerald-400" />
                <span>Sub-Second Real-Time Ticking</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-emerald-400" />
                <span>Unlimited Watchlists</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-emerald-400" />
                <span>Automated Gemini AI Research Digests</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-emerald-400" />
                <span>Simulated Portfolio Engine</span>
              </li>
            </ul>
          </div>

          <button className="mt-6 w-full py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition shadow-sm">
            Upgrade to Pro
          </button>
        </div>

        {/* Enterprise */}
        <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white">B2B API</h3>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                ENTERPRISE
              </span>
            </div>

            <div className="mb-5">
              <span className="text-3xl font-bold text-white font-mono">$99</span>
              <span className="text-xs text-zinc-400 ml-1">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Check size={13} className="text-zinc-200" />
                <span>Everything in Pro Plan</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-zinc-200" />
                <span>REST &amp; Webhook Sentiment API</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-zinc-200" />
                <span>Team Multi-User Access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={13} className="text-zinc-200" />
                <span>SLA 99.9% Uptime Guarantee</span>
              </li>
            </ul>
          </div>

          <button className="mt-6 w-full py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};
