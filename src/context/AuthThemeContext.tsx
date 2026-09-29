'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ThemeType, Gender } from '@/types';

interface AuthThemeContextType {
  user: UserProfile | null;
  theme: ThemeType;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  verifyEmail: (code: string) => boolean;
  logout: () => void;
  updateProfile: (age: number, gender: Gender) => void;
  setTheme: (theme: ThemeType) => void;
  isFirstAccess: boolean;
  completeOnboarding: (age: number, gender: Gender) => void;
}

const AuthThemeContext = createContext<AuthThemeContextType | undefined>(undefined);

export function resolveTheme(age: number, gender: Gender): ThemeType {
  if (age <= 18) {
    return gender === 'male' ? 'young-male' : 'young-female';
  } else {
    return gender === 'male' ? 'adult-male' : 'adult-female';
  }
}

export const AuthThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [theme, setCurrentTheme] = useState<ThemeType>('adult-male');
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mimh_user');
    if (savedUser) {
      try {
        const parsed: UserProfile = JSON.parse(savedUser);
        if (parsed.isEmailVerified) {
          setUser(parsed);
          const resolved = parsed.theme || resolveTheme(parsed.age, parsed.gender);
          setCurrentTheme(resolved);
          document.documentElement.setAttribute('data-theme', resolved);
        }
      } catch (e) {
        console.error('Failed to parse stored user profile', e);
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'adult-male');
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (user) {
      const updated = { ...user, theme: newTheme };
      setUser(updated);
      localStorage.setItem('mimh_user', JSON.stringify(updated));
    }
  };

  const login = (email: string) => {
    const savedUser = localStorage.getItem('mimh_user');
    if (savedUser) {
      const parsed: UserProfile = JSON.parse(savedUser);
      // In a real app, we'd check if parsed.email === email.
      if (!parsed.isEmailVerified) {
        setUser(parsed); // Let them into the verification state
        return;
      }
      setUser(parsed);
      setCurrentTheme(parsed.theme);
      document.documentElement.setAttribute('data-theme', parsed.theme);
      setIsFirstAccess(false);
    } else {
      // Mock an existing verified user for demonstration if no account exists
      const initialUser: UserProfile = {
        id: 'user_1',
        username: email.split('@')[0] || 'Usuário',
        email: email,
        age: 22,
        gender: 'male',
        theme: 'adult-male',
        isConfigured: false,
        isEmailVerified: true,
      };
      setUser(initialUser);
      setIsFirstAccess(true);
      document.documentElement.setAttribute('data-theme', 'adult-male');
    }
  };

  const register = (name: string, email: string) => {
    const newUser: UserProfile = {
      id: 'user_' + Date.now(),
      username: name || 'Usuário',
      email: email,
      age: 22, // Default, will be asked in onboarding
      gender: 'male',
      theme: 'adult-male',
      isConfigured: false,
      isEmailVerified: false,
    };
    setUser(newUser);
    // Don't save to full verified localStorage yet, hold in state
    localStorage.setItem('mimh_user', JSON.stringify(newUser));
  };

  const verifyEmail = (code: string) => {
    // Mock check: any 6 digit code or '123456' passes
    if (code.length >= 5 && user) {
      const verifiedUser = { ...user, isEmailVerified: true };
      setUser(verifiedUser);
      setIsFirstAccess(!verifiedUser.isConfigured);
      localStorage.setItem('mimh_user', JSON.stringify(verifiedUser));
      return true;
    }
    return false;
  };

  const completeOnboarding = (age: number, gender: Gender) => {
    const computedTheme = resolveTheme(age, gender);
    const updatedUser: UserProfile = {
      ...user!,
      age,
      gender,
      theme: computedTheme,
      isConfigured: true,
    };
    setUser(updatedUser);
    setCurrentTheme(computedTheme);
    setIsFirstAccess(false);
    document.documentElement.setAttribute('data-theme', computedTheme);
    localStorage.setItem('mimh_user', JSON.stringify(updatedUser));
  };

  const updateProfile = (age: number, gender: Gender) => {
    completeOnboarding(age, gender);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mimh_user');
    document.documentElement.setAttribute('data-theme', 'adult-male');
  };

  return (
    <AuthThemeContext.Provider
      value={{
        user,
        theme,
        login,
        register,
        verifyEmail,
        logout,
        updateProfile,
        setTheme,
        isFirstAccess,
        completeOnboarding,
      }}
    >
      {children}
    </AuthThemeContext.Provider>
  );
};

export const useAuthTheme = () => {
  const context = useContext(AuthThemeContext);
  if (!context) {
    throw new Error('useAuthTheme must be used within an AuthThemeProvider');
  }
  return context;
};
