import { useState } from 'react';
import { SidebarNavigation } from './SidebarNavigation';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { VolunteerDatabase } from './VolunteerDatabase';
import { ReportGenerator } from './ReportGenerator';
import { FundraisingCampaign } from './FundraisingCampaign';

export function AdminDashboard() {
  const [activeView, setActiveView] = useState('Analytics');

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <SidebarNavigation 
        activeItem={activeView} 
        onNavigate={setActiveView}
        userType="admin"
      />

      <main className="flex-1" style={{ backgroundColor: '#F5F7FA' }}>
        {activeView === 'Dashboard' && <AnalyticsDashboard />}
        {activeView === 'Analytics' && <AnalyticsDashboard />}
        {activeView === 'Volunteer Database' && <VolunteerDatabase />}
        {activeView === 'Report Generator' && <ReportGenerator />}
        {activeView === 'Fundraising' && <FundraisingCampaign />}
      </main>
    </div>
  );
}