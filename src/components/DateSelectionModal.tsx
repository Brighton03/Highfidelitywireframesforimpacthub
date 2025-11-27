import { useState } from 'react';
import { Button } from './Button';
import { X, Check, AlertCircle } from 'lucide-react';

interface DateSelectionModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function DateSelectionModal({ onClose, onConfirm }: DateSelectionModalProps) {
  const [selectedDates, setSelectedDates] = useState<string[]>(['Oct 24']);

  const calendarSlots = [
    { date: 'Oct 24', time: '9:00 AM - 12:00 PM', available: true, selected: true },
    { date: 'Oct 31', time: '9:00 AM - 12:00 PM', available: false, conflict: 'Time Conflict' },
    { date: 'Nov 7', time: '9:00 AM - 12:00 PM', available: true, selected: false },
    { date: 'Nov 14', time: '9:00 AM - 12:00 PM', available: true, selected: false },
    { date: 'Nov 21', time: '9:00 AM - 12:00 PM', available: true, selected: false },
    { date: 'Nov 28', time: '9:00 AM - 12:00 PM', available: true, selected: false }
  ];

  const toggleDate = (date: string) => {
    setSelectedDates(prev =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 50 }}
    >
      <div 
        className="w-full max-w-3xl p-8"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', maxHeight: '90vh', overflow: 'auto' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>
            Select Dates - Weekly Food Delivery
          </h2>
          <button onClick={onClose} style={{ color: '#2C3E50' }}>
            <X size={24} />
          </button>
        </div>

        <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
          Select the dates you're available to volunteer. You can choose multiple dates.
        </p>

        {/* Calendar Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {calendarSlots.map((slot) => {
            const isSelected = selectedDates.includes(slot.date);
            
            return (
              <button
                key={slot.date}
                onClick={() => slot.available && toggleDate(slot.date)}
                disabled={!slot.available}
                className="p-4 border-2 transition-all relative"
                style={{
                  borderColor: isSelected ? '#779F8D' : (slot.available ? '#E0E0E0' : '#CFD8DC'),
                  backgroundColor: slot.available ? (isSelected ? '#F0F7F4' : '#FFFFFF') : '#F5F7FA',
                  borderRadius: '8px',
                  cursor: slot.available ? 'pointer' : 'not-allowed',
                  opacity: slot.available ? 1 : 0.6
                }}
              >
                {isSelected && (
                  <div 
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center"
                    style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
                  >
                    <Check size={16} color="#FFFFFF" />
                  </div>
                )}

                {!slot.available && (
                  <div 
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center"
                    style={{ backgroundColor: '#E57373', borderRadius: '50%' }}
                  >
                    <AlertCircle size={16} color="#FFFFFF" />
                  </div>
                )}

                <div style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '8px' }}>
                  {slot.date}
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  {slot.time}
                </div>

                {!slot.available && (
                  <div 
                    className="mt-2 px-2 py-1"
                    style={{ 
                      backgroundColor: '#E57373',
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  >
                    {slot.conflict}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Bar */}
        <div 
          className="flex items-center justify-between p-4 -mx-8 -mb-8"
          style={{ backgroundColor: '#F5F7FA', borderRadius: '0 0 8px 8px' }}
        >
          <div style={{ color: '#2C3E50', fontWeight: 600 }}>
            {selectedDates.length} {selectedDates.length === 1 ? 'Slot' : 'Slots'} Selected
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={onConfirm}
              disabled={selectedDates.length === 0}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
