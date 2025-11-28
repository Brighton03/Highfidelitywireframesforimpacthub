import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, Edit2, Trash2 } from 'lucide-react';
import { TopNavigation } from './TopNavigation';

interface VolunteerScheduleProps {
  onNavigate: (item: string) => void;
  onLogout?: () => void;
}

export function VolunteerSchedule({ onNavigate, onLogout }: VolunteerScheduleProps) {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const upcoming = [
    { id: 1, title: 'Food Pantry', date: 'Nov 30, 2025', time: '9:00 AM - 12:00 PM', location: 'Community Center', status: 'confirmed' },
    { id: 2, title: 'Beach Cleanup', date: 'Dec 2, 2025', time: '2:00 PM - 5:00 PM', location: 'Main Beach', status: 'confirmed' },
    { id: 3, title: 'Senior Center Visit', date: 'Dec 6, 2025', time: '10:00 AM - 1:00 PM', location: 'Sunrise Senior Center', status: 'waitlist' }
  ];

  // Coordinator-defined reschedule options per event
  const rescheduleOptions: Record<number, string[]> = {
    1: [
      'Fri Dec 6 • 9:00 AM - 12:00 PM (Community Center)',
      'Sat Dec 7 • 1:00 PM - 4:00 PM (Community Center)'
    ],
    2: [
      'Sun Dec 8 • 8:00 AM - 11:00 AM (Main Beach)',
      'Sun Dec 15 • 8:00 AM - 11:00 AM (Main Beach)'
    ],
    3: [
      'Mon Dec 9 • 10:00 AM - 1:00 PM (Sunrise Senior Center)'
    ]
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNavigation activeItem="My Schedule" onNavigate={onNavigate} onLogout={onLogout} />
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '40px', marginBottom: '8px' }}>My Schedule</h1>
        <p style={{ color: '#2C3E50', fontSize: '18px', opacity: 0.8, marginBottom: '32px' }}>Upcoming confirmed and waitlisted shifts</p>
        <div className="grid grid-cols-3 gap-6">
          {upcoming.map(item => (
            <div 
              key={item.id} 
              className="p-6 shadow transition-all cursor-pointer hover:shadow-xl"
              style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              onClick={() => setSelectedEvent(item.id)}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>{item.title}</h3>
              <div className="space-y-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                <div className="flex items-center gap-2"><Calendar size={16} /> {item.date}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> {item.time}</div>
                <div className="flex items-center gap-2"><MapPin size={16} /> {item.location}</div>
              </div>
              <div className="mt-4 flex items-center gap-2" style={{ fontSize: '12px', fontWeight: 600, color: item.status === 'confirmed' ? '#81C784' : '#FFB74D' }}>
                <CheckCircle2 size={14} /> {item.status === 'confirmed' ? 'Confirmed' : 'Waitlist'}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRescheduleModal(true);
                    setSelectedEvent(item.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 transition-colors"
                  style={{ backgroundColor: '#779F8D', color: '#FFFFFF', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  <Edit2 size={16} /> Reschedule
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to withdraw from this event?')) {
                      // Handle delete
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 transition-colors"
                  style={{ backgroundColor: '#E57373', color: '#FFFFFF', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  <Trash2 size={16} /> Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reschedule Modal with coordinator-defined options */}
      {showRescheduleModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}
          onClick={() => setShowRescheduleModal(false)}
        >
          <div 
            className="p-8"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', maxWidth: '500px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '16px' }}>Reschedule Event</h2>
            <p style={{ color: '#2C3E50', marginBottom: '16px' }}>Choose from available options provided by the coordinator.</p>
            <div className="space-y-2 mb-6">
              {(selectedEvent ? (rescheduleOptions[selectedEvent] || []) : []).map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 p-3 border cursor-pointer"
                  style={{ borderColor: selectedOption === opt ? '#779F8D' : '#E0E0E0', borderRadius: '8px', backgroundColor: selectedOption === opt ? '#F0F7F4' : '#FFFFFF' }}
                >
                  <input
                    type="radio"
                    checked={selectedOption === opt}
                    onChange={() => setSelectedOption(opt)}
                    style={{ accentColor: '#779F8D' }}
                  />
                  <span style={{ color: '#2C3E50', fontSize: '14px' }}>{opt}</span>
                </label>
              ))}
              {selectedEvent && (rescheduleOptions[selectedEvent] || []).length === 0 && (
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>No alternative options available.</div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 py-3"
                style={{ backgroundColor: '#E0E0E0', color: '#2C3E50', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, submit selectedOption to backend
                  setShowRescheduleModal(false);
                  setSelectedOption('');
                }}
                className="flex-1 py-3"
                style={{ backgroundColor: '#779F8D', color: '#FFFFFF', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
