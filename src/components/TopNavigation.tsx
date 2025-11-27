interface TopNavigationProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

export function TopNavigation({ activeItem = 'Home', onNavigate }: TopNavigationProps) {
  const navItems = ['Home', 'Find Opportunities', 'My Schedule', 'Profile'];

  return (
    <nav className="w-full bg-white border-b" style={{ borderColor: '#E0E0E0' }}>
      <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1560 480'%3E%3Ctext x='10' y='280' font-family='Georgia, serif' font-size='280' fill='%232C3E50'%3EImpacthub%3C/text%3E%3Cpath d='M1460 80 Q1480 60 1500 80 L1520 180 Q1500 200 1480 180 Z M1490 200 L1490 400' stroke='%232C3E50' stroke-width='8' fill='%232C3E50'/%3E%3C/svg%3E" 
            alt="ImpactHub" 
            className="h-10" 
          />
        </div>
        
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate?.(item)}
              className="relative py-2"
              style={{
                color: activeItem === item ? '#779F8D' : '#2C3E50',
                fontWeight: activeItem === item ? 600 : 400
              }}
            >
              {item}
              {activeItem === item && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#779F8D' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
