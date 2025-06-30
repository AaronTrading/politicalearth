// News related types (UI specific)
export type NewsItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  createdAt: Date;
};

// UI Component types
export type NavLink = {
  href: string;
  label: string;
};

export type StatCard = {
  icon: string;
  title: string;
  value: string | number;
  description?: string;
};

// API Response types
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export type GameDateResponse = {
  date: string;
};
