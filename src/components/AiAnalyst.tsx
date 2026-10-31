'use client';

import React, { useState } from 'react';
import { StockData } from '../data/stocks';
import { RefreshCw, Send } from 'lucide-react';

interface AiAnalystProps {
  stock: StockData;
}

export const AiAnalyst: React.FC<AiAnalystProps> = ({ stock }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'insight' | 'technical' | 'chat'>('insight');
  const [userQuery, setUserQuery] = useState('');
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'ai'; text: string; time: string }[]>([
    {
      role: 'ai',
      text: `Market brief active for ${stock.symbol} (${stock.name}). Ask any question regarding valuation multiples, catalyst events, or downside risks.`,
      time: 'Now'
    }
  ]);

  const insight = stock.aiInsight;

  const handleGenerateFresh = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 700);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery.trim();
    const newChat = [...chatLog, { role: 'user' as const, text: query, time: 'Now' }];
    setChatLog(newChat);
    setUserQuery('');

    setTimeout(() => {
      let aiReply = '';
      const q = query.toLowerCase();

      if (q.includes('risk') || q.includes('danger') || q.includes('downside')) {
        aiReply = `For ${stock.symbol}, primary risk factors include: ${insight.risks.join(
          ' and '
        )}. Calculated support level sits at $${insight.technicalLevels.support.toFixed(2)}.`;
      } else if (q.includes('target') || q.includes('price') || q.includes('buy')) {
        aiReply = `Consensus algorithmic target for ${stock.symbol} is $${insight.technicalLevels.targetPrice.toFixed(
          2
        )} (+${(((insight.technicalLevels.targetPrice - stock.price) / stock.price) * 100).toFixed(
          1
        )}% upside). Resistance validation level is $${insight.technicalLevels.resistance.toFixed(2)}.`;
      } else if (q.includes('pe') || q.includes('valuation') || q.includes('expensive')) {
        aiReply = `Currently trading at ${stock.peRatio || 'N/A'}x P/E ratio. Premium valuation is supported by sector demand and operating margin expansion.`;
      } else {
        aiReply = `Order flow and momentum metrics for ${stock.symbol} indicate ${insight.sentiment} market posture (${insight.sentimentScore}% confidence score). Upside driver: ${insight.catalysts[0]}`;
      }

      setChatLog((prev) => [...prev, { role: 'ai', text: aiReply, time: 'Now' }]);
    }, 600);
  };

  return (
    <div className="bg-[#121215] border border-zinc-800/70 rounded-xl p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/60">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-xs tracking-tight">Market Intelligence</h3>
            <span className="text-[10px] text-zinc-400 font-mono">
              / {stock.symbol}
            </span>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            Automated Research Synthesis
          </span>
        </div>

        <button
          onClick={handleGenerateFresh}
          disabled={isGenerating}
          className="flex items-center gap-1 px-2 py-1 text-[11px] rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition disabled:opacity-50"
          title="Refresh analysis"
        >
          <RefreshCw size={11} className={isGenerating ? 'animate-spin' : ''} />
          <span>{isGenerating ? 'Computing' : 'Refresh'}</span>
        </button>
      </div>

      {/* Clean Sentiment Bar */}
      <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-3 mb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400 uppercase font-mono block">Sentiment Posture</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`font-mono text-xs font-semibold ${
                insight.sentiment === 'Bullish'
                  ? 'text-emerald-400'
                  : insight.sentiment === 'Bearish'
                  ? 'text-rose-400'
                  : 'text-zinc-300'
              }`}
            >
              {insight.sentiment}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] text-zinc-400 font-mono">
              {insight.sentimentScore}% Confidence
            </span>
          </div>
        </div>

        <div className="w-20">
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                insight.sentimentScore > 70 ? 'bg-emerald-400' : 'bg-zinc-400'
              }`}
              style={{ width: `${insight.sentimentScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-lg text-xs mb-3">
        <button
          onClick={() => setActiveTab('insight')}
          className={`flex-1 py-1 rounded text-[11px] transition ${
            activeTab === 'insight' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Thesis
        </button>
        <button
          onClick={() => setActiveTab('technical')}
          className={`flex-1 py-1 rounded text-[11px] transition ${
            activeTab === 'technical' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Price Targets
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-1 rounded text-[11px] transition ${
            activeTab === 'chat' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Copilot
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto space-y-3 text-xs pr-1 max-h-[360px]">
        {activeTab === 'insight' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-zinc-300 leading-relaxed text-[11px]">
              <span className="text-zinc-200 font-medium block mb-1">Executive Summary</span>
              <p>{insight.summary}</p>
            </div>

            <div>
              <span className="text-zinc-300 font-medium block mb-1 text-[11px]">Growth Catalysts</span>
              <ul className="space-y-1 text-[11px]">
                {insight.catalysts.map((cat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-zinc-400 bg-zinc-900/30 p-2 rounded border border-zinc-800/40">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-zinc-300 font-medium block mb-1 text-[11px]">Downside Risks</span>
              <ul className="space-y-1 text-[11px]">
                {insight.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-zinc-400 bg-zinc-900/30 p-2 rounded border border-zinc-800/40">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-3 animate-fadeIn">
            <div className="p-3 bg-zinc-900/50 border border-zinc-800/60 rounded-lg">
              <span className="text-zinc-400 block text-[10px] uppercase font-mono mb-0.5">12M Target Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-white">
                  ${insight.technicalLevels.targetPrice.toFixed(2)}
                </span>
                <span className="text-xs text-emerald-400 font-mono font-medium">
                  (+{(((insight.technicalLevels.targetPrice - stock.price) / stock.price) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
                <span className="text-zinc-400 block text-[10px] uppercase font-mono">Support</span>
                <span className="font-mono text-xs font-semibold text-zinc-200">
                  ${insight.technicalLevels.support.toFixed(2)}
                </span>
              </div>

              <div className="p-2.5 bg-zinc-900/40 border border-zinc-800/50 rounded-lg">
                <span className="text-zinc-400 block text-[10px] uppercase font-mono">Resistance</span>
                <span className="font-mono text-xs font-semibold text-zinc-200">
                  ${insight.technicalLevels.resistance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-full space-y-2">
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {chatLog.map((c, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-lg text-[11px] leading-relaxed ${
                    c.role === 'user'
                      ? 'bg-zinc-800/80 text-zinc-200 ml-4 border border-zinc-700/50'
                      : 'bg-zinc-900/60 text-zinc-400 mr-2 border border-zinc-800/50'
                  }`}
                >
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mb-1">
                    <span>{c.role === 'user' ? 'You' : 'Intelligence Agent'}</span>
                    <span>{c.time}</span>
                  </div>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {['Valuation analysis', 'Target price', 'Key risks'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setUserQuery(prompt)}
                  className="text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 px-2 py-0.5 rounded border border-zinc-800 transition font-mono"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-1.5 pt-1">
              <input
                type="text"
                placeholder={`Ask about ${stock.symbol}...`}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-sans"
              />
              <button
                type="submit"
                className="bg-zinc-100 hover:bg-white text-zinc-900 p-1.5 rounded-lg transition"
              >
                <Send size={13} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
