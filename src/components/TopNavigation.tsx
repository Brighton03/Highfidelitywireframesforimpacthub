import logoImage from 'figma:asset/dcbb89f1fa36dcc241ee0e27240bc423c0b2908c.png';

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
          <img src={logoImage} alt="ImpactHub" className="h-10" />
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
