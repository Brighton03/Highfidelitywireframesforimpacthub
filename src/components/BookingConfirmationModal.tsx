import { Button } from './Button';
import { CheckCircle2, Calendar, X } from 'lucide-react';

interface BookingConfirmationModalProps {
  onClose: () => void;
  heading?: string;
  joinedEntries?: string[];
  waitlistedEntries?: string[];
}

export function BookingConfirmationModal({ onClose, heading = 'Booking Update', joinedEntries = [], waitlistedEntries = [] }: BookingConfirmationModalProps) {
  const hasJoined = joinedEntries.length > 0;
  const hasWaitlist = waitlistedEntries.length > 0;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50 }}
    >
      <div 
        className="w-full max-w-lg p-8"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
            >
              <CheckCircle2 size={28} color="#FFFFFF" />
            </div>
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>
              Selections Saved
            </h2>
          </div>
          <button onClick={onClose} style={{ color: '#2C3E50' }} aria-label="Close confirmation dialog">
            <X size={24} />
          </button>
        </div>

        <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
          We updated your availability for <strong>{heading}</strong>.
        </p>

        {/* Split List Logic */}
        <div className="space-y-4 mb-6">
          {hasJoined && (
            <div 
              className="p-4 border-l-4"
              style={{ 
                backgroundColor: '#F0F7F4',
                borderColor: '#779F8D',
                borderRadius: '4px'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={20} style={{ color: '#779F8D' }} />
                <span style={{ color: '#2C3E50', fontWeight: 600 }}>Added to Upcoming Shifts</span>
              </div>
              <ul className="ml-7 space-y-1">
                {joinedEntries.map((entry) => (
                  <li key={entry} style={{ color: '#2C3E50', fontSize: '14px' }}>• {entry}</li>
                ))}
              </ul>
            </div>
          )}

          {hasWaitlist && (
            <div 
              className="p-4 border-l-4"
              style={{ 
                backgroundColor: '#FFF8E1',
                borderColor: '#FFB74D',
                borderRadius: '4px'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={20} style={{ color: '#FFB74D' }} />
                <span style={{ color: '#2C3E50', fontWeight: 600 }}>Waitlist Confirmed</span>
              </div>
              <ul className="ml-7 space-y-1">
                {waitlistedEntries.map((entry) => (
                  <li key={entry} style={{ color: '#2C3E50', fontSize: '14px' }}>• {entry}</li>
                ))}
              </ul>
              <p style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px', marginLeft: '28px' }}>
                We'll notify you if a confirmed spot opens up.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="primary" onClick={onClose} className="flex-1">
            Add to Calendar
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
