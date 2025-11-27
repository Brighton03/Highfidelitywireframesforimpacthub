import { useState } from 'react';
import { SidebarNavigation } from './SidebarNavigation';
import { EventCreationWizard } from './EventCreationWizard';
import { ShiftScheduler } from './ShiftScheduler';
import { HourApprovalQueue } from './HourApprovalQueue';
import { SmartRecruitmentModal } from './SmartRecruitmentModal';
import { Button } from './Button';
import { Badge } from './Badge';
import { Calendar, Users, Clock, MapPin, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

export function CoordinatorDashboard() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false);

  const urgentNeeds = [
    {
      id: 1,
      event: 'Weekend Food Bank',
      date: 'Nov 2, 2025',
      needed: 5,
      filled: 2,
      severity: 'critical'
    },
    {
      id: 2,
      event: 'Medical Transport',
      date: 'Nov 5, 2025',
      needed: 3,
      filled: 1,
      severity: 'warning'
    }
  ];

  const activeRosters = [
    {
      id: 1,
      event: 'Weekly Food Delivery',
      date: 'Fridays',
      volunteers: 12,
      capacity: 15,
      status: 'good'
    },
    {
      id: 2,
      event: 'Beach Cleanup',
      date: 'Nov 12',
      volunteers: 18,
      capacity: 20,
      status: 'excellent'
    },
    {
      id: 3,
      event: 'Senior Center Visit',
      date: 'Nov 15',
      volunteers: 3,
      capacity: 10,
      status: 'critical'
    },
    {
      id: 4,
      event: 'Community Garden',
      date: 'Saturdays',
      volunteers: 8,
      capacity: 12,
      status: 'good'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      volunteer: 'Sarah Johnson',
      event: 'Food Pantry',
      hours: 3,
      date: 'Oct 24, 2025',
      geoMatch: true
    },
    {
      id: 2,
      volunteer: 'Mike Chen',
      event: 'Beach Cleanup',
      hours: 4,
      date: 'Oct 26, 2025',
      geoMatch: false,
      geoDistance: '8.5 miles'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return '#779F8D';
      case 'good':
        return '#9DBAA9';
      case 'warning':
        return '#FFB74D';
      case 'critical':
        return '#E57373';
      default:
        return '#E0E0E0';
    }
  };

  const getProgressPercentage = (volunteers: number, capacity: number) => {
    return (volunteers / capacity) * 100;
  };

  if (activeView === 'Events') {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
        <SidebarNavigation
          activeItem="Events"
          onNavigate={setActiveView}
          userType="coordinator"
        />
        <main className="flex-1">
          <EventCreationWizard />
        </main>
      </div>
    );
  }

  if (activeView === 'Hour Approvals') {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
        <SidebarNavigation
          activeItem="Hour Approvals"
          onNavigate={setActiveView}
          userType="coordinator"
        />
        <main className="flex-1">
          <HourApprovalQueue />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <SidebarNavigation
        activeItem={activeView}
        onNavigate={setActiveView}
        userType="coordinator"
      />

      <main className="flex-1">
        {/* URGENT NEEDS ALERT BANNER */}
        {urgentNeeds.length > 0 && (
          <div 
            className="p-6 shadow-lg"
            style={{ 
              backgroundColor: '#E57373',
              borderBottom: '4px solid #D32F2F'
            }}
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '50%' }}
                >
                  <AlertTriangle size={28} color="#ffffff" />
                </div>
                <div>
                  <h2 style={{ color: '#ffffff', fontWeight: 700, fontSize: '24px' }}>
                    Urgent Attention Needed
                  </h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '16px' }}>
                    {urgentNeeds.length} event{urgentNeeds.length > 1 ? 's need' : ' needs'} immediate volunteer recruitment
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {urgentNeeds.map((need) => (
                  <div 
                    key={need.id}
                    className="p-4 flex items-center justify-between"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px'
                    }}
                  >
                    <div>
                      <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>
                        {need.event}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} style={{ color: '#2C3E50', opacity: 0.6 }} />
                          <span style={{ color: '#2C3E50', fontSize: '14px' }}>{need.date}</span>
                        </div>
                        <div style={{ color: '#E57373', fontSize: '14px', fontWeight: 700 }}>
                          {need.needed - need.filled} volunteers needed
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="primary"
                      onClick={() => setShowRecruitmentModal(true)}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Find Volunteers
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-8">
          <div className="max-w-[1400px] mx-auto">
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '40px', marginBottom: '8px' }}>
              Coordinator Dashboard
            </h1>
            <p style={{ color: '#2C3E50', fontSize: '18px', opacity: 0.8, marginBottom: '32px' }}>
              Manage events, rosters, and volunteer coordination
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Quick Stats */}
              <div 
                className="p-6 shadow-lg"
                style={{ backgroundColor: '#ffffff', borderRadius: '16px', borderTop: '4px solid #779F8D' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: '#F0F7F4', borderRadius: '12px' }}
                  >
                    <Calendar size={24} color="#779F8D" />
                  </div>
                  <div>
                    <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700 }}>
                      12
                    </div>
                    <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                      Active Events
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} color="#779F8D" />
                  <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 600 }}>
                    +3 this week
                  </span>
                </div>
              </div>

              <div 
                className="p-6 shadow-lg"
                style={{ backgroundColor: '#ffffff', borderRadius: '16px', borderTop: '4px solid #2C3E50' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: '#F5F7FA', borderRadius: '12px' }}
                  >
                    <Users size={24} color="#2C3E50" />
                  </div>
                  <div>
                    <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700 }}>
                      145
                    </div>
                    <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                      Total Volunteers
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <CheckCircle size={14} color="#779F8D" />
                  <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 600 }}>
                    128 active
                  </span>
                </div>
              </div>

              <div 
                className="p-6 shadow-lg"
                style={{ backgroundColor: '#ffffff', borderRadius: '16px', borderTop: '4px solid #FFB74D' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: '#FFF8E1', borderRadius: '12px' }}
                  >
                    <Clock size={24} color="#FFB74D" />
                  </div>
                  <div>
                    <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700 }}>
                      8
                    </div>
                    <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                      Pending Approvals
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveView('Hour Approvals')}
                  style={{ color: '#FFB74D', fontSize: '12px', fontWeight: 600 }}
                >
                  Review Now →
                </button>
              </div>
            </div>

            {/* Active Rosters - Visual Cards */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>
                  Active Event Rosters
                </h2>
                <Button variant="primary" onClick={() => setActiveView('Events')}>
                  Create New Event
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {activeRosters.map((roster) => {
                  const percentage = getProgressPercentage(roster.volunteers, roster.capacity);
                  const statusColor = getStatusColor(roster.status);
                  
                  return (
                    <div
                      key={roster.id}
                      className="p-6 shadow-lg"
                      style={{ 
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        borderLeft: `6px solid ${statusColor}`
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>
                            {roster.event}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} style={{ color: '#2C3E50', opacity: 0.6 }} />
                            <span style={{ color: '#2C3E50', fontSize: '14px' }}>{roster.date}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            roster.status === 'critical' ? 'error' :
                            roster.status === 'warning' ? 'warning' :
                            'success'
                          }
                        >
                          {roster.status === 'excellent' ? 'Full Capacity' :
                           roster.status === 'good' ? 'On Track' :
                           roster.status === 'warning' ? 'Need More' :
                           'Urgent'}
                        </Badge>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>
                            Volunteer Coverage
                          </span>
                          <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 700 }}>
                            {roster.volunteers} / {roster.capacity}
                          </span>
                        </div>
                        <div 
                          className="w-full h-4"
                          style={{ 
                            backgroundColor: '#F5F7FA',
                            borderRadius: '100px',
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                        >
                          <div
                            className="h-full transition-all"
                            style={{
                              backgroundColor: statusColor,
                              width: `${percentage}%`,
                              borderRadius: '100px'
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button 
                          onClick={() => setShowRecruitmentModal(true)}
                          className="flex-1 py-2 transition-all"
                          style={{ 
                            backgroundColor: '#F0F7F4',
                            color: '#779F8D',
                            borderRadius: '8px',
                            fontWeight: 600
                          }}
                        >
                          Find Volunteers
                        </button>
                        <button 
                          className="flex-1 py-2 transition-all"
                          style={{ 
                            backgroundColor: '#F5F7FA',
                            color: '#2C3E50',
                            borderRadius: '8px',
                            fontWeight: 600
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Hour Submissions */}
            <div>
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '24px' }}>
                Recent Hour Submissions
              </h2>

              <div 
                className="shadow-lg"
                style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}
              >
                <div className="divide-y" style={{ borderColor: '#F5F7FA' }}>
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="p-6 hover:bg-opacity-50" style={{ backgroundColor: '#ffffff' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                              {approval.volunteer}
                            </h3>
                            {!approval.geoMatch && (
                              <div 
                                className="flex items-center gap-1 px-2 py-1"
                                style={{ backgroundColor: '#FFB74D', borderRadius: '6px' }}
                              >
                                <AlertTriangle size={14} color="#ffffff" />
                                <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: 700 }}>
                                  Geo Mismatch
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-6">
                            <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                              <strong>{approval.event}</strong> • {approval.hours} hours • {approval.date}
                            </div>
                            {!approval.geoMatch && approval.geoDistance && (
                              <div style={{ color: '#FFB74D', fontSize: '14px', fontWeight: 600 }}>
                                Location: {approval.geoDistance} from event
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="primary">Approve</Button>
                          <Button variant="secondary">Review</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showRecruitmentModal && (
        <SmartRecruitmentModal onClose={() => setShowRecruitmentModal(false)} />
      )}
    </div>
  );
}
