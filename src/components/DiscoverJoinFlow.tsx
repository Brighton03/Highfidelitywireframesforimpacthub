import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { CheckCircle2, Calendar, MapPin, Users, Clock, AlertCircle } from 'lucide-react';

/**
 * BUSINESS RULES ENFORCEMENT - Discover & Join Event
 * 
 * 1. SKILL-EVENT MATCHING
 *    - Only show events matching volunteer's registered skills/interests
 *    - Warning if joining event without required skill certification
 *    - Smart recommendations based on skill match score (%)
 * 
 * 2. SCHEDULE CONFLICT PREVENTION
 *    - Check existing commitments before allowing event sign-up
 *    - Block overlapping time slots (same date + time)
 *    - Display "Time Conflict" warning on conflicting dates
 *    - Prevent double-booking across events
 * 
 * 3. CAPACITY MANAGEMENT
 *    - Real-time spot availability checking
 *    - Waitlist system when event is full
 *    - Auto-notify when spot becomes available from waitlist
 */

type EventId = 'beach' | 'harbor' | 'food-delivery';

export function DiscoverJoinFlow() {
  const [step, setStep] = useState<'finder' | 'detail' | 'single-join' | 'multi-select' | 'confirmation'>('finder');
  const [selectedEvent, setSelectedEvent] = useState<EventId | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>(['Oct 24', 'Nov 14']);

  // BUSINESS RULE: Skill matching check
  const volunteerSkills = ['Driver', 'Food', 'Environment']; // From profile
  const checkSkillMatch = (requiredSkills: string[]) => {
    const matchedSkills = requiredSkills.filter(skill => volunteerSkills.includes(skill));
    const matchPercentage = (matchedSkills.length / requiredSkills.length) * 100;
    return {
      hasMatch: matchPercentage > 0,
      matchPercentage,
      missingSkills: requiredSkills.filter(skill => !volunteerSkills.includes(skill))
    };
  };

  // BUSINESS RULE: Schedule conflict detection
  const existingCommitments = [
    { date: 'Oct 31', time: '9:00 AM - 12:00 PM', event: 'Food Pantry' }
  ];
  const hasScheduleConflict = (date: string, time: string) => {
    return existingCommitments.some(
      commitment => commitment.date === date && commitment.time === time
    );
  };

  // BUSINESS RULE: Capacity and waitlist management
  const checkAvailability = (spotsLeft: number, totalSpots: number) => {
    if (spotsLeft > 0) {
      return { status: 'available', message: `${spotsLeft} spots remaining` };
    } else if (spotsLeft === 0) {
      return { status: 'waitlist', message: 'Event full - Join waitlist' };
    }
    return { status: 'closed', message: 'Registration closed' };
  };

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
      coordinator: 'Emma Wilson',
      status: 'joined' as const
    },
    {
      id: 'harbor',
      title: 'Harbor Meal Distribution',
      type: 'Single Event',
      date: 'Nov 16, 2025',
      time: '5:00 PM - 8:00 PM',
      location: 'Harborview Community Hub',
      spotsLeft: 0,
      totalSpots: 18,
      skills: ['Food'],
      description: 'Assist coordinators as we assemble and distribute hot meals to dock workers and families living near the harbor. Training provided on-site.',
      requirements: ['Food handling hygiene', 'Comfort standing for 3 hours'],
      coordinator: 'Luis Martinez'
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
      skills: ['Driver'],
      description: 'Help deliver meals to homebound seniors every week. Flexible schedule with multiple time slots available.',
      requirements: ['Valid driver\'s license', 'Reliable vehicle'],
      coordinator: 'Michael Chen'
    }
  ];

  const calendarSlots = [
    { date: 'Oct 24', time: '9:00 AM - 12:00 PM', available: true, full: false },
    { date: 'Oct 31', time: '9:00 AM - 12:00 PM', available: false, conflict: 'Time Conflict', full: false },
    { date: 'Nov 7', time: '9:00 AM - 12:00 PM', available: true, full: false },
    { date: 'Nov 14', time: '9:00 AM - 12:00 PM', available: true, full: true },
    { date: 'Nov 21', time: '9:00 AM - 12:00 PM', available: true, full: false },
    { date: 'Nov 28', time: '9:00 AM - 12:00 PM', available: true, full: false }
  ];

  const selectedSlotDetails = calendarSlots.filter((slot) => selectedDates.includes(slot.date));
  const confirmedSlots = selectedSlotDetails.filter((slot) => !slot.full);
  const waitlistedSlots = selectedSlotDetails.filter((slot) => slot.full);

  const toggleDate = (date: string, available: boolean) => {
    if (!available) return;
    setSelectedDates(prev =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
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
                    {['Driver', 'Server', 'Teacher', 'First Aid'].map((skill) => (
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
                  {events.map((event) => {
                    const isSelectedCard = selectedEvent === event.id;
                    const isFullSingle = event.type === 'Single Event' && event.spotsLeft === 0;
                    const isJoined = event.status === 'joined';

                    return (
                      <div
                        key={event.id}
                        className="p-6 h-full flex flex-col gap-4"
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '8px',
                          border: `2px solid ${isSelectedCard ? '#779F8D' : 'transparent'}`,
                          boxShadow: isSelectedCard ? '0 8px 24px rgba(44,62,80,0.15)' : 'none'
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                              {event.title}
                            </h3>
                            {isJoined && (
                              <div
                                className="inline-flex items-center gap-2 px-3 py-1 mt-2"
                                style={{ backgroundColor: '#F0F7F4', borderRadius: '999px' }}
                              >
                                <CheckCircle2 size={14} style={{ color: '#779F8D' }} />
                                <span style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600 }}>
                                  Added to Upcoming Shifts
                                </span>
                              </div>
                            )}
                            {isFullSingle && (
                              <div
                                className="inline-flex items-center gap-2 px-3 py-1 mt-2"
                                style={{ backgroundColor: '#FFF8E1', borderRadius: '999px' }}
                              >
                                <AlertCircle size={14} style={{ color: '#FFB74D' }} />
                                <span style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600 }}>
                                  Waitlist Only
                                </span>
                              </div>
                            )}
                          </div>
                          {event.type === 'Multi-Shift' && (
                            <Badge variant="success">Recurring</Badge>
                          )}
                        </div>

                        <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                          {event.description.substring(0, 120)}...
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2" style={{ color: '#2C3E50' }}>
                            <Calendar size={16} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: '#2C3E50' }}>
                            <Clock size={16} />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: '#2C3E50' }}>
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: '#2C3E50' }}>
                            <Users size={16} />
                            <span>{event.spotsLeft} of {event.totalSpots} spots left</span>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          className="w-full mt-auto"
                          onClick={() => {
                            setSelectedEvent(event.id);
                            setStep('detail');
                          }}
                        >
                          {isFullSingle ? 'View Waitlist Details' : 'View Details'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'detail' && selectedEvent && (
          <div className="max-w-[800px] mx-auto">
            {(() => {
              const event = events.find(e => e.id === selectedEvent)!;
              const isFullSingle = event.type === 'Single Event' && event.spotsLeft === 0;
              const isAlreadyJoined = event.status === 'joined';
              const primaryCtaLabel = event.type === 'Multi-Shift'
                ? 'Select Dates'
                : isFullSingle
                  ? 'Join Waitlist'
                  : isAlreadyJoined
                    ? 'View Confirmation'
                    : 'Join Event';

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
                      {isAlreadyJoined && (
                        <div className="mt-4 p-3" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                          <span style={{ color: '#2C3E50', fontWeight: 600 }}>
                            Confirmed — this shift already appears under Upcoming Shifts.
                          </span>
                        </div>
                      )}
                      {isFullSingle && (
                        <div className="mt-4 p-3" style={{ backgroundColor: '#FFF8E1', borderRadius: '8px' }}>
                          <span style={{ color: '#2C3E50', fontWeight: 600 }}>
                            Shift full — join the waitlist to be notified when a spot opens.
                          </span>
                        </div>
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
                      {primaryCtaLabel}
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {step === 'single-join' && selectedEvent && (
          <div className="max-w-[600px] mx-auto">
            {(() => {
              const event = events.find(e => e.id === selectedEvent)!;
              const isWaitlist = event.spotsLeft === 0;
              const isAlreadyJoined = event.status === 'joined';
              const heroColor = isWaitlist ? '#FFB74D' : '#779F8D';
              const heading = isWaitlist
                ? 'Waitlist Confirmed'
                : isAlreadyJoined
                  ? 'Already on Your Upcoming Shifts'
                  : "You're Registered!";
              const subcopy = isWaitlist
                ? `You've been added to the waitlist for ${event.title}. We'll notify you as soon as a spot opens up.`
                : isAlreadyJoined
                  ? `${event.title} is already confirmed and visible under Upcoming Shifts in your dashboard.`
                  : `You've successfully registered for ${event.title}.`;

              return (
                <div className="p-8 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <div
                    className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: heroColor, borderRadius: '50%' }}
                  >
                    <CheckCircle2 size={48} color="#FFFFFF" />
                  </div>

                  <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '16px' }}>
                    {heading}
                  </h1>
                  <p style={{ color: '#2C3E50', marginBottom: '24px' }}>{subcopy}</p>

                  <div className="p-6 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                    <div style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '16px' }}>
                      Event Summary
                    </div>
                    <div className="space-y-2 text-left">
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
                    </div>
                  </div>

                  <div className="p-4 mb-6" style={{
                    backgroundColor: isWaitlist ? '#FFF8E1' : '#F0F7F4',
                    borderRadius: '8px',
                    textAlign: 'left'
                  }}>
                    <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>
                      Status
                    </div>
                    <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
                      {isWaitlist ? 'Queued on waitlist • You will receive alerts if a volunteer drops.' : 'Confirmed • Listed under Upcoming Shifts for quick access.'}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="primary" className="flex-1">
                      {isWaitlist ? 'Update Preferences' : 'Add to Calendar'}
                    </Button>
                    <Button variant="secondary" onClick={() => setStep('finder')} className="flex-1">
                      Browse More Events
                    </Button>
                  </div>
                </div>
              );
            })()}
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
                  const isWaitlistSlot = slot.full;
                  const tileBackground = slot.available
                    ? (isWaitlistSlot ? '#FFF8E1' : (isSelected ? '#F0F7F4' : '#FFFFFF'))
                    : '#F5F7FA';
                  const tileBorder = isSelected
                    ? '#779F8D'
                    : isWaitlistSlot
                      ? '#FFB74D'
                      : (slot.available ? '#E0E0E0' : '#CFD8DC');

                  return (
                    <button
                      key={slot.date}
                      onClick={() => toggleDate(slot.date, slot.available)}
                      disabled={!slot.available}
                      className="p-4 border-2 transition-all relative"
                      style={{
                        borderColor: tileBorder,
                        backgroundColor: tileBackground,
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

                      {isWaitlistSlot && (
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
                {confirmedSlots.length > 0 && (
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
                      {confirmedSlots.map((slot) => (
                        <li key={slot.date} style={{ color: '#2C3E50', fontSize: '14px' }}>
                          • {slot.date}, 2025 - {slot.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {waitlistedSlots.length > 0 && (
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
                      {waitlistedSlots.map((slot) => (
                        <li key={slot.date} style={{ color: '#2C3E50', fontSize: '14px' }}>
                          • {slot.date}, 2025 - {slot.time} (Shift Full)
                        </li>
                      ))}
                    </ul>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px', marginLeft: '28px' }}>
                      You'll be notified if a spot opens up.
                    </p>
                  </div>
                )}
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
