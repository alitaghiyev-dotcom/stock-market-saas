'use client';

import React from 'react';
import { MARKET_NEWS } from '../data/stocks';

interface NewsSentimentFeedProps {
  onSelectSymbol?: (symbol: string) => void;
}

export const NewsSentimentFeed: React.FC<NewsSentimentFeedProps> = ({ onSelectSymbol }) => {
  return (
    <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-5">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white text-xs tracking-tight">Market News &amp; Wire</h3>
          <span className="text-[10px] text-zinc-400 font-mono">
            / Real-Time Feed
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {MARKET_NEWS.map((news) => {
          const isBullish = news.sentiment === 'Bullish';
          return (
            <div
              key={news.id}
              className="p-3 rounded-lg bg-zinc-900/40 hover:bg-zinc-800/40 border border-zinc-800/50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  {news.relatedSymbol && (
                    <button
                      onClick={() => onSelectSymbol && onSelectSymbol(news.relatedSymbol)}
                      className="font-mono font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 px-1.5 py-0.5 rounded transition text-[10px]"
                    >
                      ${news.relatedSymbol}
                    </button>
                  )}
                  <span className="text-zinc-400">{news.source}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400 font-mono text-[10px]">{news.time}</span>
                </div>
                <h4 className="text-xs font-medium text-zinc-200 leading-snug">
                  {news.title}
                </h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{news.summary}</p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono font-medium ${
                    isBullish ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  {news.sentiment} ({news.score})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
