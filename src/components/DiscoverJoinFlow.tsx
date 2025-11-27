import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { CheckCircle2, Calendar, MapPin, Users, Clock, AlertCircle } from 'lucide-react';

export function DiscoverJoinFlow() {
  const [step, setStep] = useState<'finder' | 'detail' | 'single-join' | 'multi-select' | 'confirmation'>('finder');
  const [selectedEvent, setSelectedEvent] = useState<'beach' | 'food-delivery' | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>(['Oct 24']);

  const events = [
    {
      id: 'beach',
      title: 'Beach Cleanup',
      type: 'Single Event',
      date: 'Nov 12, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Main Beach',
      spotsLeft: 5,
      totalSpots: 20,
      skills: ['Environment'],
      description: 'Join us for a community beach cleanup to protect marine life and keep our beaches beautiful. We\'ll provide all necessary equipment and refreshments.',
      requirements: ['Physical fitness', 'Sun protection'],
      coordinator: 'Emma Wilson'
    },
    {
      id: 'food-delivery',
      title: 'Weekly Food Delivery',
      type: 'Multi-Shift',
      date: 'Multiple dates available',
      time: 'Flexible',
      location: 'Various locations',
      spotsLeft: 12,
      totalSpots: 15,
      skills: ['Driver', 'Food'],
      description: 'Help deliver meals to homebound seniors every week. Flexible schedule with multiple time slots available.',
      requirements: ['Valid driver\'s license', 'Reliable vehicle'],
      coordinator: 'Michael Chen'
    }
  ];

  const calendarSlots = [
    { date: 'Oct 24', time: '9:00 AM - 12:00 PM', available: true, selected: true, full: false },
    { date: 'Oct 31', time: '9:00 AM - 12:00 PM', available: false, conflict: 'Time Conflict', full: false },
    { date: 'Nov 7', time: '9:00 AM - 12:00 PM', available: true, selected: false, full: false },
    { date: 'Nov 14', time: '9:00 AM - 12:00 PM', available: true, selected: true, full: true },
    { date: 'Nov 21', time: '9:00 AM - 12:00 PM', available: true, selected: false, full: false },
    { date: 'Nov 28', time: '9:00 AM - 12:00 PM', available: true, selected: false, full: false }
  ];

  const toggleDate = (date: string, available: boolean) => {
    if (!available) return;
    setSelectedDates(prev =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Progress Indicator */}
      <div className="w-full bg-white border-b" style={{ borderColor: '#E0E0E0' }}>
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <div className="flex items-center justify-center gap-4">
            {['Browse', 'Event Detail', 'Select Dates', 'Confirmation'].map((label, index) => {
              const stepNames = ['finder', 'detail', 'multi-select', 'confirmation'];
              const currentIndex = stepNames.indexOf(step);
              const isActive = index === currentIndex || (step === 'single-join' && index === 2);
              const isCompleted = index < currentIndex;

              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-2"
                      style={{
                        backgroundColor: isActive || isCompleted ? '#779F8D' : '#E0E0E0',
                        borderRadius: '50%',
                        color: '#FFFFFF',
                        fontWeight: 600
                      }}
                    >
                      {isCompleted ? <CheckCircle2 size={20} /> : index + 1}
                    </div>
                    <span style={{ color: isActive ? '#2C3E50' : '#9E9E9E', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className="w-16 h-1 mb-6 mx-2"
                      style={{ backgroundColor: isCompleted ? '#779F8D' : '#E0E0E0' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {step === 'finder' && (
          <div>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
              Find Opportunities
            </h1>

            <div className="flex gap-6">
              {/* Filters Sidebar */}
              <aside className="w-72 p-6 h-fit" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '24px' }}>
                  Filters
                </h2>

                <div className="mb-6">
                  <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                    Skills
                  </h3>
                  <div className="space-y-2">
                    {['Driver', 'Server', 'Teacher', 'Medical'].map((skill) => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={skill === 'Driver'} readOnly style={{ accentColor: '#779F8D' }} />
                        <span style={{ color: '#2C3E50' }}>{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                    Interests
                  </h3>
                  <div className="space-y-2">
                    {['Environment', 'Food', 'Education', 'Health'].map((interest) => (
                      <label key={interest} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={interest === 'Food'} readOnly style={{ accentColor: '#779F8D' }} />
                        <span style={{ color: '#2C3E50' }}>{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Results Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-6">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-6"
                      style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                          {event.title}
                        </h3>
                        {event.type === 'Multi-Shift' && (
                          <Badge variant="success">Recurring</Badge>
                        )}
                      </div>

                      <p style={{ color: '#2C3E50', marginBottom: '16px', fontSize: '14px' }}>
                        {event.description.substring(0, 100)}...
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <Calendar size={16} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <Users size={16} />
                          <span>{event.spotsLeft} of {event.totalSpots} spots left</span>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => {
                          setSelectedEvent(event.id as 'beach' | 'food-delivery');
                          setStep('detail');
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'detail' && selectedEvent && (
          <div className="max-w-[800px] mx-auto">
            {(() => {
              const event = events.find(e => e.id === selectedEvent)!;
              return (
                <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
                        {event.title}
                      </h1>
                      {event.type === 'Multi-Shift' && (
                        <Badge variant="success">Recurring Event</Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>
                        Description
                      </h3>
                      <p style={{ color: '#2C3E50', lineHeight: '1.6' }}>
                        {event.description}
                      </p>
                    </div>

                    <div>
                      <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>
                        Event Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                          <Calendar size={20} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                          <Clock size={20} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                          <MapPin size={20} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                          <Users size={20} />
                          <span>{event.spotsLeft} of {event.totalSpots} spots available</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {event.requirements.map((req) => (
                          <li key={req} style={{ color: '#2C3E50' }}>
                            • {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>
                        Skills Needed
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1"
                            style={{
                              backgroundColor: '#F0F7F4',
                              color: '#2C3E50',
                              borderRadius: '4px',
                              fontWeight: 500
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
                      <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                        <strong>Coordinator:</strong> {event.coordinator}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setStep('finder')} className="flex-1">
                      Back to Search
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setStep(event.type === 'Multi-Shift' ? 'multi-select' : 'single-join')}
                      className="flex-1"
                    >
                      {event.type === 'Multi-Shift' ? 'Select Dates' : 'Join Event'}
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {step === 'single-join' && (
          <div className="max-w-[600px] mx-auto">
            <div className="p-8 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
              <div
                className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
              >
                <CheckCircle2 size={48} color="#FFFFFF" />
              </div>

              <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '16px' }}>
                You're Registered!
              </h1>
              <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
                You've successfully registered for Beach Cleanup
              </p>

              <div className="p-6 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                <div style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '16px' }}>
                  Event Summary:
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                    <Calendar size={20} />
                    <span>Nov 12, 2025</span>
                  </div>
                  <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                    <Clock size={20} />
                    <span>9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                    <MapPin size={20} />
                    <span>Main Beach</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">
                  Add to Calendar
                </Button>
                <Button variant="secondary" onClick={() => setStep('finder')} className="flex-1">
                  Browse More Events
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 'multi-select' && (
          <div className="max-w-[900px] mx-auto">
            <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
              <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
                Select Dates - Weekly Food Delivery
              </h1>
              <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
                Choose the dates you're available to volunteer. You can select multiple dates.
              </p>

              {/* Calendar Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {calendarSlots.map((slot) => {
                  const isSelected = selectedDates.includes(slot.date);
                  
                  return (
                    <button
                      key={slot.date}
                      onClick={() => toggleDate(slot.date, slot.available)}
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
                          <CheckCircle2 size={16} color="#FFFFFF" />
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

                      {!slot.available && slot.conflict && (
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

                      {slot.full && isSelected && (
                        <div
                          className="mt-2 px-2 py-1"
                          style={{
                            backgroundColor: '#FFB74D',
                            color: '#FFFFFF',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}
                        >
                          Waitlist
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
                  <Button variant="secondary" onClick={() => setStep('detail')}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setStep('confirmation')}
                    disabled={selectedDates.length === 0}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="max-w-[600px] mx-auto">
            <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center"
                  style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
                >
                  <CheckCircle2 size={28} color="#FFFFFF" />
                </div>
                <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px' }}>
                  Registration Complete
                </h1>
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
                <Button variant="primary" className="flex-1">
                  Add to Calendar
                </Button>
                <Button variant="secondary" onClick={() => setStep('finder')} className="flex-1">
                  Browse More Events
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
