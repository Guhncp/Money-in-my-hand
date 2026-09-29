'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Goal, TabType } from '@/types';

interface FinanceContextType {
  monthlyIncome: number;
  transactions: Transaction[];
  goals: Goal[];
  activeTab: TabType;
  totalExpenses: number;
  currentBalance: number;
  setActiveTab: (tab: TabType) => void;
  setMonthlyIncome: (val: number) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  contributeToGoal: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Supermercado Mensal', amount: 485.50, category: 'alimentacao', date: '2026-09-24' },
  { id: '2', title: 'Uber / Transporte', amount: 78.90, category: 'transporte', date: '2026-09-25' },
  { id: '3', title: 'Cinema & Lazer', amount: 94.00, category: 'lazer', date: '2026-09-26' },
  { id: '4', title: 'Curso de Especialização', amount: 150.00, category: 'educacao', date: '2026-09-27' },
  { id: '5', title: 'Internet Fibra', amount: 119.90, category: 'moradia', date: '2026-09-28' },
];

const INITIAL_GOALS: Goal[] = [
  { id: 'g1', title: 'Comprar PC Gamer / Setup', targetAmount: 6500, currentAmount: 4200, category: 'Tecnologia' },
  { id: 'g2', title: 'Viagem de Férias', targetAmount: 3000, currentAmount: 1850, category: 'Viagem' },
  { id: 'g3', title: 'Reserva de Emergência', targetAmount: 10000, currentAmount: 7600, category: 'Segurança' },
];

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monthlyIncome, setIncomeState] = useState<number>(4500);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Load from localStorage if present
  useEffect(() => {
    const savedIncome = localStorage.getItem('mimh_income');
    const savedTx = localStorage.getItem('mimh_transactions');
    const savedGoals = localStorage.getItem('mimh_goals');

    if (savedIncome) setIncomeState(Number(savedIncome));
    if (savedTx) {
      try { setTransactions(JSON.parse(savedTx)); } catch (e) { console.error(e); }
    }
    if (savedGoals) {
      try { setGoals(JSON.parse(savedGoals)); } catch (e) { console.error(e); }
    }
  }, []);

  const setMonthlyIncome = (val: number) => {
    setIncomeState(val);
    localStorage.setItem('mimh_income', val.toString());
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now().toString(),
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem('mimh_transactions', JSON.stringify(updated));
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem('mimh_transactions', JSON.stringify(updated));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: 'g_' + Date.now().toString(),
    };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    localStorage.setItem('mimh_goals', JSON.stringify(updated));
  };

  const contributeToGoal = (id: string, amount: number) => {
    const updated = goals.map((g) => {
      if (g.id === id) {
        return {
          ...g,
          currentAmount: Math.min(g.targetAmount, g.currentAmount + amount),
        };
      }
      return g;
    });
    setGoals(updated);
    localStorage.setItem('mimh_goals', JSON.stringify(updated));
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    localStorage.setItem('mimh_goals', JSON.stringify(updated));
  };

  const totalExpenses = transactions.reduce((acc, t) => acc + t.amount, 0);
  const currentBalance = monthlyIncome - totalExpenses;

  return (
    <FinanceContext.Provider
      value={{
        monthlyIncome,
        transactions,
        goals,
        activeTab,
        totalExpenses,
        currentBalance,
        setActiveTab,
        setMonthlyIncome,
        addTransaction,
        deleteTransaction,
        addGoal,
        contributeToGoal,
        deleteGoal,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
