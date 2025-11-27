interface BadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'pending' | 'error';
  className?: string;
}

export function Badge({ children, variant, className = '' }: BadgeProps) {
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
      case 'error':
        return {
          backgroundColor: '#E57373',
          color: '#FFFFFF'
        };
    }
  };

  return (
    <span
      className={`px-3 py-1 inline-block ${className}`}
      style={{
        ...getStyles(),
        borderRadius: '100px',
        fontSize: '12px',
        fontWeight: 500
      }}
    >
      {children}
    </span>
  );
}
