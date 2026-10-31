'use client';

import React from 'react';
import { StockData } from '../data/stocks';
import { Trash2 } from 'lucide-react';

export interface Position {
  id: string;
  symbol: string;
  shares: number;
  buyPrice: number;
}

interface PortfolioTrackerProps {
  stocks: Record<string, StockData>;
  positions: Position[];
  setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
  onOpenTradeModal: () => void;
  onSelectStock: (symbol: string) => void;
}

export const PortfolioTracker: React.FC<PortfolioTrackerProps> = ({
  stocks,
  positions,
  setPositions,
  onOpenTradeModal,
  onSelectStock
}) => {
  const handleDeletePosition = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const { totalValue, totalProfit, totalProfitPercent, dailyGain, allocations } = React.useMemo(() => {
    let value = 0;
    let cost = 0;
    let day = 0;
    const allocMap: Record<string, number> = {};

    positions.forEach((pos) => {
      const currentPrice = stocks[pos.symbol]?.price || pos.buyPrice;
      const dayChange = stocks[pos.symbol]?.change || 0;
      const posVal = currentPrice * pos.shares;
      value += posVal;
      cost += pos.buyPrice * pos.shares;
      day += dayChange * pos.shares;
      allocMap[pos.symbol] = (allocMap[pos.symbol] || 0) + posVal;
    });

    const profit = value - cost;
    const profitPercent = cost > 0 ? (profit / cost) * 100 : 0;

    const allocList = Object.entries(allocMap).map(([sym, val]) => ({
      symbol: sym,
      val,
      pct: value > 0 ? (val / value) * 100 : 0
    })).sort((a, b) => b.pct - a.pct);

    return {
      totalValue: value,
      totalCost: cost,
      totalProfit: profit,
      totalProfitPercent: profitPercent,
      dailyGain: day,
      allocations: allocList
    };
  }, [positions, stocks]);

  const barColors = ['bg-zinc-200', 'bg-zinc-400', 'bg-zinc-600', 'bg-zinc-700', 'bg-zinc-800'];

  return (
    <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Portfolio Overview Cards - Mobile Responsive 2-col / 4-col */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 sm:p-4">
          <span className="text-zinc-400 text-[11px] sm:text-xs block mb-1">Portfolio Valuation</span>
          <div className="text-lg sm:text-2xl font-bold text-white font-mono">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">Live market value</span>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 sm:p-4">
          <span className="text-zinc-400 text-[11px] sm:text-xs block mb-1">Unrealized P&amp;L</span>
          <div
            className={`text-lg sm:text-2xl font-bold font-mono ${
              totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalProfit >= 0 ? `+$${totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : `-$${Math.abs(totalProfit).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </div>
          <span className="text-[10px] font-mono mt-0.5 text-zinc-500 block">
            {totalProfitPercent >= 0 ? `+${totalProfitPercent.toFixed(2)}%` : `${totalProfitPercent.toFixed(2)}%`} ROI
          </span>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-3 sm:p-4">
          <span className="text-zinc-400 text-[11px] sm:text-xs block mb-1">Daily Fluctuation</span>
          <div
            className={`text-lg sm:text-2xl font-bold font-mono ${
              dailyGain >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {dailyGain >= 0 ? `+$${dailyGain.toFixed(2)}` : `-$${Math.abs(dailyGain).toFixed(2)}`}
          </div>
          <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">Today&apos;s change</span>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-3 sm:p-4 flex flex-col justify-between col-span-2 md:col-span-1">
          <div>
            <span className="text-zinc-300 text-xs font-medium block">Simulated Trades</span>
            <span className="text-[10px] text-zinc-400">Add or rebalance holdings</span>
          </div>
          <button
            onClick={onOpenTradeModal}
            className="mt-2 bg-zinc-100 hover:bg-white text-zinc-900 font-medium text-xs py-1.5 px-3 rounded-lg transition"
          >
            + Add Position
          </button>
        </div>
      </div>

      {/* Allocation Spread */}
      {allocations.length > 0 && (
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-3.5 sm:p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-300 font-medium">Asset Allocation</span>
            <span className="text-zinc-500 font-mono text-[11px]">100% Total Spread</span>
          </div>

          <div className="w-full h-2 rounded-full overflow-hidden flex bg-zinc-800">
            {allocations.map((a, i) => (
              <div
                key={a.symbol}
                className={`${barColors[i % barColors.length]} h-full transition-all duration-300`}
                style={{ width: `${a.pct}%` }}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-4 text-[11px] font-mono pt-1">
            {allocations.map((a, i) => (
              <div key={a.symbol} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${barColors[i % barColors.length]}`} />
                <span className="text-zinc-200">{a.symbol}</span>
                <span className="text-zinc-400">{a.pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Holdings Container */}
      <div className="border border-zinc-800/70 rounded-xl overflow-hidden bg-zinc-900/30">
        <div className="p-3 border-b border-zinc-800/60 flex items-center justify-between">
          <h3 className="font-medium text-white text-xs">Active Holdings</h3>
          <span className="text-xs text-zinc-500 font-mono">{positions.length} items</span>
        </div>

        {/* MOBILE CARD VIEW (Optimized for Phones!) */}
        <div className="block sm:hidden divide-y divide-zinc-800/40">
          {positions.map((pos) => {
            const stock = stocks[pos.symbol];
            const currentPrice = stock ? stock.price : pos.buyPrice;
            const marketVal = currentPrice * pos.shares;
            const totalPositionCost = pos.buyPrice * pos.shares;
            const pnl = marketVal - totalPositionCost;
            const pnlPercent = (pnl / totalPositionCost) * 100;
            const isProfit = pnl >= 0;

            return (
              <div key={pos.id} className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => onSelectStock(pos.symbol)}
                    className="cursor-pointer"
                  >
                    <span className="font-bold text-white text-sm font-mono mr-1.5">{pos.symbol}</span>
                    <span className="text-zinc-400 text-xs">{stock?.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeletePosition(pos.id)}
                    className="text-zinc-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-zinc-900/70 p-2 rounded border border-zinc-800/50">
                    <span className="text-zinc-500 block text-[10px]">Position</span>
                    <span className="text-zinc-200">{pos.shares} units @ ${pos.buyPrice.toFixed(2)}</span>
                  </div>
                  <div className="bg-zinc-900/70 p-2 rounded border border-zinc-800/50">
                    <span className="text-zinc-500 block text-[10px]">Market Value</span>
                    <span className="text-white font-semibold">${marketVal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-zinc-500 text-[11px]">Unrealized Return:</span>
                  <span className={`font-semibold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isProfit ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`} ({isProfit ? `+${pnlPercent.toFixed(1)}%` : `${pnlPercent.toFixed(1)}%`})
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/70 text-zinc-400 border-b border-zinc-800/60">
              <tr>
                <th className="py-2.5 px-4 font-normal">Asset</th>
                <th className="py-2.5 px-4 font-normal">Units</th>
                <th className="py-2.5 px-4 font-normal">Avg Price</th>
                <th className="py-2.5 px-4 font-normal">Current</th>
                <th className="py-2.5 px-4 font-normal">Value</th>
                <th className="py-2.5 px-4 font-normal">Unrealized P&amp;L</th>
                <th className="py-2.5 px-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {positions.map((pos) => {
                const stock = stocks[pos.symbol];
                const currentPrice = stock ? stock.price : pos.buyPrice;
                const marketVal = currentPrice * pos.shares;
                const totalPositionCost = pos.buyPrice * pos.shares;
                const pnl = marketVal - totalPositionCost;
                const pnlPercent = (pnl / totalPositionCost) * 100;
                const isProfit = pnl >= 0;

                return (
                  <tr key={pos.id} className="hover:bg-zinc-800/30 transition">
                    <td className="py-2.5 px-4">
                      <div
                        onClick={() => onSelectStock(pos.symbol)}
                        className="cursor-pointer hover:underline flex items-center gap-2"
                      >
                        <span className="font-semibold text-white">{pos.symbol}</span>
                        <span className="text-zinc-400 font-sans hidden sm:inline text-[11px]">
                          {stock?.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-zinc-300">{pos.shares}</td>
                    <td className="py-2.5 px-4 text-zinc-400">${pos.buyPrice.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-zinc-200">${currentPrice.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-white font-medium">${marketVal.toFixed(2)}</td>
                    <td className="py-2.5 px-4">
                      <span className={`font-medium ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isProfit ? `+$${pnl.toFixed(2)}` : `-$${Math.abs(pnl).toFixed(2)}`}
                        <span className="text-[10px] ml-1 opacity-80">({isProfit ? `+${pnlPercent.toFixed(1)}%` : `${pnlPercent.toFixed(1)}%`})</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        onClick={() => handleDeletePosition(pos.id)}
                        className="text-zinc-600 hover:text-rose-400 transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
