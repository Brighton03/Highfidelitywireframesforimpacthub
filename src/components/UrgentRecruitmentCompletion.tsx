import { CheckCircle2, Users, Clock, MapPin, Shield, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface RecruitmentSummary {
  eventName: string;
  date: string;
  time: string;
  location: string;
  matchedVolunteers: number;
  coveragePercent: number;
  remainingGap: number;
}

interface UrgentRecruitmentCompletionProps {
  summary: RecruitmentSummary;
  onClose: () => void;
  onViewRoster?: () => void;
}

export function UrgentRecruitmentCompletion({ summary, onClose, onViewRoster }: UrgentRecruitmentCompletionProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 70 }}
    >
      <div
        className="w-full max-w-3xl"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '40px', boxShadow: '0 40px 80px rgba(44, 62, 80, 0.35)' }}
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-16 h-16 flex items-center justify-center mb-4"
            style={{ backgroundColor: '#F0F7F4', borderRadius: '50%' }}
          >
            <CheckCircle2 size={36} color="#779F8D" />
          </div>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '30px', marginBottom: '8px' }}>
            Volunteer Outreach Launched
          </h2>
          <p style={{ color: '#2C3E50', fontSize: '16px', opacity: 0.85 }}>
            We notified the top-matched volunteers for {summary.eventName}. Coverage details are below.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className="p-4"
            style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', border: '1px solid #E0E0E0' }}
          >
            <p style={{ color: '#9E9E9E', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Event
            </p>
            <p style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>{summary.eventName}</p>
            <div className="flex items-center gap-2 mt-3" style={{ color: '#2C3E50' }}>
              <Clock size={16} />{summary.date} • {summary.time}
            </div>
            <div className="flex items-center gap-2 mt-1" style={{ color: '#2C3E50' }}>
              <MapPin size={16} />{summary.location}
            </div>
          </div>
          <div
            className="p-4"
            style={{ backgroundColor: '#F0F7F4', borderRadius: '12px', border: '1px solid #CDE2D6' }}
          >
            <p style={{ color: '#9E9E9E', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              Invitations Sent
            </p>
            <div style={{ color: '#2C3E50', fontSize: '40px', fontWeight: 700 }}>
              {summary.matchedVolunteers}
            </div>
          </div>
        </div>

        <div
          className="p-5 mb-8"
          style={{ backgroundColor: '#FFF8E1', borderRadius: '12px', border: '1px solid #FFECB3' }}
        >
          <div className="flex items-start gap-3">
            <Shield size={20} color="#FFB74D" />
            <div>
              <p style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>Next Actions</p>
              <ul style={{ color: '#2C3E50', fontSize: '14px' }}>
                <li>• Monitor replies for the next 2 hours.</li>
                <li>• Assign standby volunteers if confirmations fall below 90% coverage.</li>
                <li>• Notify on-site lead once roster is locked.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Return to Dashboard
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => (onViewRoster ? onViewRoster() : onClose())}
          >
            <Users size={18} />
            View Updated Roster
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
