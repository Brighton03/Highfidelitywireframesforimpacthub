import { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'disabled';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = '',
  style
}: ButtonProps) {
  const getStyles = () => {
    if (disabled || variant === 'disabled') {
      return {
        backgroundColor: '#CFD8DC',
        color: '#2C3E50',
        opacity: 0.5,
        cursor: 'not-allowed',
        border: 'none'
      };
    }
    
    if (variant === 'secondary') {
      return {
        backgroundColor: 'transparent',
        color: '#2C3E50',
        border: '1px solid #2C3E50'
      };
    }

    if (variant === 'danger') {
      return {
        backgroundColor: '#E57373',
        color: '#FFFFFF',
        border: 'none'
      };
    }
    
    // primary
    return {
      backgroundColor: '#779F8D',
      color: '#FFFFFF',
      border: 'none'
    };
  };

  const baseStyle = {
    ...getStyles(),
    borderRadius: '8px',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`px-6 py-2.5 transition-opacity hover:opacity-90 ${className}`}
      style={{
        ...baseStyle,
        ...style
      }}
    >
      {children}
    </button>
  );
}
