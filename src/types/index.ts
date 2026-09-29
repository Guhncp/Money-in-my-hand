export type ThemeType = 'young-male' | 'young-female' | 'adult-male' | 'adult-female';

export type Gender = 'male' | 'female';

export interface UserProfile {
  id: string;
  username: string; // Nome ou Apelido
  email: string;
  age: number;
  gender: Gender;
  theme: ThemeType;
  isConfigured: boolean;
  isEmailVerified: boolean;
}

export type TransactionCategory =
  | 'alimentacao'
  | 'transporte'
  | 'lazer'
  | 'educacao'
  | 'saude'
  | 'compras'
  | 'moradia'
  | 'outros';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: TransactionCategory;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category?: string;
  deadline?: string;
}

export type TabType = 'overview' | 'expenses' | 'goals';
