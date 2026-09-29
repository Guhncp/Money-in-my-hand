'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Wallet,
  TrendingDown,
  Coins,
  ArrowUpRight,
  PlusCircle,
  Target,
  Edit2,
  Check,
  Percent,
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { monthlyIncome, totalExpenses, currentBalance, setMonthlyIncome, setActiveTab } =
    useFinance();

  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [newSalaryInput, setNewSalaryInput] = useState(monthlyIncome.toString());

  const handleSaveSalary = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newSalaryInput);
    if (!isNaN(val) && val >= 0) {
      setMonthlyIncome(val);
      setIsEditingSalary(false);
    }
  };

  const spentPercentage =
    monthlyIncome > 0 ? Math.min(100, Math.round((totalExpenses / monthlyIncome) * 100)) : 0;

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Salário / Renda Principal */}
      <Card className="bg-gradient-to-r from-theme-surface via-theme-surface to-theme-subtle border-theme-border/70 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-theme bg-theme-accentLight text-theme-accent shadow-theme-glow">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-theme-muted">
                  Salário / Renda Principal Mensal
                </span>
                {!isEditingSalary && (
                  <button
                    onClick={() => {
                      setNewSalaryInput(monthlyIncome.toString());
                      setIsEditingSalary(true);
                    }}
                    className="text-theme-muted hover:text-theme-accent transition-colors"
                    title="Editar Salário"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {isEditingSalary ? (
                <form onSubmit={handleSaveSalary} className="flex items-center gap-2 mt-1">
                  <Input
                    type="number"
                    step="0.01"
                    value={newSalaryInput}
                    onChange={(e) => setNewSalaryInput(e.target.value)}
                    className="w-40 py-1 px-2.5 text-base"
                    autoFocus
                  />
                  <Button type="submit" size="sm" className="px-3 py-1.5">
                    <Check className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-text font-theme">
                  {formatBRL(monthlyIncome)}
                </h3>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-medium text-theme-muted bg-theme-subtle px-3 py-1.5 rounded-theme border border-theme-border/60">
              Mês Vigente
            </span>
          </div>
        </div>
      </Card>

      {/* Main Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card: Total Despesas */}
        <Card className="flex flex-col justify-between relative group hover:border-theme-border transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-theme-muted">
                Total de Saídas no Mês
              </p>
              <h3 className="text-3xl font-extrabold text-theme-danger mt-1">
                {formatBRL(totalExpenses)}
              </h3>
            </div>
            <div className="p-3 rounded-theme bg-red-500/10 text-theme-danger border border-red-500/20">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-theme-border/40 flex items-center justify-between">
            <span className="text-xs text-theme-muted flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-theme-danger" />
              Consumiu <strong>{spentPercentage}%</strong> da sua renda
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('expenses')}
              className="gap-1 text-xs"
            >
              <span>Ver Saídas</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>

        {/* Card: Saldo Atual (Money in My Hand) */}
        <Card glow className="flex flex-col justify-between relative border-theme-accent/60">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-theme-accent">
                  Money in My Hand (Saldo Atual)
                </p>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-theme-accentLight text-theme-accent">
                  Disponível
                </span>
              </div>
              <h2
                className={`text-3xl sm:text-4xl font-extrabold mt-1 font-theme ${
                  currentBalance >= 0 ? 'text-theme-success' : 'text-theme-danger'
                }`}
              >
                {formatBRL(currentBalance)}
              </h2>
            </div>
            <div className="p-3 rounded-theme bg-theme-accentLight text-theme-accent shadow-theme-glow">
              <Wallet className="w-7 h-7" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-theme-border/40 flex items-center justify-between">
            <p className="text-xs text-theme-muted">
              {currentBalance >= 0
                ? 'Você está no positivo! Bom momento para guardar para suas metas.'
                : 'Atenção! Suas saídas ultrapassaram a renda do mês.'}
            </p>
            <Button
              size="sm"
              onClick={() => setActiveTab('goals')}
              className="gap-1 text-xs whitespace-nowrap ml-2"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Ver Metas</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('expenses')}
          className="flex items-center justify-between p-4 rounded-theme bg-theme-surface border border-theme-border hover:border-theme-accent hover:shadow-theme-glow transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-theme bg-theme-accentLight text-theme-accent group-hover:scale-110 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-theme-text">Adicionar Nova Despesa</h4>
              <p className="text-xs text-theme-muted">Registre gastos de hoje rapidamente</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-theme-muted group-hover:text-theme-accent transition-colors" />
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className="flex items-center justify-between p-4 rounded-theme bg-theme-surface border border-theme-border hover:border-theme-accent hover:shadow-theme-glow transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-theme bg-theme-accentLight text-theme-accent group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-theme-text">Acompanhar Metas e Sonhos</h4>
              <p className="text-xs text-theme-muted">Veja o progresso de cada objetivo</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-theme-muted group-hover:text-theme-accent transition-colors" />
        </button>
      </div>
    </div>
  );
};
