export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
  peRatio: number;
  week52High: number;
  week52Low: number;
  sector: string;
  history: {
    '1D': { time: string; price: number; volume: number; ma20?: number }[];
    '1W': { time: string; price: number; volume: number; ma20?: number }[];
    '1M': { time: string; price: number; volume: number; ma20?: number }[];
    '1Y': { time: string; price: number; volume: number; ma20?: number }[];
  };
  aiInsight: {
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    sentimentScore: number; // 0 to 100
    summary: string;
    catalysts: string[];
    risks: string[];
    technicalLevels: {
      support: number;
      resistance: number;
      targetPrice: number;
    };
  };
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  relatedSymbol: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  score: number;
  summary: string;
}

export const INITIAL_STOCKS: Record<string, StockData> = {
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 142.85,
    change: 4.32,
    changePercent: 3.12,
    open: 139.10,
    high: 144.20,
    low: 138.60,
    volume: '54.2M',
    marketCap: '$3.52T',
    peRatio: 64.8,
    week52High: 144.50,
    week52Low: 45.10,
    sector: 'Semiconductors & AI',
    history: {
      '1D': [
        { time: '09:30', price: 139.10, volume: 4.2, ma20: 139.0 },
        { time: '10:30', price: 140.50, volume: 8.9, ma20: 139.6 },
        { time: '11:30', price: 139.80, volume: 5.1, ma20: 140.1 },
        { time: '12:30', price: 141.20, volume: 6.4, ma20: 140.7 },
        { time: '13:30', price: 141.90, volume: 7.2, ma20: 141.2 },
        { time: '14:30', price: 143.10, volume: 9.8, ma20: 141.8 },
        { time: '15:30', price: 142.40, volume: 6.9, ma20: 142.2 },
        { time: '16:00', price: 142.85, volume: 5.7, ma20: 142.5 }
      ],
      '1W': [
        { time: 'Mon', price: 136.20, volume: 48, ma20: 135.8 },
        { time: 'Tue', price: 137.90, volume: 52, ma20: 136.5 },
        { time: 'Wed', price: 135.40, volume: 46, ma20: 137.0 },
        { time: 'Thu', price: 139.60, volume: 61, ma20: 138.1 },
        { time: 'Fri', price: 142.85, volume: 54, ma20: 139.4 }
      ],
      '1M': [
        { time: 'Oct 01', price: 121.50, volume: 42, ma20: 120.0 },
        { time: 'Oct 08', price: 128.40, volume: 49, ma20: 124.5 },
        { time: 'Oct 15', price: 134.80, volume: 58, ma20: 129.2 },
        { time: 'Oct 22', price: 138.20, volume: 55, ma20: 133.4 },
        { time: 'Oct 30', price: 142.85, volume: 54, ma20: 137.0 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 47.80, volume: 38, ma20: 45.0 },
        { time: 'Jan 24', price: 61.20, volume: 52, ma20: 55.0 },
        { time: 'Mar 24', price: 88.50, volume: 71, ma20: 72.0 },
        { time: 'Jun 24', price: 124.00, volume: 84, ma20: 98.0 },
        { time: 'Aug 24', price: 118.30, volume: 65, ma20: 112.0 },
        { time: 'Oct 24', price: 142.85, volume: 54, ma20: 126.0 }
      ]
    },
    aiInsight: {
      sentiment: 'Bullish',
      sentimentScore: 88,
      summary: 'Aggressive institutional accumulation observed following robust guidance for Blackwell B200 ultra-dense GPU architecture and hyper-scaler data center commitments.',
      catalysts: [
        'Blackwell architecture production ramping with full capacity booked through Q4.',
        'Sovereign AI infrastructure initiatives expanding in Europe and APAC.',
        'High double-digit gross margin sustainability above 74%.'
      ],
      risks: [
        'Supply chain tightness in CoWoS packaging capacity at TSMC.',
        'Heightened regulatory export scrutiny on advanced chips.'
      ],
      technicalLevels: {
        support: 138.50,
        resistance: 145.00,
        targetPrice: 165.00
      }
    }
  },
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 231.40,
    change: 1.85,
    changePercent: 0.81,
    open: 229.80,
    high: 232.10,
    low: 229.50,
    volume: '41.8M',
    marketCap: '$3.54T',
    peRatio: 35.1,
    week52High: 237.20,
    week52Low: 164.10,
    sector: 'Consumer Tech & Hardware',
    history: {
      '1D': [
        { time: '09:30', price: 229.80, volume: 3.5, ma20: 229.5 },
        { time: '10:30', price: 230.20, volume: 4.8, ma20: 229.9 },
        { time: '11:30', price: 230.70, volume: 4.1, ma20: 230.3 },
        { time: '12:30', price: 230.50, volume: 3.8, ma20: 230.6 },
        { time: '13:30', price: 231.10, volume: 4.5, ma20: 230.8 },
        { time: '14:30', price: 231.80, volume: 5.2, ma20: 231.1 },
        { time: '15:30', price: 231.20, volume: 6.0, ma20: 231.3 },
        { time: '16:00', price: 231.40, volume: 4.9, ma20: 231.4 }
      ],
      '1W': [
        { time: 'Mon', price: 228.10, volume: 38, ma20: 227.5 },
        { time: 'Tue', price: 229.40, volume: 42, ma20: 228.3 },
        { time: 'Wed', price: 230.10, volume: 39, ma20: 229.0 },
        { time: 'Thu', price: 230.80, volume: 44, ma20: 229.8 },
        { time: 'Fri', price: 231.40, volume: 41, ma20: 230.4 }
      ],
      '1M': [
        { time: 'Oct 01', price: 224.20, volume: 39, ma20: 223.0 },
        { time: 'Oct 08', price: 226.50, volume: 41, ma20: 224.8 },
        { time: 'Oct 15', price: 229.80, volume: 45, ma20: 226.9 },
        { time: 'Oct 22', price: 230.50, volume: 43, ma20: 228.7 },
        { time: 'Oct 30', price: 231.40, volume: 41, ma20: 230.1 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 189.50, volume: 35, ma20: 185.0 },
        { time: 'Jan 24', price: 185.20, volume: 40, ma20: 187.0 },
        { time: 'Mar 24', price: 172.00, volume: 55, ma20: 180.0 },
        { time: 'Jun 24', price: 208.50, volume: 62, ma20: 195.0 },
        { time: 'Aug 24', price: 224.10, volume: 48, ma20: 210.0 },
        { time: 'Oct 24', price: 231.40, volume: 41, ma20: 222.0 }
      ]
    },
    aiInsight: {
      sentiment: 'Bullish',
      sentimentScore: 76,
      summary: 'Apple Intelligence phased rollout sparks upgrade cycle anticipation across iPhone 16 family, bolstered by steady high-margin Services growth.',
      catalysts: [
        'Services revenue segment reaching all-time quarterly records.',
        'Consumer adoption of iOS on-device Apple Intelligence features.',
        'Massive recurring capital return program (share buybacks & dividends).'
      ],
      risks: [
        'Intense domestic smartphone competition in mainland China.',
        'European Union Digital Markets Act antitrust compliance headwinds.'
      ],
      technicalLevels: {
        support: 228.00,
        resistance: 235.50,
        targetPrice: 250.00
      }
    }
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 259.50,
    change: -4.20,
    changePercent: -1.59,
    open: 264.80,
    high: 266.00,
    low: 257.20,
    volume: '68.9M',
    marketCap: '$829.1B',
    peRatio: 72.4,
    week52High: 271.00,
    week52Low: 138.80,
    sector: 'Automotive & Clean Energy',
    history: {
      '1D': [
        { time: '09:30', price: 264.80, volume: 7.5, ma20: 265.0 },
        { time: '10:30', price: 263.20, volume: 9.1, ma20: 264.1 },
        { time: '11:30', price: 261.00, volume: 8.2, ma20: 262.8 },
        { time: '12:30', price: 258.90, volume: 7.9, ma20: 261.5 },
        { time: '13:30', price: 258.40, volume: 8.5, ma20: 260.6 },
        { time: '14:30', price: 260.10, volume: 10.2, ma20: 260.2 },
        { time: '15:30', price: 259.20, volume: 9.0, ma20: 259.9 },
        { time: '16:00', price: 259.50, volume: 8.5, ma20: 259.7 }
      ],
      '1W': [
        { time: 'Mon', price: 248.50, volume: 62, ma20: 245.0 },
        { time: 'Tue', price: 254.10, volume: 75, ma20: 250.0 },
        { time: 'Wed', price: 265.20, volume: 92, ma20: 256.0 },
        { time: 'Thu', price: 263.70, volume: 80, ma20: 260.0 },
        { time: 'Fri', price: 259.50, volume: 68, ma20: 261.0 }
      ],
      '1M': [
        { time: 'Oct 01', price: 245.00, volume: 60, ma20: 242.0 },
        { time: 'Oct 08', price: 238.20, volume: 71, ma20: 240.0 },
        { time: 'Oct 15', price: 220.10, volume: 85, ma20: 232.0 },
        { time: 'Oct 22', price: 255.40, volume: 110, ma20: 244.0 },
        { time: 'Oct 30', price: 259.50, volume: 68, ma20: 252.0 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 219.00, volume: 85, ma20: 225.0 },
        { time: 'Jan 24', price: 187.00, volume: 98, ma20: 205.0 },
        { time: 'Apr 24', price: 142.00, volume: 120, ma20: 165.0 },
        { time: 'Jul 24', price: 255.00, volume: 115, ma20: 210.0 },
        { time: 'Sep 24', price: 220.00, volume: 78, ma20: 225.0 },
        { time: 'Oct 24', price: 259.50, volume: 68, ma20: 245.0 }
      ]
    },
    aiInsight: {
      sentiment: 'Neutral',
      sentimentScore: 54,
      summary: 'Profit taking following recent earnings surge; market balancing lower vehicle cost-of-goods-sold with execution on Robotaxi and FSD v13.',
      catalysts: [
        'Cost reduction per vehicle down to company-record lows of ~$35,100.',
        'Energy Storage division (Megapack) exhibiting triple-digit margin growth.',
        'FSD Unsupervised commercial deployments targeted for 2025.'
      ],
      risks: [
        'Regulatory safety scrutiny over autonomous commercial taxi permissions.',
        'Macro pressure on automotive consumer financing rates.'
      ],
      technicalLevels: {
        support: 250.00,
        resistance: 270.00,
        targetPrice: 285.00
      }
    }
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 432.50,
    change: 5.60,
    changePercent: 1.31,
    open: 428.10,
    high: 434.00,
    low: 427.50,
    volume: '22.4M',
    marketCap: '$3.21T',
    peRatio: 36.2,
    week52High: 468.30,
    week52Low: 344.20,
    sector: 'Enterprise Cloud & AI',
    history: {
      '1D': [
        { time: '09:30', price: 428.10, volume: 2.1, ma20: 427.5 },
        { time: '10:30', price: 429.50, volume: 2.8, ma20: 428.4 },
        { time: '11:30', price: 430.80, volume: 2.4, ma20: 429.6 },
        { time: '12:30', price: 431.20, volume: 2.2, ma20: 430.4 },
        { time: '13:30', price: 431.80, volume: 2.7, ma20: 431.0 },
        { time: '14:30', price: 433.10, volume: 3.1, ma20: 431.8 },
        { time: '15:30', price: 432.20, volume: 3.6, ma20: 432.1 },
        { time: '16:00', price: 432.50, volume: 3.5, ma20: 432.3 }
      ],
      '1W': [
        { time: 'Mon', price: 425.20, volume: 21, ma20: 424.0 },
        { time: 'Tue', price: 427.00, volume: 23, ma20: 425.5 },
        { time: 'Wed', price: 426.50, volume: 20, ma20: 426.1 },
        { time: 'Thu', price: 429.80, volume: 25, ma20: 427.8 },
        { time: 'Fri', price: 432.50, volume: 22, ma20: 429.5 }
      ],
      '1M': [
        { time: 'Oct 01', price: 418.00, volume: 19, ma20: 416.0 },
        { time: 'Oct 08', price: 421.50, volume: 22, ma20: 419.0 },
        { time: 'Oct 15', price: 424.80, volume: 24, ma20: 422.0 },
        { time: 'Oct 22', price: 428.00, volume: 23, ma20: 425.0 },
        { time: 'Oct 30', price: 432.50, volume: 22, ma20: 428.0 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 360.00, volume: 24, ma20: 350.0 },
        { time: 'Jan 24', price: 390.00, volume: 28, ma20: 375.0 },
        { time: 'Mar 24', price: 425.00, volume: 31, ma20: 405.0 },
        { time: 'Jun 24', price: 450.00, volume: 29, ma20: 430.0 },
        { time: 'Aug 24', price: 415.00, volume: 26, ma20: 425.0 },
        { time: 'Oct 24', price: 432.50, volume: 22, ma20: 429.0 }
      ]
    },
    aiInsight: {
      sentiment: 'Bullish',
      sentimentScore: 82,
      summary: 'Azure Cloud AI bookings accelerate above +33% YoY; enterprise Copilot seats expanding steadily across Fortune 500 customers.',
      catalysts: [
        'Azure revenue acceleration driven by enterprise generative AI inference.',
        'High customer stickiness in Office 365 / Microsoft 365 Copilot add-ons.',
        'Strong free cash flow conversion enabling continued AI CapEx investment.'
      ],
      risks: [
        'Data center power constraints slowing down server cluster activation.',
        'Short-term CapEx amortization dampening operating margins.'
      ],
      technicalLevels: {
        support: 425.00,
        resistance: 442.00,
        targetPrice: 480.00
      }
    }
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 181.25,
    change: 3.40,
    changePercent: 1.91,
    open: 178.50,
    high: 182.40,
    low: 178.10,
    volume: '28.4M',
    marketCap: '$2.24T',
    peRatio: 24.5,
    week52High: 191.75,
    week52Low: 120.20,
    sector: 'Internet & Search AI',
    history: {
      '1D': [
        { time: '09:30', price: 178.50, volume: 3.1, ma20: 178.2 },
        { time: '10:30', price: 179.80, volume: 4.2, ma20: 178.9 },
        { time: '11:30', price: 180.20, volume: 3.8, ma20: 179.5 },
        { time: '12:30', price: 180.60, volume: 3.2, ma20: 180.0 },
        { time: '13:30', price: 181.10, volume: 3.9, ma20: 180.5 },
        { time: '14:30', price: 181.90, volume: 4.5, ma20: 181.0 },
        { time: '15:30', price: 181.00, volume: 3.8, ma20: 181.1 },
        { time: '16:00', price: 181.25, volume: 3.4, ma20: 181.2 }
      ],
      '1W': [
        { time: 'Mon', price: 175.40, volume: 26, ma20: 174.0 },
        { time: 'Tue', price: 177.10, volume: 29, ma20: 175.5 },
        { time: 'Wed', price: 178.50, volume: 25, ma20: 176.8 },
        { time: 'Thu', price: 179.80, volume: 31, ma20: 178.0 },
        { time: 'Fri', price: 181.25, volume: 28, ma20: 179.2 }
      ],
      '1M': [
        { time: 'Oct 01', price: 168.00, volume: 24, ma20: 165.0 },
        { time: 'Oct 08', price: 171.50, volume: 27, ma20: 168.0 },
        { time: 'Oct 15', price: 175.20, volume: 30, ma20: 172.0 },
        { time: 'Oct 22', price: 178.00, volume: 29, ma20: 175.0 },
        { time: 'Oct 30', price: 181.25, volume: 28, ma20: 178.0 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 130.00, volume: 26, ma20: 128.0 },
        { time: 'Jan 24', price: 145.00, volume: 32, ma20: 138.0 },
        { time: 'Mar 24', price: 152.00, volume: 35, ma20: 147.0 },
        { time: 'Jun 24', price: 185.00, volume: 42, ma20: 168.0 },
        { time: 'Aug 24', price: 165.00, volume: 34, ma20: 170.0 },
        { time: 'Oct 24', price: 181.25, volume: 28, ma20: 176.0 }
      ]
    },
    aiInsight: {
      sentiment: 'Bullish',
      sentimentScore: 84,
      summary: 'Google Cloud Platform operating profits surge alongside rapid enterprise adoption of Gemini multimodal models and AI Overviews.',
      catalysts: [
        'Cloud operating margin inflecting higher into double digits.',
        'Gemini integration strengthening YouTube ads monetization.',
        'Attractive valuation multiple (24.5x P/E) vs mega-cap tech peer group.'
      ],
      risks: [
        'DOJ antitrust remedies regarding default search agreements.',
        'Accelerated infrastructure CapEx for TPU v5e/v5p cluster buildouts.'
      ],
      technicalLevels: {
        support: 176.00,
        resistance: 186.00,
        targetPrice: 205.00
      }
    }
  },
  AMZN: {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 198.80,
    change: 4.10,
    changePercent: 2.11,
    open: 195.20,
    high: 199.50,
    low: 194.80,
    volume: '36.5M',
    marketCap: '$2.07T',
    peRatio: 44.2,
    week52High: 201.20,
    week52Low: 118.35,
    sector: 'E-Commerce & AWS Cloud',
    history: {
      '1D': [
        { time: '09:30', price: 195.20, volume: 3.8, ma20: 194.9 },
        { time: '10:30', price: 196.40, volume: 4.6, ma20: 195.7 },
        { time: '11:30', price: 197.10, volume: 4.1, ma20: 196.3 },
        { time: '12:30', price: 197.50, volume: 3.5, ma20: 196.9 },
        { time: '13:30', price: 198.00, volume: 4.0, ma20: 197.4 },
        { time: '14:30', price: 199.10, volume: 5.2, ma20: 198.1 },
        { time: '15:30', price: 198.40, volume: 4.7, ma20: 198.3 },
        { time: '16:00', price: 198.80, volume: 4.2, ma20: 198.5 }
      ],
      '1W': [
        { time: 'Mon', price: 191.50, volume: 32, ma20: 190.0 },
        { time: 'Tue', price: 193.80, volume: 36, ma20: 192.1 },
        { time: 'Wed', price: 194.20, volume: 31, ma20: 193.3 },
        { time: 'Thu', price: 196.90, volume: 40, ma20: 195.0 },
        { time: 'Fri', price: 198.80, volume: 36, ma20: 196.7 }
      ],
      '1M': [
        { time: 'Oct 01', price: 184.00, volume: 30, ma20: 182.0 },
        { time: 'Oct 08', price: 187.20, volume: 34, ma20: 185.0 },
        { time: 'Oct 15', price: 190.50, volume: 38, ma20: 188.0 },
        { time: 'Oct 22', price: 194.00, volume: 37, ma20: 191.0 },
        { time: 'Oct 30', price: 198.80, volume: 36, ma20: 195.0 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 142.00, volume: 35, ma20: 138.0 },
        { time: 'Jan 24', price: 155.00, volume: 41, ma20: 148.0 },
        { time: 'Mar 24', price: 178.00, volume: 46, ma20: 165.0 },
        { time: 'Jun 24', price: 190.00, volume: 48, ma20: 182.0 },
        { time: 'Aug 24', price: 172.00, volume: 55, ma20: 180.0 },
        { time: 'Oct 24', price: 198.80, volume: 36, ma20: 190.0 }
      ]
    },
    aiInsight: {
      sentiment: 'Bullish',
      sentimentScore: 86,
      summary: 'AWS annual run rate exceeds $105B with accelerating enterprise migrations; retail operational efficiencies boosting domestic operating margin to multi-year highs.',
      catalysts: [
        'Bedrock AI foundation platform adoption expanding across Fortune 100.',
        'High-margin advertising segment growing over +20% year-over-year.',
        'Regional fulfillment optimization reducing cost-to-serve.'
      ],
      risks: [
        'Consumer macro sensitivity in discretionary non-essential categories.',
        'Increased capital expenditures on cloud infrastructure.'
      ],
      technicalLevels: {
        support: 192.00,
        resistance: 202.00,
        targetPrice: 225.00
      }
    }
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin (USD)',
    price: 72480.00,
    change: 1820.00,
    changePercent: 2.58,
    open: 70660.00,
    high: 73100.00,
    low: 70450.00,
    volume: '$42.1B',
    marketCap: '$1.43T',
    peRatio: 0,
    week52High: 73750.00,
    week52Low: 34100.00,
    sector: 'Digital Assets / Store of Value',
    history: {
      '1D': [
        { time: '00:00', price: 70660, volume: 1.2, ma20: 70400 },
        { time: '04:00', price: 71100, volume: 1.8, ma20: 70800 },
        { time: '08:00', price: 71850, volume: 2.4, ma20: 71200 },
        { time: '12:00', price: 72900, volume: 3.1, ma20: 71800 },
        { time: '16:00', price: 72200, volume: 2.6, ma20: 72000 },
        { time: '20:00', price: 72750, volume: 2.9, ma20: 72250 },
        { time: '23:59', price: 72480, volume: 2.1, ma20: 72350 }
      ],
      '1W': [
        { time: 'Day 1', price: 67800, volume: 28, ma20: 67000 },
        { time: 'Day 2', price: 68500, volume: 31, ma20: 67900 },
        { time: 'Day 3', price: 69200, volume: 35, ma20: 68600 },
        { time: 'Day 4', price: 71400, volume: 44, ma20: 69800 },
        { time: 'Day 5', price: 72480, volume: 42, ma20: 70900 }
      ],
      '1M': [
        { time: 'Oct 01', price: 61200, volume: 25, ma20: 60500 },
        { time: 'Oct 08', price: 63500, volume: 28, ma20: 62000 },
        { time: 'Oct 15', price: 67100, volume: 34, ma20: 64500 },
        { time: 'Oct 22', price: 68900, volume: 38, ma20: 67000 },
        { time: 'Oct 30', price: 72480, volume: 42, ma20: 69500 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 37400, volume: 20, ma20: 35000 },
        { time: 'Jan 24', price: 44200, volume: 32, ma20: 40000 },
        { time: 'Mar 24', price: 69000, volume: 55, ma20: 52000 },
        { time: 'Jun 24', price: 64000, volume: 38, ma20: 61000 },
        { time: 'Aug 24', price: 59000, volume: 30, ma20: 62000 },
        { time: 'Oct 24', price: 72480, volume: 42, ma20: 66000 }
      ]
    },
    aiInsight: {
      sentiment: 'Bullish',
      sentimentScore: 91,
      summary: 'Institutional net inflows into spot ETFs testing previous all-time highs; exchange reserves drop to lowest levels in 5 years signaling supply squeeze.',
      catalysts: [
        'Sustained multi-billion dollar monthly spot ETF net inflows.',
        'Post-halving daily issuance constraint restricting sell-side pressure.',
        'Macro liquidity expansion and sovereign interest in reserve diversification.'
      ],
      risks: [
        'Short-term leverage buildup in perpetual futures markets.',
        'Potential sudden flash corrections at historical $73.7K resistance.'
      ],
      technicalLevels: {
        support: 69500,
        resistance: 74000,
        targetPrice: 85000
      }
    }
  },
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum (USD)',
    price: 2680.50,
    change: 68.20,
    changePercent: 2.61,
    open: 2612.30,
    high: 2710.00,
    low: 2605.00,
    volume: '$18.4B',
    marketCap: '$322.8B',
    peRatio: 0,
    week52High: 4090.00,
    week52Low: 1780.00,
    sector: 'Smart Contract Infrastructure',
    history: {
      '1D': [
        { time: '00:00', price: 2612.30, volume: 0.8, ma20: 2600 },
        { time: '04:00', price: 2635.00, volume: 1.1, ma20: 2615 },
        { time: '08:00', price: 2650.00, volume: 1.4, ma20: 2630 },
        { time: '12:00', price: 2695.00, volume: 1.9, ma20: 2655 },
        { time: '16:00', price: 2670.00, volume: 1.5, ma20: 2665 },
        { time: '20:00', price: 2688.00, volume: 1.7, ma20: 2675 },
        { time: '23:59', price: 2680.50, volume: 1.3, ma20: 2680 }
      ],
      '1W': [
        { time: 'Day 1', price: 2510, volume: 12, ma20: 2480 },
        { time: 'Day 2', price: 2540, volume: 14, ma20: 2510 },
        { time: 'Day 3', price: 2590, volume: 15, ma20: 2545 },
        { time: 'Day 4', price: 2640, volume: 18, ma20: 2600 },
        { time: 'Day 5', price: 2680.50, volume: 16, ma20: 2640 }
      ],
      '1M': [
        { time: 'Oct 01', price: 2420, volume: 11, ma20: 2380 },
        { time: 'Oct 08', price: 2460, volume: 13, ma20: 2430 },
        { time: 'Oct 15', price: 2550, volume: 16, ma20: 2500 },
        { time: 'Oct 22', price: 2610, volume: 17, ma20: 2560 },
        { time: 'Oct 30', price: 2680.50, volume: 16, ma20: 2620 }
      ],
      '1Y': [
        { time: 'Nov 23', price: 1850, volume: 12, ma20: 1750 },
        { time: 'Jan 24', price: 2280, volume: 18, ma20: 2050 },
        { time: 'Mar 24', price: 3850, volume: 32, ma20: 2950 },
        { time: 'Jun 24', price: 3450, volume: 22, ma20: 3400 },
        { time: 'Aug 24', price: 2650, volume: 19, ma20: 2900 },
        { time: 'Oct 24', price: 2680.50, volume: 16, ma20: 2750 }
      ]
    },
    aiInsight: {
      sentiment: 'Neutral',
      sentimentScore: 68,
      summary: 'Layer 2 ecosystem TVL reaches new peaks with Base and Arbitrum absorbing transaction fees; staking yields steady at 3.3%.',
      catalysts: [
        'Dencun proto-danksharding upgrade slashing rollup transaction costs by 90%.',
        'Institutional staking infrastructure integrations.',
        'Supply burn mechanics maintaining deflationary bias under network load.'
      ],
      risks: [
        'Mainnet fee revenue capture migrating to Layer 2 execution environments.',
        'Sluggish spot ETF institutional inflow velocity relative to Bitcoin.'
      ],
      technicalLevels: {
        support: 2550,
        resistance: 2820,
        targetPrice: 3200
      }
    }
  }
};

