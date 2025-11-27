import { useState } from 'react';
import { Button } from './Button';
import { X } from 'lucide-react';

interface EventCreationWizardProps {
  onClose: () => void;
  onSave: () => void;
}

export function EventCreationWizard({ onClose, onSave }: EventCreationWizardProps) {
  const [eventType, setEventType] = useState<'single' | 'multi'>('multi');
  const [recurringPattern, setRecurringPattern] = useState('weekly');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50 }}
    >
      <div 
        className="w-full max-w-4xl p-8"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', maxHeight: '90vh', overflow: 'auto' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>
              Create New Event
            </h2>
            <p style={{ color: '#2C3E50', marginTop: '8px' }}>
              Step 2: Schedule
            </p>
          </div>
          <button onClick={onClose} style={{ color: '#2C3E50' }}>
            <X size={24} />
          </button>
        </div>

        {/* Event Type Toggle */}
        <div className="mb-6">
          <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
            Event Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={eventType === 'single'}
                onChange={() => setEventType('single')}
                style={{ accentColor: '#779F8D' }}
              />
              <span style={{ color: '#2C3E50' }}>Single Event</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={eventType === 'multi'}
                onChange={() => setEventType('multi')}
                style={{ accentColor: '#779F8D' }}
              />
              <span style={{ color: '#2C3E50' }}>Multi-Shift</span>
            </label>
          </div>
        </div>

        {/* Recurring Pattern */}
        {eventType === 'multi' && (
          <div className="mb-6">
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
              Recurring Pattern
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={recurringPattern === 'weekly'}
                  onChange={() => setRecurringPattern('weekly')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>Weekly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={recurringPattern === 'monthly'}
                  onChange={() => setRecurringPattern('monthly')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>Monthly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={recurringPattern === 'custom'}
                  onChange={() => setRecurringPattern('custom')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>Custom</span>
              </label>
            </div>
          </div>
        )}

        {/* Weekly Grid Visualizer */}
        <div className="mb-6">
          <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
            Weekly Schedule Grid
          </h3>
          <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '16px' }}>
            Click and drag to create shifts on the calendar
          </p>

          <div 
            className="border overflow-x-auto"
            style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
          >
            <div className="inline-block min-w-full">
              {/* Header Row */}
              <div className="flex" style={{ borderBottom: '2px solid #E0E0E0' }}>
                <div 
                  className="w-20 p-3 flex-shrink-0"
                  style={{ backgroundColor: '#F5F7FA', fontWeight: 600, color: '#2C3E50' }}
                >
                  Time
                </div>
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="flex-1 p-3 text-center min-w-[100px]"
                    style={{ backgroundColor: '#F5F7FA', fontWeight: 600, color: '#2C3E50', borderLeft: '1px solid #E0E0E0' }}
                  >
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="flex" style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <div 
                    className="w-20 p-3 flex-shrink-0"
                    style={{ backgroundColor: '#F5F7FA', color: '#2C3E50', fontSize: '14px' }}
                  >
                    {time}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    // Friday 09:00-12:00 slot is selected
                    const isSelected = dayIndex === 4 && timeIndex >= 1 && timeIndex <= 3;
                    
                    return (
                      <div
                        key={`${day}-${time}`}
                        className="flex-1 p-3 min-w-[100px] cursor-pointer hover:bg-opacity-50 transition-colors relative"
                        style={{ 
                          backgroundColor: isSelected ? '#779F8D' : '#FFFFFF',
                          borderLeft: '1px solid #E0E0E0'
                        }}
                      >
                        {isSelected && timeIndex === 1 && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ 
                              backgroundColor: '#779F8D',
                              color: '#FFFFFF',
                              fontWeight: 600,
                              fontSize: '14px',
                              borderRadius: '4px',
                              margin: '4px'
                            }}
                          >
                            Driver (3)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: '#2C3E50', fontSize: '14px', marginTop: '12px', fontStyle: 'italic' }}>
            Selected: Friday 09:00-12:00 - Driver role (3 volunteers needed)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
