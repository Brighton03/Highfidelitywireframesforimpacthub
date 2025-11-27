import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { ArrowRight, CheckCircle2, Calendar, MapPin, Users, Clock, Target } from 'lucide-react';

export function CreateEventFlow() {
  const [step, setStep] = useState<'create' | 'title-description' | 'single-multi' | 'schedule' | 'uniform-roster' | 'matches' | 'publish'>('create');
  const [eventType, setEventType] = useState<'single' | 'recurring'>('recurring');
  const [recurringPattern, setRecurringPattern] = useState<'weekly' | 'manual'>('weekly');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Progress Indicator */}
      <div className="w-full bg-white border-b" style={{ borderColor: '#E0E0E0' }}>
        <div className="max-w-[1200px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {['Create', 'Details', 'Type', 'Schedule', 'Roster', 'Matches', 'Publish'].map((label, index) => {
              const stepNames = ['create', 'title-description', 'single-multi', 'schedule', 'uniform-roster', 'matches', 'publish'];
              const currentIndex = stepNames.indexOf(step);
              const isActive = index === currentIndex;
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
                    <span style={{ color: isActive ? '#2C3E50' : '#9E9E9E', fontSize: '12px', fontWeight: isActive ? 600 : 400 }}>
                      {label}
                    </span>
                  </div>
                  {index < 6 && (
                    <div
                      className="w-12 h-1 mb-6 mx-1"
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
      <div className="max-w-[900px] mx-auto px-8 py-12">
        {step === 'create' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Create New Event
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Start by deciding what type of event you want to create
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div
                className="p-6 border-2 cursor-pointer transition-all"
                style={{ borderColor: '#779F8D', borderRadius: '8px', backgroundColor: '#F0F7F4' }}
              >
                <Calendar size={32} style={{ color: '#779F8D', marginBottom: '16px' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                  Single Event
                </h3>
                <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                  One-time opportunity with a single date and time
                </p>
              </div>

              <div
                className="p-6 border-2 cursor-pointer transition-all"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
              >
                <Calendar size={32} style={{ color: '#2C3E50', marginBottom: '16px' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                  Recurring Event
                </h3>
                <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Multiple shifts with repeated schedules
                </p>
              </div>
            </div>

            <Button variant="primary" onClick={() => setStep('title-description')} className="w-full mt-8">
              Continue
            </Button>
          </div>
        )}

        {step === 'title-description' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Event Details
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Provide basic information about your event
            </p>

            <div className="space-y-6">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Weekly Food Delivery"
                  className="w-full px-4 py-3 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe what volunteers will be doing..."
                  rows={4}
                  className="w-full px-4 py-3 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Location
                </label>
                <div className="relative">
                  <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="text"
                    placeholder="Event location address"
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

              <Button variant="primary" onClick={() => setStep('single-multi')} className="w-full mt-6">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'single-multi' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Configure Event Type
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Choose if this is a one-time event or has multiple shifts
            </p>

            <div className="space-y-6">
              <div>
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
                    <span style={{ color: '#2C3E50' }}>Single Shift</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={eventType === 'recurring'}
                      onChange={() => setEventType('recurring')}
                      style={{ accentColor: '#779F8D' }}
                    />
                    <span style={{ color: '#2C3E50' }}>Multi-Shift (Recurring)</span>
                  </label>
                </div>
              </div>

              {eventType === 'recurring' && (
                <div>
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
                        checked={recurringPattern === 'manual'}
                        onChange={() => setRecurringPattern('manual')}
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50' }}>Select Specific Dates</span>
                    </label>
                  </div>
                </div>
              )}

              <Button variant="primary" onClick={() => setStep('schedule')} className="w-full mt-6">
                Continue to Schedule
              </Button>
            </div>
          </div>
        )}

        {step === 'schedule' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Schedule Shifts
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
              Set up your event schedule using the weekly grid
            </p>

            <div className="border overflow-x-auto mb-6" style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}>
              <div className="inline-block min-w-full">
                {/* Header Row */}
                <div className="flex" style={{ borderBottom: '2px solid #E0E0E0' }}>
                  <div className="w-20 p-3 flex-shrink-0" style={{ backgroundColor: '#F5F7FA', fontWeight: 600, color: '#2C3E50' }}>
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
                    <div className="w-20 p-3 flex-shrink-0" style={{ backgroundColor: '#F5F7FA', color: '#2C3E50', fontSize: '14px' }}>
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
                          {isSelected && timeIndex === 2 && (
                            <div 
                              className="absolute inset-0 flex flex-col items-center justify-center"
                              style={{ 
                                backgroundColor: '#779F8D',
                                color: '#FFFFFF',
                                fontWeight: 600,
                                fontSize: '12px',
                                borderRadius: '4px',
                                margin: '4px',
                                padding: '4px'
                              }}
                            >
                              <div>Driver</div>
                              <div>(3)</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
              <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>
                Selected Shift:
              </div>
              <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                Friday, 09:00 - 12:00 • Role: Driver • 3 volunteers needed
              </div>
            </div>

            <Button variant="primary" onClick={() => setStep('uniform-roster')} className="w-full">
              Continue to Roster Setup
            </Button>
          </div>
        )}

        {step === 'uniform-roster' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Uniform Roster Setup
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Define roles and volunteer requirements
            </p>

            <div className="space-y-6">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Role Name
                </label>
                <input
                  type="text"
                  defaultValue="Driver"
                  className="w-full px-4 py-3 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Number of Volunteers Needed
                </label>
                <input
                  type="number"
                  defaultValue="3"
                  min="1"
                  className="w-full px-4 py-3 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                  Required Skills
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Driver', 'Server', 'Teacher', 'Medical'].map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-2 p-3 border cursor-pointer"
                      style={{
                        borderColor: skill === 'Driver' ? '#779F8D' : '#E0E0E0',
                        backgroundColor: skill === 'Driver' ? '#F0F7F4' : '#FFFFFF',
                        borderRadius: '8px'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={skill === 'Driver'}
                        readOnly
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50' }}>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="primary" onClick={() => setStep('matches')} className="w-full mt-6">
                Find Matches
              </Button>
            </div>
          </div>
        )}

        {step === 'matches' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Smart Recruitment Scan
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
              We've found volunteers that match your event requirements
            </p>

            <div className="p-6 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px solid #779F8D' }}>
              <div className="text-center mb-6">
                <div style={{ color: '#779F8D', fontSize: '64px', fontWeight: 700, marginBottom: '8px' }}>
                  15
                </div>
                <div style={{ color: '#2C3E50', fontSize: '20px', fontWeight: 600 }}>
                  High-Confidence Matches
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px' }}>
                  Based on Skills + Availability
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <Target size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
                  <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                    15
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    Skills Match
                  </div>
                </div>

                <div className="p-4 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <Clock size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
                  <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                    12
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    Available
                  </div>
                </div>

                <div className="p-4 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <Users size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
                  <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
                    8
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    Active Status
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 mb-6" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                Top Matches Include:
              </h3>
              <ul className="space-y-2">
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                  • 8 volunteers with "Driver" skill and Friday availability
                </li>
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                  • 4 volunteers who previously participated in similar events
                </li>
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                  • 3 volunteers within 5 miles of event location
                </li>
              </ul>
            </div>

            <Button variant="primary" onClick={() => setStep('publish')} className="w-full">
              Continue to Publish
            </Button>
          </div>
        )}

        {step === 'publish' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Publish Event
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Choose how you want to publish and promote this event
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-6 border-2 cursor-pointer" style={{ borderColor: '#779F8D', backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                    Publish & Send Direct Invites
                  </h3>
                  <input type="radio" checked readOnly style={{ accentColor: '#779F8D' }} />
                </div>
                <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Event will be published publicly and direct invitations will be sent to the 15 matched volunteers
                </p>
              </div>

              <div className="p-6 border cursor-pointer" style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                    Publish Publicly Only
                  </h3>
                  <input type="radio" style={{ accentColor: '#779F8D' }} />
                </div>
                <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Event will be published to all volunteers without targeted invitations
                </p>
              </div>
            </div>

            <div className="p-6 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={24} style={{ color: '#779F8D' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 700 }}>
                  Event Summary
                </h3>
              </div>
              <div className="space-y-2">
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Title:</strong> Weekly Food Delivery
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Schedule:</strong> Friday, 09:00 - 12:00 (Recurring)
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Role:</strong> Driver (3 volunteers needed)
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Matched Volunteers:</strong> 15 high-confidence matches
                </div>
              </div>
            </div>

            <Button variant="primary" className="w-full">
              Publish Event & Update Calendar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
