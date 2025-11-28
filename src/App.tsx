import { useState } from 'react';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { OpportunityFinder } from './components/OpportunityFinder';
import { VolunteerSchedule } from './components/VolunteerSchedule';
import { VolunteerProfile } from './components/VolunteerProfile';
import { VolunteerProfileAllCaughtUp } from './components/VolunteerProfileAllCaughtUp';
import { VolunteerProfilePending } from './components/VolunteerProfilePending';
import { CoordinatorDashboard } from './components/CoordinatorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { RegistrationFlow } from './components/RegistrationFlow';
import { CreateEventFlow } from './components/CreateEventFlow';
import { DiscoverJoinFlow } from './components/DiscoverJoinFlow';
import { VolunteerMobileApp } from './components/VolunteerMobileApp';
import { GenerateReportsFlow } from './components/GenerateReportsFlow';
import { VolunteerAuthLanding } from './components/VolunteerAuthLanding';

export default function App() {
  const [activeTab, setActiveTab] = useState<'volunteer-auth' | 'volunteer-web' | 'coordinator' | 'admin' | 'register-flow' | 'create-event-flow' | 'create-event-flow-no-matches' | 'discover-join-flow' | 'volunteer-mobile' | 'generate-reports' | 'proof-flow'>('volunteer-auth');
  const [volunteerView, setVolunteerView] = useState<'dashboard' | 'opportunities' | 'schedule' | 'profile'>('dashboard');
  const [proofView, setProofView] = useState<'all-caught-up' | 'pending'>('pending');

  const navigateToVolunteerDashboard = () => {
    setActiveTab('volunteer-web');
    setVolunteerView('dashboard');
  };

  const handleVolunteerLogout = () => {
    setActiveTab('volunteer-auth');
    setVolunteerView('dashboard');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Navigation Wrapper */}
      <div className="w-full bg-black">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-8 h-14">
          <button
            onClick={() => setActiveTab('volunteer-auth')}
            className={activeTab === 'volunteer-auth' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'volunteer-auth' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Volunteer Login/Register
          </button>
          <button
            onClick={() => {
              setActiveTab('volunteer-web');
              setVolunteerView('dashboard');
            }}
            className={activeTab === 'volunteer-web' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'volunteer-web' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Volunteer (Web)
          </button>
          <button
            onClick={() => setActiveTab('coordinator')}
            className={activeTab === 'coordinator' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'coordinator' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Programme Coordinator
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={activeTab === 'admin' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'admin' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Admin
          </button>
          <div style={{ width: '1px', height: '24px', backgroundColor: '#ffffff40' }} />
          <button
            onClick={() => {
              setActiveTab('proof-flow');
              setProofView('pending');
            }}
            className={activeTab === 'proof-flow' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'proof-flow' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Proof Flow
          </button>
          <button
            onClick={() => setActiveTab('register-flow')}
            className={activeTab === 'register-flow' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'register-flow' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Register & Onboard Flow
          </button>
          <button
            onClick={() => setActiveTab('create-event-flow')}
            className={activeTab === 'create-event-flow' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'create-event-flow' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Create Event Flow
          </button>
          <button
            onClick={() => setActiveTab('create-event-flow-no-matches')}
            className={activeTab === 'create-event-flow-no-matches' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'create-event-flow-no-matches' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Create Event Flow (Alt)
          </button>
          <button
            onClick={() => setActiveTab('discover-join-flow')}
            className={activeTab === 'discover-join-flow' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'discover-join-flow' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Discover & Join Flow
          </button>
          <button
            onClick={() => setActiveTab('volunteer-mobile')}
            className={activeTab === 'volunteer-mobile' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'volunteer-mobile' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Volunteer Mobile App
          </button>
          <button
            onClick={() => setActiveTab('generate-reports')}
            className={activeTab === 'generate-reports' ? 'text-white' : 'text-white/60'}
            style={{ fontWeight: activeTab === 'generate-reports' ? 600 : 400, cursor: 'pointer', border: 'none', background: 'transparent', padding: '8px 12px' }}
          >
            Generate Reports
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'volunteer-auth' && (
        <VolunteerAuthLanding
          onLogin={navigateToVolunteerDashboard}
          onRegister={() => setActiveTab('register-flow')}
        />
      )}
      {activeTab === 'volunteer-web' && (
        <>
          {volunteerView === 'dashboard' && (
            <VolunteerDashboard 
              onNavigateToOpportunities={() => setVolunteerView('opportunities')}
              onLogout={handleVolunteerLogout}
              onNavigate={(item) => {
                if (item === 'Find Opportunities') setVolunteerView('opportunities');
                else if (item === 'My Schedule') setVolunteerView('schedule');
                else if (item === 'Profile') setVolunteerView('profile');
              }}
            />
          )}
          {volunteerView === 'opportunities' && (
            <OpportunityFinder onNavigate={(item) => {
              if (item === 'Home') setVolunteerView('dashboard');
              else if (item === 'My Schedule') setVolunteerView('schedule');
              else if (item === 'Profile') setVolunteerView('profile');
            }} onLogout={handleVolunteerLogout} />
          )}
          {volunteerView === 'schedule' && (
            <VolunteerSchedule onNavigate={(item) => {
              if (item === 'Home') setVolunteerView('dashboard');
              else if (item === 'Find Opportunities') setVolunteerView('opportunities');
              else if (item === 'Profile') setVolunteerView('profile');
            }} onLogout={handleVolunteerLogout} />
          )}
          {volunteerView === 'profile' && (
            <VolunteerProfile onNavigate={(item) => {
              if (item === 'Home') setVolunteerView('dashboard');
              else if (item === 'Find Opportunities') setVolunteerView('opportunities');
              else if (item === 'My Schedule') setVolunteerView('schedule');
            }} onLogout={handleVolunteerLogout} />
          )}
        </>
      )}
      {activeTab === 'coordinator' && <CoordinatorDashboard />}
      {activeTab === 'admin' && <AdminDashboard />}
      {activeTab === 'proof-flow' && (
        <>
          <div className="max-w-[1440px] mx-auto px-8 pt-4">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setProofView('pending')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: proofView === 'pending' ? '#779F8D' : '#F5F7FA',
                  color: proofView === 'pending' ? '#FFFFFF' : '#2C3E50',
                  fontWeight: 600
                }}
              >
                Pending Documents
              </button>
              <button
                onClick={() => setProofView('all-caught-up')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: proofView === 'all-caught-up' ? '#779F8D' : '#F5F7FA',
                  color: proofView === 'all-caught-up' ? '#FFFFFF' : '#2C3E50',
                  fontWeight: 600
                }}
              >
                All Caught Up
              </button>
            </div>
          </div>
          {proofView === 'pending' && <VolunteerProfilePending onNavigate={() => {}} />}
          {proofView === 'all-caught-up' && <VolunteerProfileAllCaughtUp onNavigate={() => {}} />}
        </>
      )}
      {activeTab === 'register-flow' && <RegistrationFlow />}
      {/* Align flows with actual screens */}
      {activeTab === 'create-event-flow' && <CreateEventFlow />}
      {activeTab === 'create-event-flow-no-matches' && <CreateEventFlow scenario="no-matches" />}
      {activeTab === 'discover-join-flow' && (
        // Route to same screen as Find Opportunities
        <OpportunityFinder onNavigate={(item) => {
          if (item === 'Home') setVolunteerView('dashboard');
          else if (item === 'My Schedule') setVolunteerView('schedule');
          else if (item === 'Profile') setVolunteerView('profile');
        }} />
      )}
      {activeTab === 'volunteer-mobile' && <VolunteerMobileApp />}
      {activeTab === 'generate-reports' && <GenerateReportsFlow />}
    </div>
  );
}