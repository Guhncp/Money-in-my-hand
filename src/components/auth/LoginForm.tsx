'use client';

import React, { useState } from 'react';
import { useAuthTheme } from '@/context/AuthThemeContext';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Wallet, Lock, Mail, User as UserIcon, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

type AuthMode = 'login' | 'register' | 'verify';

export const LoginForm: React.FC = () => {
  const { login, register, verifyEmail, user } = useAuthTheme();
  
  // Set initial mode to verify if we have an unverified user in state
  const [mode, setMode] = useState<AuthMode>(user && !user.isEmailVerified ? 'verify' : 'login');
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Verify State
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyError, setVerifyError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    login(loginEmail);
    // Note: If user is unverified, page.tsx logic or context could intercept.
    // In this flow, if they are unverified, we switch to verify mode manually:
    const savedUser = localStorage.getItem('mimh_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (!parsed.isEmailVerified) {
        setMode('verify');
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    register(regName, regEmail);
    setMode('verify');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyEmail(verifyCode);
    if (!success) {
      setVerifyError('Código inválido. Use 123456 para teste.');
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 relative overflow-hidden bg-theme-base">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-theme-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md relative z-10 p-6 sm:p-8 shadow-theme-glow border-theme-border/80">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-theme bg-theme-accent/20 border border-theme-accent/40 flex items-center justify-center text-theme-accent mb-4 shadow-theme-glow">
            <Wallet className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-text font-theme tracking-tight">
            Money in My <span className="text-theme-accent">Hand</span>
          </h1>
          <p className="text-sm text-theme-muted mt-2">
            Controle inteligente de finanças com temas dinâmicos adaptados a você.
          </p>
        </div>

        {mode === 'verify' ? (
          <form onSubmit={handleVerify} className="space-y-4 animate-fadeIn">
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto bg-theme-accentLight text-theme-accent rounded-full flex items-center justify-center mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-theme-text">Verifique seu E-mail</h3>
              <p className="text-xs text-theme-muted mt-1">
                Enviamos um código de 6 dígitos para <strong>{user?.email || 'seu e-mail'}</strong>.
              </p>
            </div>

            <div className="space-y-1">
              <Input
                label="Código de Confirmação"
                type="text"
                maxLength={6}
                placeholder="Ex: 123456"
                value={verifyCode}
                onChange={(e) => {
                  setVerifyCode(e.target.value);
                  setVerifyError('');
                }}
                error={verifyError}
                className="text-center text-xl tracking-widest font-bold"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2 mt-4">
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirmar Cadastro</span>
            </Button>
            
            <button 
              type="button" 
              onClick={() => setMode('login')} 
              className="w-full text-xs text-theme-muted hover:text-theme-text mt-4 text-center"
            >
              Voltar ao Login
            </button>
          </form>
        ) : mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4 animate-fadeIn">
            <div className="flex bg-theme-subtle p-1 rounded-theme mb-6">
              <button type="button" className="w-1/2 py-1.5 text-sm font-bold bg-theme-surface rounded shadow-sm text-theme-text">Entrar</button>
              <button type="button" onClick={() => setMode('register')} className="w-1/2 py-1.5 text-sm font-medium text-theme-muted hover:text-theme-text transition-colors">Cadastrar</button>
            </div>

            <div className="relative">
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <Mail className="w-4 h-4 text-theme-muted absolute right-3 top-8 pointer-events-none" />
            </div>

            <div className="relative">
              <Input
                label="Senha de Acesso"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <Lock className="w-4 h-4 text-theme-muted absolute right-3 top-8 pointer-events-none" />
            </div>

            <Button type="submit" size="lg" className="w-full mt-4 gap-2">
              <span>Acessar Painel</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 animate-fadeIn">
            <div className="flex bg-theme-subtle p-1 rounded-theme mb-6">
              <button type="button" onClick={() => setMode('login')} className="w-1/2 py-1.5 text-sm font-medium text-theme-muted hover:text-theme-text transition-colors">Entrar</button>
              <button type="button" className="w-1/2 py-1.5 text-sm font-bold bg-theme-surface rounded shadow-sm text-theme-text">Cadastrar</button>
            </div>

            <div className="relative">
              <Input
                label="Nome ou Apelido"
                type="text"
                placeholder="Como quer ser chamado?"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
              <UserIcon className="w-4 h-4 text-theme-muted absolute right-3 top-8 pointer-events-none" />
            </div>

            <div className="relative">
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
              <Mail className="w-4 h-4 text-theme-muted absolute right-3 top-8 pointer-events-none" />
            </div>

            <div className="relative">
              <Input
                label="Criar Senha"
                type="password"
                placeholder="••••••••"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
              <Lock className="w-4 h-4 text-theme-muted absolute right-3 top-8 pointer-events-none" />
            </div>

            <Button type="submit" size="lg" className="w-full mt-4 gap-2">
              <span>Criar Conta</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {mode !== 'verify' && (
          <div className="mt-6 pt-4 border-t border-theme-border/40 text-center">
            <p className="text-xs text-theme-muted flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-theme-accent" />
              Preencha para testar o painel interativo.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
