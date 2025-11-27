import { useState } from 'react';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { OpportunityFinder } from './components/OpportunityFinder';
import { CoordinatorDashboard } from './components/CoordinatorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { RegistrationFlow } from './components/RegistrationFlow';
import { CreateEventFlow } from './components/CreateEventFlow';
import { DiscoverJoinFlow } from './components/DiscoverJoinFlow';

export default function App() {
  const [activeTab, setActiveTab] = useState<'volunteer-web' | 'coordinator' | 'admin' | 'register-flow' | 'create-event-flow' | 'discover-join-flow'>('volunteer-web');
  const [volunteerView, setVolunteerView] = useState<'dashboard' | 'opportunities'>('dashboard');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Navigation Wrapper */}
      <div className="w-full bg-black">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-8 h-14">
          <button
            onClick={() => {
              setActiveTab('volunteer-web');
              setVolunteerView('dashboard');
            }}
            className={activeTab === 'volunteer-web' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'volunteer-web' ? 600 : 400 }}
          >
            Volunteer (Web)
          </button>
          <button
            onClick={() => setActiveTab('coordinator')}
            className={activeTab === 'coordinator' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'coordinator' ? 600 : 400 }}
          >
            Programme Coordinator
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={activeTab === 'admin' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'admin' ? 600 : 400 }}
          >
            Admin
          </button>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#ffffff40' }} />
          <button
            onClick={() => setActiveTab('register-flow')}
            className={activeTab === 'register-flow' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'register-flow' ? 600 : 400 }}
          >
            Register & Onboard Flow
          </button>
          <button
            onClick={() => setActiveTab('create-event-flow')}
            className={activeTab === 'create-event-flow' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'create-event-flow' ? 600 : 400 }}
          >
            Create Event Flow
          </button>
          <button
            onClick={() => setActiveTab('discover-join-flow')}
            className={activeTab === 'discover-join-flow' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'discover-join-flow' ? 600 : 400 }}
          >
            Discover & Join Flow
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'volunteer-web' && (
        <>
          {volunteerView === 'dashboard' ? (
            <VolunteerDashboard onNavigateToOpportunities={() => setVolunteerView('opportunities')} />
          ) : (
            <OpportunityFinder onNavigateBack={() => setVolunteerView('dashboard')} />
          )}
        </>
      )}
      {activeTab === 'coordinator' && <CoordinatorDashboard />}
      {activeTab === 'admin' && <AdminDashboard />}
      {activeTab === 'register-flow' && <RegistrationFlow />}
      {activeTab === 'create-event-flow' && <CreateEventFlow />}
      {activeTab === 'discover-join-flow' && <DiscoverJoinFlow />}
    </div>
  );
}