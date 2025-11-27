import { Home, Calendar, Users, FileText, Settings, BarChart3, Database, FileBarChart, DollarSign } from 'lucide-react';
import logoImage from 'figma:asset/dcbb89f1fa36dcc241ee0e27240bc423c0b2908c.png';

interface SidebarNavigationProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
  userType: 'coordinator' | 'admin';
}

export function SidebarNavigation({ activeItem = 'Dashboard', onNavigate, userType }: SidebarNavigationProps) {
  const coordinatorItems = [
    { label: 'Dashboard', icon: Home },
    { label: 'Events', icon: Calendar },
    { label: 'Rosters', icon: Users },
    { label: 'Hour Approvals', icon: FileText },
    { label: 'Reports', icon: BarChart3 },
    { label: 'Settings', icon: Settings }
  ];

  const adminItems = [
    { label: 'Dashboard', icon: Home },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Volunteer Database', icon: Database },
    { label: 'Report Generator', icon: FileBarChart },
    { label: 'Fundraising', icon: DollarSign },
    { label: 'Settings', icon: Settings }
  ];

  const items = userType === 'coordinator' ? coordinatorItems : adminItems;

  return (
    <aside 
      className="w-64 h-screen flex flex-col shadow-lg"
      style={{ backgroundColor: '#2C3E50' }}
    >
      <div className="p-6 border-b" style={{ borderColor: '#3E5266' }}>
        <img src={logoImage} alt="ImpactHub" className="h-10" />
      </div>
      
      <nav className="flex-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => onNavigate?.(item.label)}
              className="w-full flex items-center gap-3 px-4 py-3 mb-2 transition-all"
              style={{
                backgroundColor: isActive ? '#779F8D' : 'transparent',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontWeight: isActive ? 600 : 400,
                boxShadow: isActive ? '0 4px 12px rgba(119, 159, 141, 0.3)' : 'none',
                transform: isActive ? 'translateX(4px)' : 'none'
              }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}