'use client';

import React, { useState } from 'react';
import { useAuthTheme } from '@/context/AuthThemeContext';
import { useFinance } from '@/context/FinanceContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { ProfileSetupModal } from '@/components/auth/ProfileSetupModal';
import { Header } from '@/components/layout/Header';
import { DesktopNavigation, MobileNavigation } from '@/components/layout/Navigation';
import { OverviewTab } from '@/components/dashboard/OverviewTab';
import { ExpensesTab } from '@/components/expenses/ExpensesTab';
import { GoalsTab } from '@/components/goals/GoalsTab';

export default function Home() {
  const { user, isFirstAccess } = useAuthTheme();
  const { activeTab } = useFinance();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 1. Not Authenticated -> Show Login
  if (!user) {
    return <LoginForm />;
  }

  // 2. Authenticated -> Show Main Dashboard
  return (
    <div className="min-h-[100dvh] bg-theme-base text-theme-text transition-colors duration-300 pb-24 md:pb-12">
      {/* Top Bar with brand logo & profile switcher */}
      <Header onOpenProfile={() => setIsProfileOpen(true)} />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Desktop Segmented Tab Switcher */}
        <DesktopNavigation />

        {/* Tab Views */}
        <div className="transition-opacity duration-300">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'expenses' && <ExpensesTab />}
          {activeTab === 'goals' && <GoalsTab />}
        </div>
      </main>

      {/* Mobile Floating Bottom Bar */}
      <MobileNavigation />

      {/* Profile / Onboarding Modal */}
      <ProfileSetupModal
        isOpen={isFirstAccess || isProfileOpen}
        isMandatory={isFirstAccess}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
