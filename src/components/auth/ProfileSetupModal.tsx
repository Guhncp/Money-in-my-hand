'use client';

import React, { useState } from 'react';
import { useAuthTheme, resolveTheme } from '@/context/AuthThemeContext';
import { Gender, ThemeType } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, User, X, CheckSquare } from 'lucide-react';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose?: () => void;
  isMandatory?: boolean;
}

const THEME_DETAILS: Record<
  ThemeType,
  { name: string; styleDescription: string; tags: string[]; colorPreview: string }
> = {
  'young-male': {
    name: 'Tema Jovem Gamer (Neon & Cyber)',
    styleDescription: 'Cores vibrantes neon, dark mode de alto contraste, pegada gamificada e dinâmica.',
    tags: ['Até 18 anos', 'Masculino', 'Cyberpunk'],
    colorPreview: 'from-emerald-500 via-teal-400 to-cyan-500',
  },
  'young-female': {
    name: 'Tema Jovem Pop (Vibrante & Fluido)',
    styleDescription: 'Visual pop, cores vibrantes com gradientes magenta e pastéis modernos, divertido e fluído.',
    tags: ['Até 18 anos', 'Feminino', 'Pop Chic'],
    colorPreview: 'from-pink-500 via-rose-400 to-purple-400',
  },
  'adult-male': {
    name: 'Tema Adulto Executivo (Sóbrio & Minimalista)',
    styleDescription: 'Visual minimalista, tons de azul marinho e slate, linhas limpas estilo dashboard de investimentos.',
    tags: ['19+ anos', 'Masculino', 'Slate Minimal'],
    colorPreview: 'from-blue-600 via-indigo-600 to-slate-700',
  },
  'adult-female': {
    name: 'Tema Adulto Sofisticada (Elegante & Clean)',
    styleDescription: 'Estética quiet luxury, tons quentes de rosé gold e neutros sofisticados com tipografia refinada.',
    tags: ['19+ anos', 'Feminino', 'Quiet Luxury'],
    colorPreview: 'from-rose-400 via-pink-300 to-stone-600',
  },
};

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  onClose,
  isMandatory = false,
}) => {
  const { user, completeOnboarding } = useAuthTheme();
  const [age, setAge] = useState<number>(user?.age || 20);
  const [gender, setGender] = useState<Gender>(user?.gender || 'male');
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(!isMandatory);

  if (!isOpen) return null;

  const previewTheme = resolveTheme(age, gender);
  const details = THEME_DETAILS[previewTheme];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMandatory && !ageConfirmed) return;
    completeOnboarding(Number(age), gender);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <Card className="w-full max-w-lg p-6 relative border-theme-accent/50 shadow-theme-glow max-h-[90vh] overflow-y-auto">
        {!isMandatory && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-theme-muted hover:text-theme-text hover:bg-theme-subtle"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-theme bg-theme-accentLight text-theme-accent shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-theme-text font-theme leading-tight">
              {isMandatory ? `Bem-vindo, ${user?.username}!` : 'Ajustar Perfil & Tema'}
            </h2>
            <p className="text-xs text-theme-muted mt-0.5">
              {isMandatory ? 'Configure seu perfil inicial.' : 'A interface se adapta à sua idade e gênero.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Gender selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-theme-muted mb-2 block">
              Gênero
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex items-center justify-center gap-2 p-3 rounded-theme border transition-all ${
                  gender === 'male'
                    ? 'border-theme-accent bg-theme-accentLight text-theme-accent font-bold shadow-sm'
                    : 'border-theme-border bg-theme-subtle/50 text-theme-muted hover:text-theme-text'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Homem</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex items-center justify-center gap-2 p-3 rounded-theme border transition-all ${
                  gender === 'female'
                    ? 'border-theme-accent bg-theme-accentLight text-theme-accent font-bold shadow-sm'
                    : 'border-theme-border bg-theme-subtle/50 text-theme-muted hover:text-theme-text'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Mulher</span>
              </button>
            </div>
          </div>

          {/* Age Input */}
          <div className="bg-theme-subtle/40 p-4 rounded-theme border border-theme-border/60">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-theme-muted">
                Idade
              </label>
              <span className="text-sm font-extrabold text-theme-accent px-2 py-0.5 rounded bg-theme-subtle shadow-sm border border-theme-border/40">
                {age} {age === 1 ? 'ano' : 'anos'}
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="70"
              value={age}
              onChange={(e) => {
                setAge(Number(e.target.value));
                if (isMandatory) setAgeConfirmed(false); // require re-confirmation on change
              }}
              className="w-full accent-theme-accent cursor-pointer mb-2"
            />
            
            {/* Age Confirmation Checkbox */}
            {isMandatory && (
              <label className="flex items-start gap-2 mt-4 cursor-pointer group">
                <div className="mt-0.5 relative flex items-center justify-center shrink-0 w-4 h-4">
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="peer appearance-none w-4 h-4 border border-theme-border rounded bg-theme-surface checked:bg-theme-accent checked:border-theme-accent transition-colors"
                    required
                  />
                  <CheckSquare className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <span className="text-xs text-theme-muted group-hover:text-theme-text transition-colors">
                  Confirmo que tenho exatamente <strong>{age} anos</strong> de idade.
                </span>
              </label>
            )}
          </div>

          {/* Dynamic Theme Preview Card */}
          <div className="p-4 rounded-theme bg-theme-subtle/80 border border-theme-border/80 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-theme-muted uppercase tracking-wide">
                Tema Aplicado:
              </span>
              <div className={`h-2.5 w-16 rounded-full bg-gradient-to-r ${details.colorPreview}`} />
            </div>
            <h4 className="text-sm font-bold text-theme-text">{details.name}</h4>
            <p className="text-[11px] text-theme-muted mt-1 leading-relaxed">{details.styleDescription}</p>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isMandatory && !ageConfirmed}>
            {isMandatory ? 'Salvar Perfil e Continuar' : 'Aplicar Alterações'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
