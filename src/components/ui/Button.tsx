import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-theme transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-theme-accent text-white hover:bg-theme-accentHover shadow-theme-glow active:scale-[0.98]',
    secondary:
      'bg-theme-subtle text-theme-text hover:bg-theme-subtle/80 active:scale-[0.98]',
    outline:
      'border border-theme-border text-theme-text hover:border-theme-accent hover:text-theme-accent active:scale-[0.98]',
    danger:
      'bg-theme-danger text-white hover:opacity-90 active:scale-[0.98]',
    ghost:
      'text-theme-muted hover:text-theme-text hover:bg-theme-subtle/50',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
