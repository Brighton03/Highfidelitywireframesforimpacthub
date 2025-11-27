import { Button } from './Button';
import { X, Users, Target, Clock } from 'lucide-react';

interface SmartRecruitmentModalProps {
  onClose: () => void;
}

export function SmartRecruitmentModal({ onClose }: SmartRecruitmentModalProps) {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50 }}
    >
      <div 
        className="w-full max-w-2xl p-8"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>
            Smart Recruitment Scan
          </h2>
          <button onClick={onClose} style={{ color: '#2C3E50' }}>
            <X size={24} />
          </button>
        </div>

        <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
          We've analyzed your volunteer database to find the best matches for this event.
        </p>

        {/* Scan Results */}
        <div 
          className="p-6 mb-6"
          style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px solid #779F8D' }}
        >
          <div className="text-center mb-6">
            <div style={{ color: '#779F8D', fontSize: '64px', fontWeight: 700, marginBottom: '8px' }}>
              15
            </div>
            <div style={{ color: '#2C3E50', fontSize: '20px', fontWeight: 600 }}>
              High-Confidence Matches
            </div>
            <div style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px' }}>
              Based on Skills + Availability
            </div>
          </div>

          {/* Match Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div 
              className="p-4 text-center"
              style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
            >
              <Target size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
              <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                15
              </div>
              <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                Skills Match
              </div>
            </div>

            <div 
              className="p-4 text-center"
              style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
            >
              <Clock size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
              <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                12
              </div>
              <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                Available
              </div>
            </div>

            <div 
              className="p-4 text-center"
              style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
            >
              <Users size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
              <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                8
              </div>
              <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                Active Status
              </div>
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div 
          className="p-4 mb-6"
          style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
        >
          <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
            Top Matches Include:
          </h3>
          <ul className="space-y-2">
            <li style={{ color: '#2C3E50', fontSize: '14px' }}>
              • 8 volunteers with "Driver" skill and Friday availability
            </li>
            <li style={{ color: '#2C3E50', fontSize: '14px' }}>
              • 4 volunteers who previously participated in similar events
            </li>
            <li style={{ color: '#2C3E50', fontSize: '14px' }}>
              • 3 volunteers within 5 miles of event location
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="primary" onClick={onClose} className="flex-1">
            Publish & Send Direct Invites
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Publish Publicly Only
          </Button>
        </div>

        <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '16px', textAlign: 'center', opacity: 0.7 }}>
          Direct invites will be sent via email and in-app notifications
        </p>
      </div>
    </div>
  );
}
