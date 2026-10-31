'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_STOCKS, StockData } from '../data/stocks';
import { Navbar } from '../components/Navbar';
import { TickerTape } from '../components/TickerTape';
import { StockChart } from '../components/StockChart';
import { Watchlist } from '../components/Watchlist';
import { AiAnalyst } from '../components/AiAnalyst';
import { PortfolioTracker, Position } from '../components/PortfolioTracker';
import { TradeModal } from '../components/TradeModal';
import { AuthModal } from '../components/AuthModal';
import { NewsSentimentFeed } from '../components/NewsSentimentFeed';
import { PricingSection } from '../components/PricingSection';
import { ProposalView } from '../components/ProposalView';
import { Star, Bell } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'portfolio' | 'ai' | 'news' | 'pricing' | 'proposal'>('terminal');
  const [stocks, setStocks] = useState<Record<string, StockData>>(INITIAL_STOCKS);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NVDA');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [starredSymbols, setStarredSymbols] = useState<string[]>(['NVDA', 'AAPL', 'BTC', 'GOOGL']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLiveTicking] = useState(true);
  const [alertNotification, setAlertNotification] = useState<string | null>(null);

  const [positions, setPositions] = useState<Position[]>([
    { id: 'pos-1', symbol: 'NVDA', shares: 35, buyPrice: 118.50 },
    { id: 'pos-2', symbol: 'AAPL', shares: 50, buyPrice: 215.20 },
    { id: 'pos-3', symbol: 'MSFT', shares: 20, buyPrice: 410.00 },
    { id: 'pos-4', symbol: 'BTC', shares: 0.20, buyPrice: 64200.00 },
    { id: 'pos-5', symbol: 'GOOGL', shares: 25, buyPrice: 172.00 }
  ]);

  const currentStock = stocks[selectedSymbol] || stocks['NVDA'];

  const handleToggleStar = (sym: string) => {
    setStarredSymbols((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleSetAlert = () => {
    setAlertNotification(`Price alert configured for ${currentStock.symbol} at $${(currentStock.price * 1.02).toFixed(2)}`);
    setTimeout(() => {
      setAlertNotification(null);
    }, 3500);
  };

  useEffect(() => {
    if (!isLiveTicking) return;

    const interval = setInterval(() => {
      setStocks((prev) => {
        const next = { ...prev };
        const symbols = Object.keys(next);
        const targetSymbol = Math.random() > 0.4 ? selectedSymbol : symbols[Math.floor(Math.random() * symbols.length)];
        const target = next[targetSymbol];
        if (!target) return prev;

        const deltaPct = (Math.random() * 0.3 - 0.14) / 100;
        const newPrice = Number((target.price * (1 + deltaPct)).toFixed(2));
        const newChange = Number((newPrice - target.open).toFixed(2));
        const newChangePercent = Number(((newChange / target.open) * 100).toFixed(2));

        const updated1D = [...target.history['1D']];
        if (updated1D.length > 0) {
          const lastIdx = updated1D.length - 1;
          updated1D[lastIdx] = {
            ...updated1D[lastIdx],
            price: newPrice
          };
        }

        next[targetSymbol] = {
          ...target,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          high: Math.max(target.high, newPrice),
          low: Math.min(target.low, newPrice),
          history: {
            ...target.history,
            '1D': updated1D
          }
        };

        return next;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isLiveTicking, selectedSymbol]);

  const isCurrentStarred = starredSymbols.includes(currentStock.symbol);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openPortfolioModal={() => setIsTradeModalOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Ticker Ribbon */}
      <TickerTape onSelectTicker={(sym) => {
        if (stocks[sym]) setSelectedSymbol(sym);
      }} />

      {/* Toast Alert */}
      {alertNotification && (
        <div className="fixed top-16 right-6 z-50 bg-[#18181c] border border-zinc-700 p-3 rounded-lg flex items-center gap-2.5 text-xs animate-fadeIn shadow-lg">
          <Bell size={13} className="text-zinc-300" />
          <span className="text-zinc-200 font-mono text-[11px]">{alertNotification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 space-y-4">
        {/* VIEW 1: TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Minimalist Stock Header */}
            <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-bold font-mono text-white">
                  {currentStock.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
                      {currentStock.name}
                    </h1>
                    <span className="text-xs bg-zinc-800 text-zinc-300 font-mono font-medium px-1.5 py-0.5 rounded">
                      {currentStock.symbol}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleStar(currentStock.symbol)}
                      className="text-zinc-600 hover:text-amber-400 transition"
                    >
                      <Star
                        size={15}
                        className={isCurrentStarred ? 'fill-amber-400 text-amber-400' : ''}
                      />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span>{currentStock.sector}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="font-mono text-[11px]">NASDAQ / NYSE</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSetAlert}
                  className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium px-3 py-1.5 rounded-lg transition"
                >
                  <Bell size={13} className="text-zinc-400" />
                  <span>Set Alert</span>
                </button>

                <button
                  onClick={() => setIsTradeModalOpen(true)}
                  className="bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium px-3 py-1.5 rounded-lg transition shadow-sm"
                >
                  + Add Position
                </button>
              </div>
            </div>

            {/* 3-Column Core Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Left Column: Watchlist */}
              <div className="lg:col-span-3">
                <Watchlist
                  stocks={stocks}
                  selectedSymbol={selectedSymbol}
                  onSelectStock={(sym) => setSelectedSymbol(sym)}
                  starredSymbols={starredSymbols}
                  toggleStar={handleToggleStar}
                  searchFilter={searchQuery}
                />
              </div>

              {/* Center Column: Interactive Chart */}
              <div className="lg:col-span-9 xl:col-span-6 space-y-4">
                <StockChart
                  stock={currentStock}
                  timeframe={timeframe}
                  setTimeframe={setTimeframe}
                  isLiveTicking={isLiveTicking}
                />

                {/* Fundamental Metrics */}
                <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2.5">
                    Valuation &amp; Fundamentals
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">Market Cap</span>
                      <span className="font-mono font-medium text-white text-xs">{currentStock.marketCap}</span>
                    </div>

                    <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">P/E Ratio</span>
                      <span className="font-mono font-medium text-white text-xs">{currentStock.peRatio || 'N/A'}</span>
                    </div>

                    <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">52W High</span>
                      <span className="font-mono font-medium text-zinc-200 text-xs">${currentStock.week52High.toFixed(2)}</span>
                    </div>

                    <div className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/50">
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">52W Low</span>
                      <span className="font-mono font-medium text-zinc-200 text-xs">${currentStock.week52Low.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Market Intelligence */}
              <div className="lg:col-span-12 xl:col-span-3">
                <AiAnalyst stock={currentStock} />
              </div>
            </div>

            {/* Bottom Wire Feed */}
            <div className="pt-1">
              <NewsSentimentFeed onSelectSymbol={(sym) => {
                if (stocks[sym]) setSelectedSymbol(sym);
              }} />
            </div>
          </div>
        )}

        {/* VIEW 2: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="animate-fadeIn">
            <PortfolioTracker
              stocks={stocks}
              positions={positions}
              setPositions={setPositions}
              onOpenTradeModal={() => setIsTradeModalOpen(true)}
              onSelectStock={(sym) => {
                setSelectedSymbol(sym);
                setActiveTab('terminal');
              }}
            />
          </div>
        )}

        {/* VIEW 3: AI INTELLIGENCE ROOM */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto animate-fadeIn space-y-3">
            <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Dedicated Intelligence Feed</h2>
                <span className="text-xs text-zinc-400">Select asset to view automated NLP thesis</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {Object.keys(stocks).map((sym) => (
                  <button
                    key={sym}
                    onClick={() => setSelectedSymbol(sym)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md transition ${
                      selectedSymbol === sym ? 'bg-zinc-100 text-zinc-950 font-medium' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[600px]">
              <AiAnalyst stock={currentStock} />
            </div>
          </div>
        )}

        {/* VIEW 4: NEWS */}
        {activeTab === 'news' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <NewsSentimentFeed onSelectSymbol={(sym) => {
              if (stocks[sym]) {
                setSelectedSymbol(sym);
                setActiveTab('terminal');
              }
            }} />
          </div>
        )}

        {/* VIEW 5: PRICING */}
        {activeTab === 'pricing' && <PricingSection />}

        {/* VIEW 6: PROPOSAL */}
        {activeTab === 'proposal' && <ProposalView />}
      </main>

      {/* Trade Modal */}
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        stocks={stocks}
        initialSymbol={selectedSymbol}
        onAddPosition={(newPos) => setPositions((prev) => [newPos, ...prev])}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-zinc-800/60 bg-[#09090b] py-3 text-xs text-zinc-500">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-medium">PulseTrade</span>
            <span>• Innovation &amp; Entrepreneurship Project</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('proposal')} className="hover:text-zinc-300 transition">
              Proposal Document
            </button>
            <button onClick={() => setActiveTab('pricing')} className="hover:text-zinc-300 transition">
              BMC Model
            </button>
            <span className="font-mono text-zinc-400">v2.0 MVP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
