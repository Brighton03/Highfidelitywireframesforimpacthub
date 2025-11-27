import { Button } from './Button';
import { CheckCircle2, Calendar, X } from 'lucide-react';

interface BookingConfirmationModalProps {
  onClose: () => void;
}

export function BookingConfirmationModal({ onClose }: BookingConfirmationModalProps) {
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
              Registration Complete
            </h2>
          </div>
          <button onClick={onClose} style={{ color: '#2C3E50' }}>
            <X size={24} />
          </button>
        </div>

        <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
          Your volunteer registration has been processed. Here's a summary:
        </p>

        {/* Split List Logic */}
        <div className="space-y-4 mb-6">
          {/* Successfully Joined */}
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
              <span style={{ color: '#2C3E50', fontWeight: 600 }}>Successfully Joined</span>
            </div>
            <ul className="ml-7 space-y-1">
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>• Oct 24, 2025 - 9:00 AM - 12:00 PM</li>
            </ul>
          </div>

          {/* Added to Waitlist */}
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
              <span style={{ color: '#2C3E50', fontWeight: 600 }}>Added to Waitlist</span>
            </div>
            <ul className="ml-7 space-y-1">
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>• Nov 14, 2025 - 9:00 AM - 12:00 PM (Shift Full)</li>
            </ul>
            <p style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px', marginLeft: '28px' }}>
              You'll be notified if a spot opens up.
            </p>
          </div>
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
