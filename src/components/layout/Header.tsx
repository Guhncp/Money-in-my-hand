'use client';

import React, { useState } from 'react';
import { useAuthTheme } from '@/context/AuthThemeContext';
import { ThemeType } from '@/types';
import { Wallet, Sparkles, User, LogOut, SlidersHorizontal } from 'lucide-react';

const THEME_NAMES: Record<ThemeType, { label: string; badge: string; icon: string }> = {
  'young-male': { label: 'Jovem Gamer', badge: 'Neon Cyber', icon: '🎮' },
  'young-female': { label: 'Jovem Pop', badge: 'Pop Chic', icon: '✨' },
  'adult-male': { label: 'Adulto Executivo', badge: 'Slate Minimal', icon: '💼' },
  'adult-female': { label: 'Adulto Sofisticada', badge: 'Quiet Luxury', icon: '💎' },
};

export const Header: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => {
  const { user, theme, setTheme, logout } = useAuthTheme();
  const [showThemePicker, setShowThemePicker] = useState(false);

  const themeInfo = THEME_NAMES[theme] || THEME_NAMES['adult-male'];

  return (
    <header className="sticky top-0 z-40 w-full bg-theme-surface/90 backdrop-blur-md border-b border-theme-border/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Modern Typographic Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-theme bg-theme-accent/15 border border-theme-accent/40 flex items-center justify-center text-theme-accent shadow-theme-glow">
            <Wallet className="w-5 h-5 text-theme-accent" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-theme-text font-theme">
                Money in My <span className="text-theme-accent">Hand</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-theme-accent hidden sm:inline" />
            </div>
            <p className="text-[10px] text-theme-muted font-medium tracking-wide uppercase">
              Controle Financeiro Pessoal
            </p>
          </div>
        </div>

        {/* Right side controls: Profile & Theme quick badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Theme Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              title="Trocar Tema Dinâmico"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-theme bg-theme-subtle border border-theme-border text-xs text-theme-text hover:border-theme-accent transition-colors"
            >
              <span>{themeInfo.icon}</span>
              <span className="hidden md:inline font-medium">{themeInfo.label}</span>
              <span className="text-[10px] text-theme-accent font-semibold px-1.5 py-0.5 rounded-full bg-theme-accentLight">
                {themeInfo.badge}
              </span>
            </button>

            {/* Dropdown to test the 4 themes quickly */}
            {showThemePicker && (
              <div className="absolute right-0 mt-2 w-56 bg-theme-surface border border-theme-border rounded-theme shadow-theme-card p-2 z-50">
                <div className="text-[10px] font-bold text-theme-muted uppercase px-2 py-1">
                  Alternar Tema Dinâmico:
                </div>
                {(Object.keys(THEME_NAMES) as ThemeType[]).map((tKey) => (
                  <button
                    key={tKey}
                    onClick={() => {
                      setTheme(tKey);
                      setShowThemePicker(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-theme-sm text-xs flex items-center justify-between transition-colors ${
                      theme === tKey
                        ? 'bg-theme-accent text-white font-semibold'
                        : 'text-theme-text hover:bg-theme-subtle'
                    }`}
                  >
                    <span>
                      {THEME_NAMES[tKey].icon} {THEME_NAMES[tKey].label}
                    </span>
                    <span className="text-[10px] opacity-75">{THEME_NAMES[tKey].badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Config Button */}
          <button
            onClick={onOpenProfile}
            title="Configurar Perfil"
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-theme bg-theme-subtle text-theme-text hover:border-theme-accent border border-theme-border text-xs transition-colors"
          >
            <User className="w-4 h-4 text-theme-accent" />
            <span className="hidden sm:inline font-medium">{user?.username || 'Perfil'}</span>
            <SlidersHorizontal className="w-3 h-3 text-theme-muted hidden sm:inline" />
          </button>

          {/* Logout button */}
          <button
            onClick={logout}
            title="Sair"
            className="p-2 rounded-theme text-theme-muted hover:text-theme-danger hover:bg-theme-subtle transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
