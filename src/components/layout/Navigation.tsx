'use client';

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { TabType } from '@/types';
import { LayoutDashboard, ArrowDownCircle, Target } from 'lucide-react';

interface TabItem {
  id: TabType;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: 'overview', label: 'Visão Geral', shortLabel: 'Início', icon: LayoutDashboard },
  { id: 'expenses', label: 'Saídas & Despesas', shortLabel: 'Saídas', icon: ArrowDownCircle },
  { id: 'goals', label: 'Metas & Sonhos', shortLabel: 'Metas', icon: Target },
];

export const DesktopNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useFinance();

  return (
    <div className="hidden md:flex items-center gap-2 p-1.5 bg-theme-surface border border-theme-border/70 rounded-theme max-w-fit mx-auto mb-6 shadow-theme-card">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-theme text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-theme-accent text-white shadow-theme-glow'
                : 'text-theme-muted hover:text-theme-text hover:bg-theme-subtle/70'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export const MobileNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useFinance();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-theme-surface/95 backdrop-blur-lg border-t border-theme-border/80 px-4 py-2 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-theme transition-all duration-200 ${
                isActive ? 'text-theme-accent font-bold scale-105' : 'text-theme-muted font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-theme transition-colors ${
                  isActive ? 'bg-theme-accentLight' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
