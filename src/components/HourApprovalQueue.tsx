import { Badge } from './Badge';
import { Check, X, Edit, AlertTriangle, MapPin } from 'lucide-react';

export function HourApprovalQueue() {
  const pendingApprovals = [
    {
      id: 1,
      volunteer: 'Sarah Chen',
      event: 'Food Pantry',
      date: 'Oct 24, 2025',
      hours: 3.0,
      location: 'Community Center',
      status: 'normal',
      flagged: false
    },
    {
      id: 2,
      volunteer: 'Michael Johnson',
      event: 'Beach Cleanup',
      date: 'Oct 26, 2025',
      hours: 4.5,
      location: 'Main Beach (Reported)',
      actualLocation: 'City Park',
      status: 'geo-mismatch',
      flagged: true
    },
    {
      id: 3,
      volunteer: 'Emma Davis',
      event: 'Senior Center Visit',
      date: 'Oct 28, 2025',
      hours: 2.5,
      location: 'Sunrise Senior Center',
      status: 'normal',
      flagged: false
    }
  ];

  return (
    <div className="p-8">
      <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
        Hour Approval Queue
      </h1>

      <div 
        className="p-6"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
            Pending Approvals
          </h2>
          <div style={{ color: '#2C3E50' }}>
            {pendingApprovals.length} items
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Volunteer
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Event
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Date
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Hours
                </th>
                <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Location
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
              {pendingApprovals.map((approval) => (
                <tr 
                  key={approval.id}
                  className={approval.flagged ? 'transition-colors' : ''}
                  style={{ 
                    borderBottom: '1px solid #E0E0E0',
                    backgroundColor: approval.flagged ? '#FFF8E1' : 'transparent'
                  }}
                >
                  <td className="py-3 px-4" style={{ color: '#2C3E50', fontWeight: 500 }}>
                    {approval.volunteer}
                  </td>
                  <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                    {approval.event}
                  </td>
                  <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                    {approval.date}
                  </td>
                  <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                    {approval.hours.toFixed(1)}
                  </td>
                  <td className="py-3 px-4">
                    <div style={{ color: '#2C3E50' }}>
                      {approval.location}
                      {approval.flagged && (
                        <div className="flex items-center gap-1 mt-1" style={{ color: '#E57373', fontSize: '12px' }}>
                          <MapPin size={12} />
                          <span>Actual: {approval.actualLocation}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {approval.flagged ? (
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} style={{ color: '#E57373' }} />
                        <Badge variant="error">Geo-Mismatch</Badge>
                      </div>
                    ) : (
                      <Badge variant="success">Normal</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 transition-colors hover:bg-opacity-80"
                        style={{ 
                          backgroundColor: '#81C784',
                          borderRadius: '4px'
                        }}
                        title="Approve"
                      >
                        <Check size={18} color="#FFFFFF" />
                      </button>
                      <button
                        className="p-2 transition-colors hover:bg-opacity-80"
                        style={{ 
                          backgroundColor: '#E57373',
                          borderRadius: '4px'
                        }}
                        title="Reject"
                      >
                        <X size={18} color="#FFFFFF" />
                      </button>
                      <button
                        className="p-2 transition-colors hover:bg-opacity-80"
                        style={{ 
                          backgroundColor: '#779F8D',
                          borderRadius: '4px'
                        }}
                        title="Adjust"
                      >
                        <Edit size={18} color="#FFFFFF" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info Box for Flagged Items */}
        <div 
          className="mt-6 p-4 flex items-start gap-3"
          style={{ backgroundColor: '#FFF8E1', borderRadius: '8px', border: '1px solid #FFB74D' }}
        >
          <AlertTriangle size={20} style={{ color: '#FFB74D', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>
              Geo-Mismatch Detected
            </div>
            <div style={{ color: '#2C3E50', fontSize: '14px' }}>
              One or more entries show a location mismatch based on GPS data. Please review and adjust or approve if the volunteer had a valid reason for the discrepancy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
