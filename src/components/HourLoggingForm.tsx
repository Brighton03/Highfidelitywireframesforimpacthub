import { useState } from 'react';
import { Button } from './Button';
import { Calendar, Clock, MapPin, FileText, Camera } from 'lucide-react';

interface HourLoggingFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

export function HourLoggingForm({ onClose, onSubmit }: HourLoggingFormProps) {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50 }}
    >
      <div
        className="w-full max-w-2xl p-8"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', maxHeight: '90vh', overflow: 'auto' }}
      >
        <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '8px' }}>
          Log Volunteer Hours
        </h2>
        <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
          Record your volunteer activity for approval
        </p>

        <div className="space-y-6">
          {/* Event Selection */}
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Select Event
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-4 py-3 border"
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '8px',
                color: '#2C3E50',
                outline: 'none'
              }}
            >
              <option value="">Choose an event...</option>
              <option value="food-pantry">Food Pantry - Oct 24</option>
              <option value="beach-cleanup">Beach Cleanup - Nov 2</option>
              <option value="senior-center">Senior Center Visit - Nov 8</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Date
            </label>
            <div className="relative">
              <Calendar size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border"
                style={{
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Time Period */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Start Time
              </label>
              <div className="relative">
                <Clock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                <input
                  type="time"
                  className="w-full pl-10 pr-4 py-3 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                End Time
              </label>
              <div className="relative">
                <Clock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                <input
                  type="time"
                  className="w-full pl-10 pr-4 py-3 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Total Hours (calculated) */}
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Total Hours
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="3.0"
              step="0.5"
              className="w-full px-4 py-3 border"
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '8px',
                color: '#2C3E50',
                outline: 'none'
              }}
            />
          </div>

          {/* Location Verification */}
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Location
            </label>
            <div className="relative">
              <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
              <input
                type="text"
                placeholder="Community Center"
                className="w-full pl-10 pr-4 py-3 border"
                style={{
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50',
                  outline: 'none'
                }}
              />
            </div>
            <p style={{ color: '#779F8D', fontSize: '12px', marginTop: '8px' }}>
              ✓ GPS location verified
            </p>
          </div>

          {/* Notes */}
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Notes (Optional)
            </label>
            <div className="relative">
              <FileText size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: '#2C3E50' }} />
              <textarea
                placeholder="Add any additional notes about your volunteer activity..."
                rows={3}
                className="w-full pl-10 pr-4 py-3 border"
                style={{
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Photo Proof (Optional)
            </label>
            <div
              className="p-6 border-2 border-dashed text-center cursor-pointer transition-colors hover:border-opacity-70"
              style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
            >
              <Camera size={32} style={{ color: '#2C3E50', margin: '0 auto 12px' }} />
              <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                Click to upload a photo from your activity
              </p>
              <p style={{ color: '#9E9E9E', fontSize: '12px', marginTop: '4px' }}>
                JPG, PNG up to 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit} className="flex-1">
            Submit for Approval
          </Button>
        </div>
      </div>
    </div>
  );
}
