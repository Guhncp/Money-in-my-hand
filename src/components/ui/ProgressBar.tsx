import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className = '',
  showPercent = false,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / (max || 1)) * 100)));

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-theme-subtle rounded-full h-3 overflow-hidden p-0.5 border border-theme-border/40">
        <div
          className="h-full bg-theme-accent rounded-full transition-all duration-700 ease-out shadow-theme-glow relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle light shimmer effect on the progress bar */}
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </div>
      </div>
      {showPercent && (
        <div className="flex justify-between items-center text-xs font-semibold mt-1 text-theme-muted">
          <span>Progresso</span>
          <span className="text-theme-accent">{percentage}%</span>
        </div>
      )}
    </div>
  );
};
