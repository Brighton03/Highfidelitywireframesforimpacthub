interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'disabled';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className = '' 
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
    
    // primary
    return {
      backgroundColor: '#779F8D',
      color: '#FFFFFF',
      border: 'none'
    };
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`px-6 py-2.5 transition-opacity hover:opacity-90 ${className}`}
      style={{
        ...getStyles(),
        borderRadius: '8px',
        fontWeight: 500
      }}
    >
      {children}
    </button>
  );
}
