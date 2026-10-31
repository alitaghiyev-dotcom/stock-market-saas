'use client';

import React, { useState } from 'react';
import { StockData } from '../data/stocks';
import { X } from 'lucide-react';
import { Position } from './PortfolioTracker';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: Record<string, StockData>;
  onAddPosition: (pos: Position) => void;
  initialSymbol?: string;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  stocks,
  onAddPosition,
  initialSymbol = 'NVDA'
}) => {
  const [symbol, setSymbol] = useState(initialSymbol);
  const [shares, setShares] = useState(10);
  const [buyPrice, setBuyPrice] = useState(stocks[initialSymbol]?.price || 100);

  if (!isOpen) return null;

  const totalCost = shares * buyPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shares <= 0 || buyPrice <= 0) return;

    onAddPosition({
      id: `${symbol}-${Date.now()}`,
      symbol,
      shares,
      buyPrice
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-[#141417] border border-zinc-800 rounded-xl w-full max-w-sm p-5 shadow-2xl animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Simulate Purchase</h3>
            <span className="text-[11px] text-zinc-400 font-mono">Portfolio Position Entry</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded transition"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">Asset</label>
            <select
              value={symbol}
              onChange={(e) => {
                const newSym = e.target.value;
                setSymbol(newSym);
                if (stocks[newSym]) {
                  setBuyPrice(stocks[newSym].price);
                }
              }}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-zinc-600"
            >
              {Object.values(stocks).map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.symbol} — {s.name} (${s.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-zinc-400 block mb-1">Units / Shares</label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={shares}
                onChange={(e) => setShares(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-zinc-600"
                required
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Buy Price ($)</label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={buyPrice}
                onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-2.5 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Total Investment</span>
            <span className="font-mono font-semibold text-white">
              ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="pt-1 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-1.5 px-3 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-1.5 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium transition"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
