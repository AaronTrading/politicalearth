// News related types
export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  createdAt: Date;
}

// Ranking related types
export interface EconomicRanking {
  id: number;
  rank: number;
  country: string;
  flag: string;
  gdp: string;
  growth: string;
  trade: string;
}

export interface MilitaryRanking {
  id: number;
  rank: number;
  country: string;
  flag: string;
  power: number;
  budget: string;
  forces: string;
}

// Game state types
export interface GameDate {
  id: number;
  date: string;
  isActive: boolean;
}

// UI Component types
export interface NavLink {
  href: string;
  label: string;
}

export interface StatCard {
  icon: string;
  title: string;
  value: string | number;
  description?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface GameDateResponse {
  date: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string | null;
}
