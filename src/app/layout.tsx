import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PulseTrade AI — Real-Time Stock Market Tracking & Analytics Platform',
  description:
    'Institutional-grade real-time market data, dynamic interactive technical charts, and AI-powered sentiment analysis for everyday investors.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.className} min-h-full bg-[#070b16] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