export const MARKET_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'NVIDIA Expands Blackwell Enterprise GPU Cluster Allocations for Tier-1 Hyper-scalers',
    source: 'Bloomberg Technology',
    time: '12m ago',
    relatedSymbol: 'NVDA',
    sentiment: 'Bullish',
    score: 94,
    summary: 'Executive supply chain verification confirms TSMC advanced packaging bottlenecks are easing faster than anticipated for Q4.'
  },
  {
    id: 'news-2',
    title: 'Federal Reserve Policy Signals Cautious Path Ahead of Upcoming US Inflation Data',
    source: 'Financial Times',
    time: '34m ago',
    relatedSymbol: 'SPY',
    sentiment: 'Neutral',
    score: 52,
    summary: 'Treasury yields consolidate as bond traders balance strong job market resilience against rate trajectory expectations.'
  },
  {
    id: 'news-3',
    title: 'Apple Intelligence Global Localization Scheduled for Key European & Asian Languages in Spring',
    source: 'Reuters Finance',
    time: '1h ago',
    relatedSymbol: 'AAPL',
    sentiment: 'Bullish',
    score: 81,
    summary: 'Phased software rollout schedule expected to trigger sustained upgrade cycles across enterprise and retail iPhone users.'
  },
  {
    id: 'news-4',
    title: 'Tesla Energy Storage Deployments Double YoY as Megapack Factory Ramp Accelerates',
    source: 'Wall Street Journal',
    time: '2h ago',
    relatedSymbol: 'TSLA',
    sentiment: 'Bullish',
    score: 86,
    summary: 'Utility-scale energy storage gross margins outpace automotive sector margins for the second consecutive quarter.'
  },
  {
    id: 'news-5',
    title: 'Bitcoin Exchange Outflows Accelerate as Long-Term HODLers Accumulate at Key Resistance',
    source: 'CoinDesk Intelligence',
    time: '3h ago',
    relatedSymbol: 'BTC',
    sentiment: 'Bullish',
    score: 89,
    summary: 'Liquid supply on centralized exchanges reaches lowest point since 2019 following persistent institutional spot allocations.'
  }
];

export const MARKET_INDICES = [
  { symbol: 'S&P 500', value: '5,845.20', change: '+32.40', percent: '+0.56%', up: true },
  { symbol: 'NASDAQ', value: '18,650.80', change: '+142.10', percent: '+0.77%', up: true },
  { symbol: 'DOW JONES', value: '42,210.15', change: '-85.40', percent: '-0.20%', up: false },
  { symbol: 'RUSSELL 2000', value: '2,240.60', change: '+18.90', percent: '+0.85%', up: true },
  { symbol: '10Y YIELD', value: '4.24%', change: '+0.03', percent: '+0.71%', up: true },
  { symbol: 'VIX VOLATILITY', value: '14.85', change: '-0.65', percent: '-4.19%', up: false }
];
