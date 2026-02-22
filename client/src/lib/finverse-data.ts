export interface KPIData {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change: number;
  icon: string;
}

export interface PortfolioAsset {
  name: string;
  ticker: string;
  allocation: number;
  value: number;
  change: number;
  color: string;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  xp: number;
  progress: number;
  total: number;
  category: string;
  difficulty: "easy" | "medium" | "hard" | "legendary";
  icon: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  badge: string;
}

export interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

export const kpiData: KPIData[] = [
  { label: "Portfolio Value", value: 284750, prefix: "$", change: 12.4, icon: "Wallet" },
  { label: "Total Returns", value: 47230, prefix: "$", change: 8.7, icon: "TrendingUp" },
  { label: "Win Rate", value: 78, suffix: "%", change: 3.2, icon: "Target" },
  { label: "XP Earned", value: 12450, change: 24.1, icon: "Zap" },
];

export const portfolioAssets: PortfolioAsset[] = [
  { name: "Bitcoin", ticker: "BTC", allocation: 28, value: 79730, change: 4.2, color: "#F7931A" },
  { name: "Ethereum", ticker: "ETH", allocation: 22, value: 62645, change: -1.3, color: "#627EEA" },
  { name: "S&P 500 ETF", ticker: "SPY", allocation: 20, value: 56950, change: 0.8, color: "#00D4AA" },
  { name: "Apple Inc", ticker: "AAPL", allocation: 15, value: 42712, change: 2.1, color: "#A2AAAD" },
  { name: "Solana", ticker: "SOL", allocation: 10, value: 28475, change: 7.5, color: "#9945FF" },
  { name: "Gold ETF", ticker: "GLD", allocation: 5, value: 14237, change: 0.3, color: "#FFD700" },
];

export const quests: Quest[] = [
  { id: 1, title: "Diamond Hands", description: "Hold a position for 30 consecutive days without selling", xp: 500, progress: 24, total: 30, category: "Discipline", difficulty: "medium", icon: "Diamond" },
  { id: 2, title: "Diversification Master", description: "Maintain at least 6 different asset classes in your portfolio", xp: 750, progress: 6, total: 6, category: "Strategy", difficulty: "hard", icon: "Layers" },
  { id: 3, title: "Bull Run Rider", description: "Achieve a 10% portfolio gain in a single month", xp: 1000, progress: 8.7, total: 10, category: "Performance", difficulty: "legendary", icon: "Rocket" },
  { id: 4, title: "Knowledge Seeker", description: "Complete 5 financial literacy modules", xp: 300, progress: 3, total: 5, category: "Education", difficulty: "easy", icon: "BookOpen" },
  { id: 5, title: "Risk Manager", description: "Set up stop-loss orders on all active positions", xp: 400, progress: 4, total: 5, category: "Risk", difficulty: "medium", icon: "Shield" },
  { id: 6, title: "Streak Legend", description: "Log in and review your portfolio for 60 consecutive days", xp: 2000, progress: 42, total: 60, category: "Consistency", difficulty: "legendary", icon: "Flame" },
];

export const leaderboard: LeaderboardUser[] = [
  { rank: 1, name: "CryptoWhale", avatar: "CW", xp: 48200, level: 42, streak: 156, badge: "Legendary Trader" },
  { rank: 2, name: "BullishBear", avatar: "BB", xp: 41800, level: 38, streak: 89, badge: "Diamond Hands" },
  { rank: 3, name: "QuantMaster", avatar: "QM", xp: 39500, level: 36, streak: 201, badge: "Algorithm King" },
  { rank: 4, name: "DeFi_Sage", avatar: "DS", xp: 35100, level: 33, streak: 67, badge: "Yield Farmer" },
  { rank: 5, name: "Ankit_Sharma", avatar: "AS", xp: 12450, level: 15, streak: 42, badge: "Rising Star" },
  { rank: 6, name: "MoonShot", avatar: "MS", xp: 11200, level: 14, streak: 33, badge: "Momentum Player" },
  { rank: 7, name: "StockNinja", avatar: "SN", xp: 9800, level: 12, streak: 28, badge: "Silent Profits" },
  { rank: 8, name: "AlphaHunter", avatar: "AH", xp: 8500, level: 11, streak: 19, badge: "Value Seeker" },
];

export const tickerData: TickerItem[] = [
  { symbol: "BTC", price: 97234.50, change: 4.2 },
  { symbol: "ETH", price: 3847.20, change: -1.3 },
  { symbol: "SOL", price: 248.75, change: 7.5 },
  { symbol: "SPY", price: 605.30, change: 0.8 },
  { symbol: "AAPL", price: 242.50, change: 2.1 },
  { symbol: "NVDA", price: 875.40, change: 3.8 },
  { symbol: "TSLA", price: 412.80, change: -2.1 },
  { symbol: "GLD", price: 198.60, change: 0.3 },
  { symbol: "AMZN", price: 225.10, change: 1.5 },
  { symbol: "MSFT", price: 468.90, change: 0.9 },
];

export const achievements = [
  { name: "First Trade", icon: "Sparkles", unlocked: true },
  { name: "Portfolio Pro", icon: "Award", unlocked: true },
  { name: "Risk Tamer", icon: "Shield", unlocked: true },
  { name: "10x Returns", icon: "Rocket", unlocked: false },
  { name: "Market Oracle", icon: "Eye", unlocked: false },
  { name: "Whale Status", icon: "Crown", unlocked: false },
];
