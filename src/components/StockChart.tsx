'use client';

import React, { useState, useMemo } from 'react';
import { StockData } from '../data/stocks';
import { BarChart3, LineChart } from 'lucide-react';

interface StockChartProps {
  stock: StockData;
  timeframe: '1D' | '1W' | '1M' | '1Y';
  setTimeframe: (tf: '1D' | '1W' | '1M' | '1Y') => void;
  isLiveTicking: boolean;
}

export const StockChart: React.FC<StockChartProps> = ({
  stock,
  timeframe,
  setTimeframe,
  isLiveTicking
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [chartMode, setChartMode] = useState<'area' | 'candle'>('area');
  const [showMA, setShowMA] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);

  const data = stock.history[timeframe];

  // Calculate min and max prices
  const { minPrice, maxPrice, priceRange, isPositive } = useMemo(() => {
    if (!data || data.length === 0) {
      return { minPrice: 0, maxPrice: 100, priceRange: 100, isPositive: true };
    }
    const prices = data.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const firstPrice = data[0].price;
    const lastPrice = data[data.length - 1].price;
    return {
      minPrice: min - range * 0.05,
      maxPrice: max + range * 0.05,
      priceRange: (max - min) * 1.1 || 1,
      isPositive: lastPrice >= firstPrice
    };
  }, [data]);

  const maxVolume = useMemo(() => {
    return Math.max(...data.map((d) => d.volume), 1);
  }, [data]);

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];
  const startPoint = data[0];
  const currentDiff = activePoint && startPoint ? activePoint.price - startPoint.price : 0;
  const currentDiffPercent = activePoint && startPoint ? (currentDiff / startPoint.price) * 100 : 0;

  const width = 800;
  const height = 320;
  const chartHeight = 250;

  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = chartHeight - ((d.price - minPrice) / priceRange) * chartHeight;
      const maY = d.ma20 ? chartHeight - ((d.ma20 - minPrice) / priceRange) * chartHeight : null;
      return { x, y, maY, ...d };
    });
  }, [data, minPrice, priceRange]);

  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, curr, idx) => {
      if (idx === 0) return `M ${curr.x} ${curr.y}`;
      return `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }, [points]);

  const maPathD = useMemo(() => {
    const valid = points.filter((p) => p.maY !== null);
    if (valid.length === 0) return '';
    return valid.reduce((acc, curr, idx) => {
      if (idx === 0) return `M ${curr.x} ${curr.maY}`;
      return `${acc} L ${curr.x} ${curr.maY}`;
    }, '');
  }, [points]);

  const areaD = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    return `${pathD} L ${last.x} ${chartHeight} L ${first.x} ${chartHeight} Z`;
  }, [pathD, points, chartHeight]);

  const primaryColor = isPositive ? '#22c55e' : '#f43f5e';
  const gradientId = `chartGrad-${stock.symbol}`;

  return (
    <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-3.5 sm:p-5 relative overflow-hidden">
      {/* Chart Top Controls - Responsive Wrap */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4 pb-3 border-b border-zinc-800/60">
        <div className="flex items-center justify-between sm:justify-start gap-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-3xl font-semibold tracking-tight text-white font-mono">
              ${activePoint?.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div
              className={`flex items-center gap-0.5 font-mono text-[11px] sm:text-xs font-medium ${
                currentDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <span>{currentDiff >= 0 ? `+${currentDiff.toFixed(2)}` : currentDiff.toFixed(2)}</span>
              <span>({currentDiffPercent >= 0 ? `+${currentDiffPercent.toFixed(2)}` : currentDiffPercent.toFixed(2)}%)</span>
            </div>
          </div>
          {isLiveTicking && (
            <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* Minimal Indicators & Timeframes - Touch Friendly */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 text-xs overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowMA(!showMA)}
              className={`px-2 py-0.5 sm:py-1 rounded font-mono text-[10px] sm:text-[11px] transition ${
                showMA ? 'bg-zinc-800 text-amber-300 font-medium' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              MA20
            </button>

            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2 py-0.5 sm:py-1 rounded font-mono text-[10px] sm:text-[11px] transition ${
                showVolume ? 'bg-zinc-800 text-zinc-200 font-medium' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              VOL
            </button>
          </div>

          <div className="h-3 w-px bg-zinc-800 mx-0.5" />

          {/* Timeframe Controls */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium rounded transition ${
                  timeframe === tf
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Mode */}
          <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setChartMode('area')}
              className={`p-1 rounded transition ${
                chartMode === 'area' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Line Chart"
            >
              <LineChart size={13} />
            </button>
            <button
              onClick={() => setChartMode('candle')}
              className={`p-1 rounded transition ${
                chartMode === 'candle' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Candlestick Chart"
            >
              <BarChart3 size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main SVG Canvas - Dynamic height on mobile */}
      <div
        className="relative w-full h-[220px] sm:h-[300px] select-none cursor-crosshair touch-pan-x"
        onMouseLeave={() => setHoverIndex(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
          const ratio = mouseX / rect.width;
          const idx = Math.round(ratio * (data.length - 1));
          setHoverIndex(Math.max(0, Math.min(idx, data.length - 1)));
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            const rect = e.currentTarget.getBoundingClientRect();
            const touchX = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
            const ratio = touchX / rect.width;
            const idx = Math.round(ratio * (data.length - 1));
            setHoverIndex(Math.max(0, Math.min(idx, data.length - 1)));
          }
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.16} />
              <stop offset="85%" stopColor={primaryColor} stopOpacity={0.0} />
            </linearGradient>
            <pattern id="grid" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>

          <rect width={width} height={chartHeight} fill="url(#grid)" />

          {/* Reference Price Lines */}
          {[0.25, 0.5, 0.75].map((pct) => {
            const price = minPrice + priceRange * pct;
            const y = chartHeight - pct * chartHeight;
            return (
              <g key={pct}>
                <line
                  x1="0"
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="#27272a"
                  strokeDasharray="2 3"
                  strokeWidth="0.7"
                />
                <text
                  x={width - 5}
                  y={y - 4}
                  textAnchor="end"
                  fill="#71717a"
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  ${price.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Volume bars in lower section */}
          {showVolume &&
            points.map((p, i) => {
              const barHeight = (p.volume / maxVolume) * 40;
              const barY = height - barHeight;
              const barWidth = Math.max(2, (width / points.length) * 0.55);
              return (
                <rect
                  key={i}
                  x={p.x - barWidth / 2}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={i > 0 && points[i].price >= points[i - 1].price ? '#22c55e' : '#f43f5e'}
                  opacity={hoverIndex === i ? 0.7 : 0.22}
                  rx={0.5}
                />
              );
            })}

          {/* Area Mode */}
          {chartMode === 'area' ? (
            <>
              <path d={areaD} fill={`url(#${gradientId})`} />
              <path
                d={pathD}
                fill="none"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            points.map((p, i) => {
              const prev = i > 0 ? points[i - 1] : p;
              const isGreen = p.price >= prev.price;
              const openY = prev.y;
              const closeY = p.y;
              const candleTop = Math.min(openY, closeY);
              const candleHeight = Math.max(2.5, Math.abs(openY - closeY));
              const wickTop = Math.max(10, candleTop - 6);
              const wickBottom = Math.min(chartHeight - 5, candleTop + candleHeight + 6);
              return (
                <g key={i}>
                  <line
                    x1={p.x}
                    y1={wickTop}
                    x2={p.x}
                    y2={wickBottom}
                    stroke={isGreen ? '#22c55e' : '#f43f5e'}
                    strokeWidth="1"
                  />
                  <rect
                    x={p.x - 3.5}
                    y={candleTop}
                    width={7}
                    height={candleHeight}
                    fill={isGreen ? '#22c55e' : '#f43f5e'}
                    rx={0.5}
                  />
                </g>
              );
            })
          )}

          {/* Moving Average */}
          {showMA && maPathD && (
            <path
              d={maPathD}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.4"
              strokeDasharray="3 3"
              opacity={0.8}
            />
          )}

          {/* Crosshair */}
          {hoverIndex !== null && points[hoverIndex] && (
            <g>
              <line
                x1={points[hoverIndex].x}
                y1="0"
                x2={points[hoverIndex].x}
                y2={height}
                stroke="#52525b"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1={points[hoverIndex].y}
                x2={width}
                y2={points[hoverIndex].y}
                stroke="#52525b"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <circle
                cx={points[hoverIndex].x}
                cy={points[hoverIndex].y}
                r="4"
                fill={primaryColor}
                stroke="#121215"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-zinc-500 font-mono px-1">
          <span>{data[0]?.time}</span>
          <span>{data[data.length - 1]?.time}</span>
        </div>
      </div>

      {/* Chart Footer Stats - Mobile 2x2 grid */}
      <div className="mt-2.5 pt-2.5 border-t border-zinc-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div>
          <span className="text-zinc-500 block text-[10px]">Open</span>
          <span className="font-mono text-zinc-200 text-[11px] sm:text-xs">${stock.open.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px]">High</span>
          <span className="font-mono text-zinc-200 text-[11px] sm:text-xs">${stock.high.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px]">Low</span>
          <span className="font-mono text-zinc-200 text-[11px] sm:text-xs">${stock.low.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px]">Vol</span>
          <span className="font-mono text-zinc-200 text-[11px] sm:text-xs">{stock.volume}</span>
        </div>
      </div>
    </div>
  );
};
