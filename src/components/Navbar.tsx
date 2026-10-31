'use client';

import React from 'react';
import { Search, User, Layers, PieChart, Sparkles, Newspaper, Tag, BookOpen } from 'lucide-react';

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
    { id: 'terminal', label: 'Terminal', icon: Layers },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'ai', label: 'Intelligence', icon: Sparkles },
    { id: 'news', label: 'News Wire', icon: Newspaper },
    { id: 'pricing', label: 'Plans & BMC', icon: Tag },
    { id: 'proposal', label: 'Overview', icon: BookOpen }
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/80">
      {/* Main Top Header */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div
            onClick={() => setActiveTab('terminal')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 font-black text-xs sm:text-sm tracking-tighter">
              P
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-zinc-100 text-xs sm:text-sm tracking-tight">
                PulseTrade
              </span>
              <span className="hidden sm:inline text-[10px] text-zinc-500 font-mono">
                / Terminal
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
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
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Search Input - Mobile Optimized */}
          <div className="relative w-28 xs:w-36 sm:w-52">
            <Search className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 w-3 sm:w-3.5 h-3 sm:h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/70 border border-zinc-800 rounded-lg pl-6 sm:pl-8 pr-2 sm:pr-3 py-1 text-[11px] sm:text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono transition"
            />
          </div>

          <button
            onClick={openPortfolioModal}
            className="inline-flex items-center gap-1 bg-zinc-100 hover:bg-white text-zinc-900 text-[11px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg transition active:scale-98 shadow-sm whitespace-nowrap"
          >
            <span>+ Trade</span>
          </button>

          {/* Account Icon */}
          <button
            onClick={openAuthModal}
            className="flex items-center gap-1.5 p-1 text-zinc-400 hover:text-zinc-200 rounded-lg border border-transparent hover:border-zinc-800 transition"
            title="Account"
          >
            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-[10px] text-zinc-300 font-medium">
              <User size={12} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Navigation Tabs (Crucial for Mobile Users!) */}
      <div className="lg:hidden flex items-center overflow-x-auto no-scrollbar px-3 py-1.5 border-t border-zinc-800/60 bg-[#0c0c0f] gap-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Icon size={12} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
