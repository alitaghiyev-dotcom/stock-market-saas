'use client';

import React from 'react';
import { MARKET_INDICES } from '../data/stocks';

interface TickerTapeProps {
  onSelectTicker?: (symbol: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectTicker }) => {
  return (
    <div className="bg-[#09090b] border-b border-zinc-800/60 overflow-x-auto no-scrollbar py-1.5 px-4">
      <div className="flex items-center gap-5 min-w-max text-xs font-mono">
        {MARKET_INDICES.map((idx, i) => (
          <div
            key={i}
            onClick={() => onSelectTicker && onSelectTicker(idx.symbol)}
            className="flex items-center gap-2 px-2 py-0.5 rounded hover:bg-zinc-900 transition cursor-pointer select-none"
          >
            <span className="text-zinc-400 font-medium text-[11px]">{idx.symbol}</span>
            <span className="text-zinc-200 font-medium text-[11px]">{idx.value}</span>
            <span
              className={`text-[11px] font-medium ${
                idx.up ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {idx.percent}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
