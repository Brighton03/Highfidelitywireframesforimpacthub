import { CheckCircle2, Clock, MapPin, ShieldCheck, TimerReset } from 'lucide-react';
import { Button } from './Button';
import type { ReactNode } from 'react';

interface HourApprovalSuccessProps {
  approval: {
    volunteer: string;
    event: string;
    date: string;
    hours: number;
    location: string;
    status: 'overdue' | 'normal';
  };
  onClose: () => void;
  onNext?: () => void;
}

const InfoRow = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3">
    <div
      className="w-8 h-8 flex items-center justify-center"
      style={{ backgroundColor: '#F0F7F4', borderRadius: '50%' }}
    >
      {icon}
    </div>
    <div>
      <p style={{ color: '#9E9E9E', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
      <p style={{ color: '#2C3E50', fontWeight: 600 }}>{value}</p>
    </div>
  </div>
);

export function HourApprovalSuccess({ approval, onClose, onNext }: HourApprovalSuccessProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 70 }}
    >
      <div
        className="w-full max-w-3xl"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '40px', boxShadow: '0 40px 80px rgba(44, 62, 80, 0.35)' }}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div
            className="w-16 h-16 flex items-center justify-center mb-4"
            style={{ backgroundColor: '#F0F7F4', borderRadius: '50%' }}
          >
            <CheckCircle2 size={36} color="#779F8D" />
          </div>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '28px', marginBottom: '6px' }}>
            Hours Approved & Synced
          </h2>
          <p style={{ color: '#2C3E50', fontSize: '16px', opacity: 0.8 }}>
            {approval.volunteer}'s submission for {approval.event} is now included in reporting dashboards.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className="p-4"
            style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', border: '1px solid #E0E0E0' }}
          >
            <InfoRow
              icon={<Clock size={16} color="#2C3E50" />}
              label="Date & Duration"
              value={`${approval.date} • ${approval.hours.toFixed(1)} hrs`}
            />
            <div className="mt-4">
              <InfoRow
                icon={<MapPin size={16} color="#2C3E50" />}
                label="Location"
                value={approval.location}
              />
            </div>
          </div>
          <div
            className="p-4"
            style={{ backgroundColor: '#E6F2EC', borderRadius: '12px', border: '1px solid #CDE2D6' }}
          >
            <p style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>Compliance Snapshot</p>
            <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
              <ShieldCheck size={16} color="#779F8D" /> Background cleared • Hours eligible
            </div>
            <div className="flex items-center gap-2 mt-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
              <TimerReset size={16} color="#FFB74D" /> Added to monthly impact report
            </div>
          </div>
        </div>

        <div
          className="p-4 mb-6"
          style={{ backgroundColor: '#FFF8E1', borderRadius: '12px', border: '1px solid #FFECB3' }}
        >
          <p style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>Next Steps</p>
          <ul style={{ color: '#2C3E50', fontSize: '14px' }}>
            <li>• Notified volunteer with approval receipt</li>
            <li>• Coordinator dashboard shows updated total hours</li>
            <li>• Remaining submissions awaiting action: auto-highlighted</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => (onNext ? onNext() : onClose())}>
            Review Next Submission
          </Button>
        </div>
      </div>
    </div>
  );
}
