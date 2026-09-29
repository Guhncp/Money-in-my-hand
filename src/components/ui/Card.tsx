import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false, ...props }) => {
  return (
    <div
      className={`bg-theme-surface border border-theme-border/60 rounded-theme p-5 transition-all duration-300 ${
        glow ? 'shadow-theme-glow border-theme-accent/60' : 'shadow-theme-card'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
