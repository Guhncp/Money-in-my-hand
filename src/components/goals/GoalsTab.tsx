'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  Target,
  Trophy,
  PlusCircle,
  Coins,
  CheckCircle2,
  Trash2,
  Sparkles,
  DollarSign,
  X,
} from 'lucide-react';

export const GoalsTab: React.FC = () => {
  const { goals, addGoal, contributeToGoal, deleteGoal, currentBalance } = useFinance();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newCurrent, setNewCurrent] = useState('0');
  const [newCategory, setNewCategory] = useState('Sonho');

  // Quick contribute state
  const [contributeGoalId, setContributeGoalId] = useState<string | null>(null);
  const [contributeAmount, setContributeAmount] = useState('');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(newTarget);
    const initial = parseFloat(newCurrent) || 0;

    if (!newTitle.trim() || isNaN(target) || target <= 0) return;

    addGoal({
      title: newTitle.trim(),
      targetAmount: target,
      currentAmount: Math.max(0, initial),
      category: newCategory.trim() || 'Meta',
    });

    // Reset & close
    setNewTitle('');
    setNewTarget('');
    setNewCurrent('0');
    setShowAddForm(false);
  };

  const handleQuickDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributeGoalId) return;
    const amount = parseFloat(contributeAmount);
    if (!isNaN(amount) && amount > 0) {
      contributeToGoal(contributeGoalId, amount);
      setContributeGoalId(null);
      setContributeAmount('');
    }
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Summary & Add Goal Trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-theme-text font-theme flex items-center gap-2">
            <Target className="w-6 h-6 text-theme-accent" />
            <span>Metas & Conquistas</span>
          </h2>
          <p className="text-xs sm:text-sm text-theme-muted mt-1">
            Transforme seus sonhos em realidade guardando do seu "Money in My Hand".
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-2 shrink-0 w-full sm:w-auto shadow-theme-glow"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          <span>{showAddForm ? 'Fechar Formulário' : 'Nova Meta'}</span>
        </Button>
      </div>

      {/* Form: Nova Meta (Expandable) */}
      {showAddForm && (
        <Card className="border-theme-accent/60 shadow-theme-glow animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-theme bg-theme-accentLight text-theme-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-theme-text font-theme">
                Cadastrar Novo Sonho / Meta
              </h3>
              <p className="text-xs text-theme-muted">
                Defina o valor desejado e quanto já tem reservado
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateGoal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="md:col-span-2">
                <Input
                  label="Nome da Meta"
                  placeholder="Ex: Comprar PC Gamer, Viagem Disney..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <Input
                  label="Valor Alvo (R$)"
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="5000,00"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  required
                />
              </div>

              <div>
                <Input
                  label="Já Guardado (R$)"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={newCurrent}
                  onChange={(e) => setNewCurrent(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAddForm(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="gap-1.5">
                <Target className="w-4 h-4" />
                <span>Salvar Meta</span>
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Deposit Quick Modal / Drawer */}
      {contributeGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-sm p-6 border-theme-accent shadow-theme-glow animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-theme-text flex items-center gap-2">
                <Coins className="w-4 h-4 text-theme-accent" />
                <span>Guardar Dinheiro na Meta</span>
              </h4>
              <button
                onClick={() => setContributeGoalId(null)}
                className="text-theme-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-theme-muted mb-4">
              Seu saldo disponível atual: <strong>{formatBRL(currentBalance)}</strong>
            </p>

            <form onSubmit={handleQuickDeposit} className="space-y-4">
              <Input
                label="Valor a Guardar (R$)"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Ex: 250,00"
                value={contributeAmount}
                onChange={(e) => setContributeAmount(e.target.value)}
                autoFocus
                required
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-1/2"
                  onClick={() => setContributeGoalId(null)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="w-1/2">
                  Confirmar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Goals Cards List */}
      {goals.length === 0 ? (
        <Card className="text-center py-12 text-theme-muted">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30 text-theme-accent" />
          <h4 className="text-base font-bold text-theme-text">Nenhuma meta cadastrada ainda</h4>
          <p className="text-xs mt-1 max-w-sm mx-auto">
            Comece cadastrando seu primeiro objetivo (uma viagem, um carro, ou uma reserva) clicando no botão "Nova Meta".
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {goals.map((goal) => {
            const percentage = Math.min(
              100,
              Math.max(0, Math.round((goal.currentAmount / (goal.targetAmount || 1)) * 100))
            );
            const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
            const isCompleted = goal.currentAmount >= goal.targetAmount;

            return (
              <Card
                key={goal.id}
                className={`relative flex flex-col justify-between transition-all hover:border-theme-accent/50 ${
                  isCompleted ? 'border-theme-success/60 bg-theme-surface/90' : ''
                }`}
              >
                <div>
                  {/* Goal Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-theme shrink-0 ${
                          isCompleted
                            ? 'bg-theme-success/15 text-theme-success'
                            : 'bg-theme-accentLight text-theme-accent'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Trophy className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-theme-text font-theme leading-snug">
                          {goal.title}
                        </h4>
                        <span className="text-[11px] text-theme-muted font-medium">
                          {goal.category || 'Objetivo'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-1.5 rounded-theme text-theme-muted hover:text-theme-danger hover:bg-theme-subtle transition-colors"
                      title="Excluir meta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Amounts breakdown */}
                  <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-theme bg-theme-subtle/60 border border-theme-border/40">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-theme-muted block">
                        Guardado até agora
                      </span>
                      <span className="text-base font-extrabold text-theme-accent">
                        {formatBRL(goal.currentAmount)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-theme-muted block">
                        Valor Alvo
                      </span>
                      <span className="text-base font-extrabold text-theme-text">
                        {formatBRL(goal.targetAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar Component */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-theme-muted">Progresso atingido</span>
                      <span
                        className={`font-bold ${
                          isCompleted ? 'text-theme-success' : 'text-theme-accent'
                        }`}
                      >
                        {percentage}%
                      </span>
                    </div>
                    <ProgressBar value={goal.currentAmount} max={goal.targetAmount} />
                    <div className="flex justify-between text-[11px] text-theme-muted mt-1">
                      {isCompleted ? (
                        <span className="text-theme-success font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Meta conquistada com sucesso!
                        </span>
                      ) : (
                        <span>
                          Faltam <strong>{formatBRL(remaining)}</strong> para atingir a meta
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action: Contribute button */}
                <div className="pt-3 border-t border-theme-border/40 flex items-center justify-between">
                  <span className="text-xs text-theme-muted">
                    {isCompleted ? 'Meta finalizada' : 'Deseja poupar mais?'}
                  </span>
                  <Button
                    size="sm"
                    variant={isCompleted ? 'outline' : 'primary'}
                    onClick={() => {
                      setContributeGoalId(goal.id);
                      setContributeAmount('');
                    }}
                    className="gap-1.5 text-xs"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Adicionar Bônus' : 'Guardar Valor'}</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
