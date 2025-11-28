import { CheckCircle2, Calendar, Clock, MapPin, FileCheck2, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import type { HourLogSubmissionSummary } from './HourLoggingForm';

interface HourLoggingConfirmationProps {
  summary: HourLogSubmissionSummary;
  onClose: () => void;
  onLogAnother?: () => void;
}

export function HourLoggingConfirmation({ summary, onClose, onLogAnother }: HourLoggingConfirmationProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 60 }}
    >
      <div
        className="w-full max-w-2xl p-8"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', maxHeight: '90vh', overflow: 'auto' }}
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-16 h-16 flex items-center justify-center mb-4"
            style={{ backgroundColor: '#F0F7F4', borderRadius: '50%' }}
          >
            <CheckCircle2 size={32} color="#779F8D" />
          </div>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '28px', marginBottom: '8px' }}>
            Hours Submitted for Approval
          </h2>
          <p style={{ color: '#2C3E50', fontSize: '16px' }}>
            We sent your volunteer hours to the coordinator. You will be notified once they are approved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className="p-4"
            style={{ border: '1px solid #E0E0E0', borderRadius: '10px', backgroundColor: '#F5F7FA' }}
          >
            <div style={{ color: '#9E9E9E', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Event</div>
            <div style={{ color: '#2C3E50', fontWeight: 600 }}>{summary.eventName}</div>
          </div>
          <div
            className="p-4"
            style={{ border: '1px solid #E0E0E0', borderRadius: '10px', backgroundColor: '#F5F7FA' }}
          >
            <div style={{ color: '#9E9E9E', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>Hours Logged</div>
            <div style={{ color: '#2C3E50', fontWeight: 600 }}>{summary.hours || '—'} hrs</div>
          </div>
          <div
            className="p-4"
            style={{ border: '1px solid #E0E0E0', borderRadius: '10px', backgroundColor: '#F5F7FA' }}
          >
            <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontWeight: 600 }}>
              <Calendar size={16} />
              {summary.date || 'Pending date'}
            </div>
            <div className="flex items-center gap-2 mt-2" style={{ color: '#2C3E50' }}>
              <Clock size={16} />
              {summary.startTime && summary.endTime ? `${summary.startTime} - ${summary.endTime}` : 'Pending time'}
            </div>
          </div>
          <div
            className="p-4"
            style={{ border: '1px solid #E0E0E0', borderRadius: '10px', backgroundColor: '#F5F7FA' }}
          >
            <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontWeight: 600 }}>
              <MapPin size={16} />
              {summary.location || 'Location pending'}
            </div>
            <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
              Keep this handy in case your coordinator needs clarification.
            </p>
          </div>
        </div>

        <div
          className="mb-8"
          style={{
            backgroundColor: '#E6F2EC',
            borderRadius: '12px',
            border: '2px solid #779F8D',
            padding: '28px',
            boxShadow: '0 16px 32px rgba(119, 159, 141, 0.18)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck size={20} color="#779F8D" />
            <div>
              <p style={{ color: '#2C3E50', fontWeight: 600 }}>Compliance Reminder</p>
              <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                Hours appear on your impact reports only after coordinator approval. Pending submissions stay highlighted.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4" style={{ color: '#2C3E50', fontSize: '13px' }}>
            <div className="flex items-center gap-2">
              <FileCheck2 size={16} color="#779F8D" />
              Confirmation saved to your history
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} color="#FFB74D" />
              Expected review: 1-2 business days
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" className="flex-1" onClick={() => (onLogAnother ? onLogAnother() : onClose())}>
            Log Another Activity
          </Button>
        </div>
      </div>
    </div>
  );
}
