import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-theme-muted">{label}</label>}
      <input
        className={`w-full bg-theme-subtle/80 border border-theme-border/80 text-theme-text rounded-theme px-3.5 py-2.5 text-sm placeholder:text-theme-muted/50 focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-colors ${
          error ? 'border-theme-danger focus:border-theme-danger' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-theme-danger mt-0.5">{error}</span>}
    </div>
  );
};
