import { useState } from 'react';
import { Button } from './Button';
import { X, Check, AlertCircle, AlertTriangle } from 'lucide-react';

export interface SelectedSlotSummary {
  id: string;
  date: string;
  time: string;
  result: 'confirmed' | 'waitlist';
}

interface DateSelectionModalProps {
  onClose: () => void;
  onConfirm: (slots: SelectedSlotSummary[]) => void;
  eventTitle: string;
  initialSelections?: SelectedSlotSummary[];
}

type CalendarSlot = {
  id: string;
  date: string;
  time: string;
  status: 'open' | 'full' | 'conflict' | 'locked';
  conflict?: string;
};

const calendarSlots: CalendarSlot[] = [
  { id: 'oct-24', date: 'Oct 24', time: '9:00 AM - 12:00 PM', status: 'open' },
  { id: 'oct-31', date: 'Oct 31', time: '9:00 AM - 12:00 PM', status: 'conflict', conflict: 'Time Conflict' },
  { id: 'nov-7', date: 'Nov 7', time: '9:00 AM - 12:00 PM', status: 'open' },
  { id: 'nov-12', date: 'Nov 12', time: '9:00 AM - 12:00 PM', status: 'locked' },
  { id: 'nov-14', date: 'Nov 14', time: '9:00 AM - 12:00 PM', status: 'full' },
  { id: 'nov-19', date: 'Nov 19', time: '9:00 AM - 12:00 PM', status: 'locked' },
  { id: 'nov-21', date: 'Nov 21', time: '9:00 AM - 12:00 PM', status: 'open' },
  { id: 'nov-28', date: 'Nov 28', time: '9:00 AM - 12:00 PM', status: 'open' }
];

