'use client';

import React, { useState } from 'react';
import { StockData } from '../data/stocks';
import { Star } from 'lucide-react';

interface WatchlistProps {
  stocks: Record<string, StockData>;
  selectedSymbol: string;
  onSelectStock: (symbol: string) => void;
  starredSymbols: string[];
  toggleStar: (symbol: string) => void;
  searchFilter: string;
}

export const Watchlist: React.FC<WatchlistProps> = ({
  stocks,
  selectedSymbol,
  onSelectStock,
  starredSymbols,
  toggleStar,
  searchFilter
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'starred' | 'gainers'>('all');

  const stockList = Object.values(stocks);

  const filtered = stockList.filter((s) => {
    const matchesSearch =
      s.symbol.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.name.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'starred') {
      return starredSymbols.includes(s.symbol);
    }
    if (filterTab === 'gainers') {
      return s.changePercent > 0;
    }
    return true;
  });

  return (
    <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-4 flex flex-col h-full">
      {/* Header & Minimalist Segment */}
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Assets
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">
            ({filtered.length})
          </span>
        </div>

        <div className="flex items-center bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-lg text-[11px]">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-2 py-0.5 rounded transition ${
              filterTab === 'all' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterTab('starred')}
            className={`px-2 py-0.5 rounded transition ${
              filterTab === 'starred' ? 'bg-zinc-800 text-amber-300 font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Watchlist
          </button>
          <button
            onClick={() => setFilterTab('gainers')}
            className={`px-2 py-0.5 rounded transition ${
              filterTab === 'gainers' ? 'bg-zinc-800 text-emerald-400 font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Gainers
          </button>
        </div>
      </div>

      {/* Stock List Items */}
      <div className="space-y-1 overflow-y-auto max-h-[580px] pr-1">
        {filtered.map((stock) => {
          const isSelected = stock.symbol === selectedSymbol;
          const isStarred = starredSymbols.includes(stock.symbol);
          const isUp = stock.changePercent >= 0;

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock.symbol)}
              className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition border ${
                isSelected
                  ? 'bg-zinc-800/90 border-zinc-700/80 shadow-sm'
                  : 'bg-transparent hover:bg-zinc-800/40 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(stock.symbol);
                  }}
                  className="text-zinc-600 hover:text-amber-400 transition"
                >
                  <Star
                    size={13}
                    className={isStarred ? 'fill-amber-400 text-amber-400' : 'group-hover:text-zinc-400'}
                  />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-zinc-100 text-xs font-mono">{stock.symbol}</span>
                    <span className="text-[11px] text-zinc-400 truncate max-w-[85px] sm:max-w-[110px]">
                      {stock.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block truncate">{stock.sector}</span>
                </div>
              </div>

              {/* Price & Change */}
              <div className="text-right flex-shrink-0">
                <div className="font-mono font-medium text-xs text-zinc-100">
                  ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-[10px] font-mono font-medium ${
                    isUp ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isUp ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 text-zinc-500 text-xs">
            No assets match current criteria.
          </div>
        )}
      </div>
    </div>
  );
};
