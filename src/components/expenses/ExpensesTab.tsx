'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { TransactionCategory } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  PlusCircle,
  Trash2,
  Utensils,
  Car,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Home,
  Receipt,
  Calendar,
} from 'lucide-react';

const CATEGORY_MAP: Record<
  TransactionCategory,
  { label: string; icon: React.ElementType; color: string }
> = {
  alimentacao: { label: 'Alimentação', icon: Utensils, color: 'text-amber-400 bg-amber-500/10' },
  transporte: { label: 'Transporte', icon: Car, color: 'text-blue-400 bg-blue-500/10' },
  lazer: { label: 'Lazer & Jogos', icon: Gamepad2, color: 'text-purple-400 bg-purple-500/10' },
  educacao: { label: 'Educação', icon: GraduationCap, color: 'text-emerald-400 bg-emerald-500/10' },
  saude: { label: 'Saúde', icon: HeartPulse, color: 'text-rose-400 bg-rose-500/10' },
  compras: { label: 'Compras', icon: ShoppingBag, color: 'text-pink-400 bg-pink-500/10' },
  moradia: { label: 'Moradia / Contas', icon: Home, color: 'text-indigo-400 bg-indigo-500/10' },
  outros: { label: 'Outros', icon: Receipt, color: 'text-zinc-400 bg-zinc-500/10' },
};

export const ExpensesTab: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction, totalExpenses } = useFinance();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('alimentacao');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    addTransaction({
      title: title.trim(),
      amount: numAmount,
      category,
      date: date || new Date().toISOString().split('T')[0],
    });

    // Reset form
    setTitle('');
    setAmount('');
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      {/* Quick Add Expense Form */}
      <Card className="border-theme-border/80 shadow-theme-card">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-theme bg-theme-accentLight text-theme-accent">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-theme-text font-theme">
              Registrar Nova Despesa
            </h3>
            <p className="text-xs text-theme-muted">
              Adicione saídas do dia a dia com categoria e data
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <Input
                label="Descrição do Gasto"
                placeholder="Ex: Almoço, Cinema, Gasolina..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                label="Valor (R$)"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                label="Data"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Category Chips Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-theme-muted block mb-2">
              Categoria
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(CATEGORY_MAP) as TransactionCategory[]).map((catKey) => {
                const cat = CATEGORY_MAP[catKey];
                const Icon = cat.icon;
                const isSelected = category === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setCategory(catKey)}
                    className={`flex items-center gap-2 p-2 rounded-theme text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-theme-accent bg-theme-accentLight text-theme-accent font-bold'
                        : 'border-theme-border/60 bg-theme-subtle/50 text-theme-muted hover:text-theme-text'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="md" className="gap-2 w-full sm:w-auto">
              <PlusCircle className="w-4 h-4" />
              <span>Adicionar Despesa</span>
            </Button>
          </div>
        </form>
      </Card>

      {/* Transactions List */}
      <Card>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-theme-border/50">
          <div>
            <h3 className="text-base font-bold text-theme-text font-theme">
              Histórico de Saídas
            </h3>
            <p className="text-xs text-theme-muted">
              {transactions.length} {transactions.length === 1 ? 'registro' : 'registros'} neste mês
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-theme-muted block">
              Total Saídas
            </span>
            <span className="text-base sm:text-lg font-extrabold text-theme-danger">
              {formatBRL(totalExpenses)}
            </span>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-12 text-theme-muted">
            <Receipt className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">Nenhuma despesa lançada até o momento.</p>
            <p className="text-xs mt-1">Use o formulário acima para registrar um gasto!</p>
          </div>
        ) : (
          <div className="divide-y divide-theme-border/40">
            {transactions.map((tx) => {
              const cat = CATEGORY_MAP[tx.category] || CATEGORY_MAP['outros'];
              const Icon = cat.icon;
              return (
                <div
                  key={tx.id}
                  className="py-3 sm:py-3.5 flex items-center justify-between gap-3 group hover:bg-theme-subtle/40 px-2 rounded-theme transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-theme ${cat.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-theme-text truncate">
                        {tx.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-theme-muted">
                        <span>{cat.label}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 inline" />
                          {new Date(tx.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm sm:text-base font-bold text-theme-danger">
                      - {formatBRL(tx.amount)}
                    </span>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-1.5 rounded-theme text-theme-muted hover:text-theme-danger hover:bg-theme-subtle transition-colors opacity-70 group-hover:opacity-100"
                      title="Excluir saída"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