export function DateSelectionModal({ onClose, onConfirm, eventTitle, initialSelections }: DateSelectionModalProps) {
  const showPreScheduled = eventTitle.toLowerCase().includes('neighborhood garden hub');
  const [selectedMap, setSelectedMap] = useState<Record<string, 'confirmed' | 'waitlist'>>(() => {
    if (initialSelections && initialSelections.length > 0) {
      return initialSelections.reduce<Record<string, 'confirmed' | 'waitlist'>>((acc, slot) => {
        acc[slot.id] = slot.result;
        return acc;
      }, {});
    }
    return {};
  });

  const toggleSlot = (slot: CalendarSlot) => {
    const isLockedSlot = slot.status === 'locked' && showPreScheduled;
    if (slot.status === 'conflict' || isLockedSlot) return;
    setSelectedMap((prev) => {
      const next = { ...prev };
      if (next[slot.id]) {
        delete next[slot.id];
      } else {
        next[slot.id] = slot.status === 'full' ? 'waitlist' : 'confirmed';
      }
      return next;
    });
  };

  const selectedSlots = Object.keys(selectedMap).map((slotId) => {
    const slot = calendarSlots.find((entry) => entry.id === slotId);
    if (!slot) return null;
    return {
      id: slot.id,
      date: slot.date,
      time: slot.time,
      result: selectedMap[slotId]
    } as SelectedSlotSummary;
  }).filter(Boolean) as SelectedSlotSummary[];

  const lockedSlotIds = showPreScheduled
    ? new Set<string>(calendarSlots.filter((slot) => slot.status === 'locked').map((slot) => slot.id))
    : new Set<string>();
  const userSelectedSlots = selectedSlots.filter((slot) => !lockedSlotIds.has(slot.id));
  const scheduledSlotCount = selectedSlots.length - userSelectedSlots.length;
  const waitlistCount = userSelectedSlots.filter((slot) => slot.result === 'waitlist').length;

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
            Select Dates — {eventTitle}
          </h2>
          <button onClick={onClose} style={{ color: '#2C3E50' }} aria-label="Close date selection">
            <X size={24} />
          </button>
        </div>

        <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
          Select the dates you're available to volunteer. You can choose multiple dates.
        </p>

        {/* Calendar Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {calendarSlots.map((slot) => {
            const selectionState = selectedMap[slot.id];
            const isLocked = lockedSlotIds.has(slot.id);
            const resolvedStatus = isLocked ? 'locked' : slot.status === 'locked' ? 'open' : slot.status;
            const isWaitlistSelected = selectionState === 'waitlist';
            const isFull = resolvedStatus === 'full';
            const isConflict = resolvedStatus === 'conflict';
            const isDisabled = isConflict || isLocked;
            const isUserConfirmed = selectionState === 'confirmed' && !isLocked;
            const showScheduledState = isLocked;
            const borderColor = showScheduledState
              ? '#3E6A51'
              : isUserConfirmed
                ? '#94B5A3'
                : isWaitlistSelected
                  ? '#FFB74D'
                  : isConflict
                    ? '#CFD8DC'
                    : '#E0E0E0';
            const backgroundColor = showScheduledState
              ? '#C3E2D2'
              : isUserConfirmed
                ? '#F0F7F4'
                : isWaitlistSelected
                  ? '#FFF8E1'
                  : isConflict
                    ? '#F5F7FA'
                    : '#FFFFFF';
            const showWaitlistRow = isFull || isWaitlistSelected;
            const waitlistRowStyles = {
              backgroundColor: isWaitlistSelected ? '#FFF8E1' : '#FFFFFF',
              border: `1px solid ${isWaitlistSelected ? '#FFB74D' : '#E0E0E0'}`,
              borderRadius: '6px',
              marginTop: '18px'
            };
            const waitlistIconStyles = {
              backgroundColor: isWaitlistSelected ? '#FFB74D' : '#FFFFFF',
              border: `1px solid ${isWaitlistSelected ? '#FFB74D' : '#E0E0E0'}`,
              borderRadius: '999px',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            } as const;

            return (
              <button
                key={slot.id}
                onClick={() => toggleSlot(slot)}
                disabled={isDisabled}
                className="p-4 border-2 transition-all relative text-left"
                style={{
                  borderColor,
                  backgroundColor,
                  borderRadius: '10px',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isConflict ? 0.6 : 1
                }}
              >
                {(showScheduledState || isUserConfirmed) && (
                  <div 
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center"
                    style={{ backgroundColor: showScheduledState ? '#779F8D' : '#94B5A3', borderRadius: '50%' }}
                  >
                    <Check size={16} color="#FFFFFF" />
                  </div>
                )}

                {isConflict && (
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

                {(showScheduledState || isUserConfirmed) && (
                  <div className="mt-2 flex items-center gap-2" style={{ color: showScheduledState ? '#4C6B5A' : '#4F7C68', fontSize: '12px', fontWeight: 600 }}>
                    <Check size={14} color={showScheduledState ? '#4C6B5A' : '#4F7C68'} />
                    {showScheduledState ? 'Scheduled' : 'Selected'}
                  </div>
                )}

                {showWaitlistRow && (
                  <div className="mt-3 flex items-center justify-between px-3 py-2" style={waitlistRowStyles}>
                    <div style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600 }}>Waitlist</div>
                    <div style={waitlistIconStyles}>
                      <AlertTriangle size={14} color={isWaitlistSelected ? '#FFFFFF' : '#FFB74D'} strokeWidth={isWaitlistSelected ? 2 : 1.5} />
                    </div>
                  </div>
                )}

                {isConflict && (
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
            {userSelectedSlots.length} {userSelectedSlots.length === 1 ? 'Slot' : 'Slots'} selected
            {scheduledSlotCount > 0 && (
              <span style={{ marginLeft: '8px', color: '#4C6B5A', fontSize: '14px' }}>
                • {scheduledSlotCount} scheduled
              </span>
            )}
            {waitlistCount > 0 && (
              <span style={{ marginLeft: '8px', color: '#FFB74D', fontSize: '14px' }}>
                • {waitlistCount} waitlist
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={() => onConfirm(selectedSlots)}
              disabled={userSelectedSlots.length === 0}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
