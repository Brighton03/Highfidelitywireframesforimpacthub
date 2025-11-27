import { useState } from 'react';
import { SidebarNavigation } from './SidebarNavigation';
import { EventCreationWizard } from './EventCreationWizard';
import { SmartRecruitmentModal } from './SmartRecruitmentModal';
import { HourApprovalQueue } from './HourApprovalQueue';
import { Badge } from './Badge';
import { AlertTriangle, Clock, Users, Calendar } from 'lucide-react';

export function CoordinatorDashboard() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [showEventWizard, setShowEventWizard] = useState(false);
  const [showRecruitmentModal, setShowRecruitmentModal] = useState(false);

  const urgentNeeds = [
    { id: 1, event: 'Food Pantry - Nov 5', filled: 3, total: 10, percentage: 30 },
    { id: 2, event: 'Community Garden - Nov 8', filled: 2, total: 8, percentage: 25 },
    { id: 3, event: 'Senior Transport - Nov 10', filled: 1, total: 5, percentage: 20 }
  ];

  const activeRosters = [
    { id: 1, event: 'Beach Cleanup', date: 'Nov 12, 2025', volunteers: 15, capacity: 20, status: 'Active' },
    { id: 2, event: 'Food Delivery', date: 'Weekly', volunteers: 12, capacity: 15, status: 'Active' },
    { id: 3, event: 'Literacy Program', date: 'Nov 20, 2025', volunteers: 8, capacity: 10, status: 'Active' }
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <SidebarNavigation 
        activeItem={activeView} 
        onNavigate={setActiveView}
        userType="coordinator"
      />

      <main className="flex-1">
        {activeView === 'Dashboard' && (
          <div className="p-8">
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
              Coordinator Dashboard
            </h1>

            {/* Widgets Row */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Urgent Needs Widget */}
              <div 
                className="p-6"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={24} style={{ color: '#E57373' }} />
                  <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                    Urgent Needs
                  </h2>
                </div>

                <p style={{ color: '#2C3E50', marginBottom: '16px', fontSize: '14px' }}>
                  Shifts below 50% capacity
                </p>

                <div className="space-y-4">
                  {urgentNeeds.map((need) => (
                    <div 
                      key={need.id}
                      className="p-4"
                      style={{ backgroundColor: '#FFF8E1', borderRadius: '8px' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ color: '#2C3E50', fontWeight: 600 }}>
                          {need.event}
                        </span>
                        <Badge variant="error">{need.percentage}% Full</Badge>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                        <Users size={16} />
                        <span>{need.filled} of {need.total} volunteers</span>
                      </div>
                      <div className="w-full h-2 mt-3" style={{ backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
                        <div 
                          className="h-full"
                          style={{ 
                            backgroundColor: '#E57373',
                            width: `${need.percentage}%`,
                            borderRadius: '100px'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Verifications Widget */}
              <div 
                className="p-6"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={24} style={{ color: '#FFB74D' }} />
                  <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                    Pending Verifications
                  </h2>
                </div>

                <div 
                  className="p-8 text-center"
                  style={{ backgroundColor: '#FFF8E1', borderRadius: '8px' }}
                >
                  <div style={{ color: '#2C3E50', fontSize: '64px', fontWeight: 700, marginBottom: '8px' }}>
                    3
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '16px', marginBottom: '16px' }}>
                    Hour logs awaiting approval
                  </div>
                  <button
                    onClick={() => setActiveView('Hour Approvals')}
                    className="px-6 py-2"
                    style={{
                      backgroundColor: '#779F8D',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontWeight: 500
                    }}
                  >
                    Review Now
                  </button>
                </div>
              </div>
            </div>

            {/* Active Rosters Table */}
            <div 
              className="p-6"
              style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                  Active Rosters
                </h2>
                <button
                  onClick={() => setShowEventWizard(true)}
                  className="px-6 py-2"
                  style={{
                    backgroundColor: '#779F8D',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontWeight: 500
                  }}
                >
                  Create New Event
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
                      <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                        Event
                      </th>
                      <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                        Date
                      </th>
                      <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                        Volunteers
                      </th>
                      <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                        Status
                      </th>
                      <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRosters.map((roster) => (
                      <tr key={roster.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
                        <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                          {roster.event}
                        </td>
                        <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                          {roster.date}
                        </td>
                        <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                          {roster.volunteers}/{roster.capacity}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="success">{roster.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            className="px-4 py-1"
                            style={{
                              color: '#779F8D',
                              border: '1px solid #779F8D',
                              borderRadius: '4px',
                              fontWeight: 500
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'Hour Approvals' && <HourApprovalQueue />}
      </main>

      {showEventWizard && (
        <EventCreationWizard
          onClose={() => setShowEventWizard(false)}
          onSave={() => {
            setShowEventWizard(false);
            setShowRecruitmentModal(true);
          }}
        />
      )}

      {showRecruitmentModal && (
        <SmartRecruitmentModal
          onClose={() => setShowRecruitmentModal(false)}
        />
      )}
    </div>
  );
}
