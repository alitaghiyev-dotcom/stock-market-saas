'use client';

import React from 'react';
import { Search, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'terminal' | 'portfolio' | 'ai' | 'news' | 'pricing' | 'proposal';
  setActiveTab: (tab: 'terminal' | 'portfolio' | 'ai' | 'news' | 'pricing' | 'proposal') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openPortfolioModal: () => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  openPortfolioModal,
  openAuthModal
}) => {
  const tabs = [
    { id: 'terminal', label: 'Terminal' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'ai', label: 'Intelligence' },
    { id: 'news', label: 'News Wire' },
    { id: 'pricing', label: 'Plans & BMC' },
    { id: 'proposal', label: 'Overview' }
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo - Minimalist & Sleek */}
        <div className="flex items-center gap-8">
          <div
            onClick={() => setActiveTab('terminal')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 font-black text-sm tracking-tighter">
              P
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-zinc-100 text-sm tracking-tight">
                PulseTrade
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                / Terminal
              </span>
            </div>
          </div>

          {/* Navigation Links - Subtle Clean Segment */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'text-white bg-zinc-800/80 font-medium'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 font-normal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Minimalist Search Input */}
          <div className="relative w-36 sm:w-52">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg pl-8 pr-3 py-1 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono transition"
            />
          </div>

          <button
            onClick={openPortfolioModal}
            className="hidden sm:inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-lg transition active:scale-98 shadow-sm"
          >
            <span>+ Position</span>
          </button>

          {/* Account Icon */}
          <button
            onClick={openAuthModal}
            className="flex items-center gap-2 p-1 pl-2 text-zinc-400 hover:text-zinc-200 rounded-lg border border-transparent hover:border-zinc-800 transition"
            title="Account & Settings"
          >
            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-[11px] text-zinc-300 font-medium">
              <User size={13} />
            </div>
            <span className="hidden xl:inline text-xs text-zinc-300 font-medium">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};
