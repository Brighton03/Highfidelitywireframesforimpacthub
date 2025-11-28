interface BadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'pending' | 'error' | 'warning' | 'full';
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Badge({ children, variant, className = '', size = 'medium' }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#81C784',
          color: '#FFFFFF'
        };
      case 'pending':
        return {
          backgroundColor: '#FFB74D',
          color: '#FFFFFF'
        };
      case 'warning':
        return {
          backgroundColor: '#FFB74D',
          color: '#FFFFFF'
        };
      case 'full':
        return {
          backgroundColor: '#E57373',
          color: '#FFFFFF'
        };
      case 'error':
        return {
          backgroundColor: '#E57373',
          color: '#FFFFFF'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '12px', padding: '4px 12px' };
      case 'medium':
        return { fontSize: '14px', padding: '6px 16px' };
      case 'large':
        return { fontSize: '16px', padding: '8px 20px', fontWeight: 700 };
    }
  };

  return (
    <span
      className={`inline-block ${className}`}
      style={{
        ...getStyles(),
        ...getSizeStyles(),
        borderRadius: '100px'
      }}
    >
      {children}
    </span>
  );
}
