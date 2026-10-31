'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'profile' | 'security'>('profile');
  const [userName, setUserName] = useState('Investor Account');
  const [userEmail, setUserEmail] = useState('investor@pulsetrade.ai');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-[#141417] border border-zinc-800 rounded-xl w-full max-w-sm p-5 shadow-2xl animate-scaleUp">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Account Settings</h3>
            <span className="text-[11px] text-zinc-400 font-mono">BetterAuth Session Protocol</span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white p-1 rounded transition"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex bg-zinc-900 border border-zinc-800/80 p-0.5 rounded-lg text-xs mb-4">
          <button
            onClick={() => setMode('profile')}
            className={`flex-1 py-1 rounded transition text-[11px] ${
              mode === 'profile' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setMode('security')}
            className={`flex-1 py-1 rounded transition text-[11px] ${
              mode === 'security' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Security &amp; 2FA
          </button>
        </div>

        {mode === 'profile' && (
          <form onSubmit={handleSave} className="space-y-3.5 text-xs">
            <div>
              <label className="text-zinc-400 block mb-1">Display Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">Email</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-lg p-2.5 flex items-center justify-between">
              <span className="text-zinc-400">Subscription Tier</span>
              <span className="font-mono text-zinc-200 font-medium">PRO ACTIVE</span>
            </div>

            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-1.5 px-3 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white transition"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium transition flex items-center justify-center gap-1"
              >
                {savedSuccess ? (
                  <>
                    <Check size={13} />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </form>
        )}

        {mode === 'security' && (
          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-zinc-900/60 border border-zinc-800/60 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-white block font-medium">Two-Factor Authentication</span>
                <span className="text-zinc-400 text-[10px]">TOTP Authenticator</span>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-2 py-0.5 rounded font-mono text-[10px] transition ${
                  twoFactorEnabled
                    ? 'bg-zinc-800 text-emerald-400 font-medium'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {twoFactorEnabled ? 'ENABLED' : 'OFF'}
              </button>
            </div>

            <div className="p-2.5 bg-zinc-900/40 border border-zinc-800/50 rounded-lg space-y-1">
              <span className="text-zinc-400 block text-[10px] uppercase font-mono">BetterAuth Session ID</span>
              <div className="font-mono text-[10px] text-zinc-300 truncate">
                bt_sess_9f81a74e0d9b4312c8e90a612dfa8b92
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
