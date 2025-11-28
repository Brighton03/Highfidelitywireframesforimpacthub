import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Calendar, Clock, MapPin, FileText, Camera } from 'lucide-react';

export interface HourLogSubmissionSummary {
  eventName: string;
  date: string;
  hours: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface HourLoggingFormProps {
  onClose: () => void;
  onSubmit: (summary: HourLogSubmissionSummary) => void;
}

export function HourLoggingForm({ onClose, onSubmit }: HourLoggingFormProps) {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  // Mock event lookup to auto-fill details
  const eventLookup: Record<string, { date: string; start: string; end: string; location: string; hours: string; label: string }> = {
    'food-pantry': { date: '2025-10-24', start: '09:00', end: '12:00', location: 'Community Center', hours: '3', label: 'Food Pantry Assistance' },
    'beach-cleanup': { date: '2025-11-02', start: '08:00', end: '11:00', location: 'Main Beach', hours: '3', label: 'Beach Cleanup Crew' },
    'senior-center': { date: '2025-11-08', start: '14:00', end: '17:00', location: 'Sunset Senior Center', hours: '3', label: 'Senior Center Visit' },
  };

  useEffect(() => {
    if (!selectedEvent) return;
    const info = eventLookup[selectedEvent];
    if (info) {
      setDate(info.date);
      setStartTime(info.start);
      setEndTime(info.end);
      setLocation(info.location);
      setHours(info.hours);
    }
  }, [selectedEvent]);

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

          {selectedEvent && (
            <>
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
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
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
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
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

              {/* Location */}
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Location
                </label>
                <div className="relative">
                  <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Event location"
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
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (!selectedEvent) return;
              const metadata = eventLookup[selectedEvent];
              onSubmit({
                eventName: metadata?.label ?? 'Volunteer Activity',
                date,
                hours,
                startTime,
                endTime,
                location
              });
            }}
            className="flex-1"
            disabled={!selectedEvent}
          >
            Submit for Approval
          </Button>
        </div>
      </div>
    </div>
  );
}
