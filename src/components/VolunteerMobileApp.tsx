import { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Home, Search, Bell, User, CheckCircle2, Award, Filter, X, ArrowLeft } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

export function VolunteerMobileApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'opportunities' | 'schedule' | 'log' | 'profile'>('home');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loggedHours, setLoggedHours] = useState('');
  const [selectedEventForLog, setSelectedEventForLog] = useState('');
  const [logDate, setLogDate] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Driver', 'Food']);

  const upcomingShifts = [
    { id: 1, title: 'Food Pantry', date: 'Oct 24, 2025', time: '9:00 AM - 12:00 PM', location: 'Community Center', status: 'confirmed' },
    { id: 2, title: 'Beach Cleanup', date: 'Nov 2, 2025', time: '2:00 PM - 5:00 PM', location: 'Main Beach', status: 'confirmed' },
    { id: 3, title: 'Senior Center Visit', date: 'Nov 8, 2025', time: '10:00 AM - 1:00 PM', location: 'Sunrise Senior Center', status: 'waitlist' }
  ];

  const recentActivity = [
    { id: 1, event: 'Park Cleanup', hours: 3, date: 'Oct 20, 2025', status: 'approved' },
    { id: 2, event: 'Food Drive', hours: 4, date: 'Oct 15, 2025', status: 'approved' },
    { id: 3, event: 'Tutoring Session', hours: 2, date: 'Oct 10, 2025', status: 'pending' }
  ];

  const opportunities = [
    {
      id: 'beach-cleanup',
      title: 'Beach Cleanup',
      type: 'Single Event',
      date: 'Nov 12, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Main Beach',
      spotsLeft: 5,
      totalSpots: 20,
      skills: ['Environment'],
      description: 'Join us for a community beach cleanup to protect marine life and keep our beaches beautiful.',
      requirements: ['Physical fitness', 'Sun protection'],
      coordinator: 'Emma Wilson'
    },
    {
      id: 'food-delivery',
      title: 'Weekly Food Delivery',
      type: 'Multi-Shift',
      date: 'Multiple dates',
      time: 'Flexible',
      location: 'Various locations',
      spotsLeft: 12,
      totalSpots: 15,
      skills: ['Driver', 'Food'],
      description: 'Help deliver meals to homebound seniors every week.',
      requirements: ['Valid driver license', 'Reliable vehicle'],
      coordinator: 'Michael Chen'
    },
    {
      id: 'tutoring',
      title: 'Literacy Tutoring',
      type: 'Recurring',
      date: 'Every Tuesday',
      time: '4:00 PM - 6:00 PM',
      location: 'Community Library',
      spotsLeft: 3,
      totalSpots: 8,
      skills: ['Education', 'Teacher'],
      description: 'Help children improve their reading skills.',
      requirements: ['Background check required'],
      coordinator: 'Sarah Martinez'
    }
  ];

  const handleLogHours = () => {
    // Simulate logging hours
    setLoggedHours('');
    setSelectedEventForLog('');
    setLogDate('');
  };

  return (
    <div className="flex justify-center items-start py-8" style={{ backgroundColor: '#F5F7FA', minHeight: '100vh' }}>
      {/* Mobile Phone Frame */}
      <div 
        className="relative"
        style={{ 
          width: '375px',
          minHeight: '812px',
          backgroundColor: '#FFFFFF',
          borderRadius: '40px',
          border: '12px solid #2C3E50',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}
      >
        {/* Status Bar */}
        <div 
          className="flex items-center justify-between px-6 py-2"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#2C3E50' }}>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect x="0.5" y="0.5" width="15" height="11" rx="2" stroke="#2C3E50" strokeWidth="1"/>
              <rect x="16" y="4" width="2" height="4" rx="1" fill="#2C3E50"/>
              <rect x="2" y="2.5" width="4" height="7" fill="#2C3E50"/>
              <rect x="6.5" y="2.5" width="4" height="7" fill="#2C3E50"/>
              <rect x="11" y="2.5" width="2.5" height="7" fill="#2C3E50"/>
            </svg>
          </div>
        </div>

        {/* App Header */}
        <div 
          className="px-4 py-4 flex items-center justify-between"
          style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E0E0E0' }}
        >
          <div className="flex flex-col">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1560 480'%3E%3Ctext x='10' y='280' font-family='Georgia, serif' font-size='280' fill='%232C3E50'%3EImpacthub%3C/text%3E%3Cpath d='M1460 80 Q1480 60 1500 80 L1520 180 Q1500 200 1480 180 Z M1490 200 L1490 400' stroke='%232C3E50' stroke-width='8' fill='%232C3E50'/%3E%3C/svg%3E" 
              alt="ImpactHub Logo" 
              style={{ height: '28px', width: 'auto', marginBottom: '4px' }}
            />
            <p style={{ color: '#2C3E50', fontSize: '11px', opacity: 0.7 }}>Welcome, Sarah</p>
          </div>
          <Bell size={24} style={{ color: '#2C3E50' }} />
        </div>

        {/* Content Area */}
        <div style={{ height: 'calc(812px - 120px - 70px)', overflowY: 'auto', backgroundColor: '#F5F7FA' }}>
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <div className="p-4 space-y-4">
              {/* Progress Card */}
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award size={20} style={{ color: '#779F8D' }} />
                    <span style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px' }}>Silver Rank</span>
                  </div>
                  <span style={{ color: '#2C3E50', fontSize: '12px' }}>12/20 hrs to Gold</span>
                </div>
                <div className="w-full h-2" style={{ backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
                  <div 
                    className="h-full"
                    style={{ 
                      backgroundColor: '#779F8D', 
                      width: '60%',
                      borderRadius: '100px'
                    }}
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="p-3 flex flex-col items-center gap-2"
                    style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', border: 'none' }}
                  >
                    <Calendar size={24} style={{ color: '#779F8D' }} />
                    <span style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 500 }}>My Schedule</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('log')}
                    className="p-3 flex flex-col items-center gap-2"
                    style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', border: 'none' }}
                  >
                    <Clock size={24} style={{ color: '#779F8D' }} />
                    <span style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 500 }}>Log Hours</span>
                  </button>
                </div>
              </div>

              {/* Next Shift */}
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                  Next Shift
                </h2>
                <div 
                  className="p-3 border-l-4"
                  style={{ 
                    backgroundColor: '#F5F7FA',
                    borderColor: '#779F8D',
                    borderRadius: '4px'
                  }}
                >
                  <h3 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                    Food Pantry
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                      <Calendar size={14} />
                      <span>Oct 24, 2025</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                      <Clock size={14} />
                      <span>9:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                      <MapPin size={14} />
                      <span>Community Center</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center justify-between p-3"
                      style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
                    >
                      <div>
                        <p style={{ color: '#2C3E50', fontWeight: 500, fontSize: '14px' }}>{activity.event}</p>
                        <p style={{ color: '#2C3E50', fontSize: '12px' }}>{activity.hours} hrs • {activity.date}</p>
                      </div>
                      <Badge variant={activity.status === 'approved' ? 'success' : 'pending'}>
                        {activity.status === 'approved' ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* OPPORTUNITIES TAB */}
          {activeTab === 'opportunities' && !selectedEvent && (
            <div className="p-4 space-y-4">
              {/* Header with Filter */}
              <div className="flex items-center justify-between">
                <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '18px' }}>
                  Find Opportunities
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2"
                  style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', border: 'none' }}
                >
                  <Filter size={20} style={{ color: '#779F8D' }} />
                </button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div 
                  className="p-4"
                  style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px' }}>Filters</h3>
                    <button onClick={() => setShowFilters(false)} style={{ border: 'none', backgroundColor: 'transparent' }}>
                      <X size={18} style={{ color: '#2C3E50' }} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p style={{ color: '#2C3E50', fontWeight: 600, fontSize: '12px', marginBottom: '8px' }}>Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {['Driver', 'Teacher', 'Medical', 'Server'].map((skill) => (
                          <button
                            key={skill}
                            onClick={() => {
                              setSelectedFilters(prev =>
                                prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
                              );
                            }}
                            className="px-3 py-1"
                            style={{
                              backgroundColor: selectedFilters.includes(skill) ? '#779F8D' : '#F5F7FA',
                              color: selectedFilters.includes(skill) ? '#FFFFFF' : '#2C3E50',
                              borderRadius: '100px',
                              border: 'none',
                              fontSize: '12px'
                            }}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p style={{ color: '#2C3E50', fontWeight: 600, fontSize: '12px', marginBottom: '8px' }}>Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {['Food', 'Environment', 'Education', 'Health'].map((interest) => (
                          <button
                            key={interest}
                            onClick={() => {
                              setSelectedFilters(prev =>
                                prev.includes(interest) ? prev.filter(s => s !== interest) : [...prev, interest]
                              );
                            }}
                            className="px-3 py-1"
                            style={{
                              backgroundColor: selectedFilters.includes(interest) ? '#779F8D' : '#F5F7FA',
                              color: selectedFilters.includes(interest) ? '#FFFFFF' : '#2C3E50',
                              borderRadius: '100px',
                              border: 'none',
                              fontSize: '12px'
                            }}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Opportunities List */}
              <div className="space-y-3">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    onClick={() => setSelectedEvent(opp.id)}
                    className="p-4 cursor-pointer"
                    style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                          {opp.title}
                        </h3>
                        <Badge variant={opp.type === 'Single Event' ? 'success' : 'pending'}>
                          {opp.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p style={{ color: '#779F8D', fontWeight: 600, fontSize: '14px' }}>
                          {opp.spotsLeft} spots left
                        </p>
                        <p style={{ color: '#2C3E50', fontSize: '11px' }}>
                          of {opp.totalSpots}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 mt-3">
                      <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                        <Calendar size={14} />
                        <span>{opp.date}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                        <Clock size={14} />
                        <span>{opp.time}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                        <MapPin size={14} />
                        <span>{opp.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENT DETAIL VIEW */}
          {activeTab === 'opportunities' && selectedEvent && (
            <div className="p-4 space-y-4">
              {/* Back Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex items-center gap-2 mb-2"
                style={{ border: 'none', backgroundColor: 'transparent', color: '#779F8D', fontWeight: 500 }}
              >
                <ArrowLeft size={20} />
                Back to Opportunities
              </button>

              {(() => {
                const event = opportunities.find(o => o.id === selectedEvent);
                if (!event) return null;

                return (
                  <div 
                    className="p-4"
                    style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                          {event.title}
                        </h2>
                        <Badge variant={event.type === 'Single Event' ? 'success' : 'pending'}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p style={{ color: '#779F8D', fontWeight: 600, fontSize: '16px' }}>
                          {event.spotsLeft} spots
                        </p>
                        <p style={{ color: '#2C3E50', fontSize: '12px' }}>
                          of {event.totalSpots} total
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                        <Calendar size={18} style={{ color: '#779F8D' }} />
                        <div>
                          <p style={{ fontSize: '12px', opacity: 0.7 }}>Date</p>
                          <p style={{ fontWeight: 500, fontSize: '14px' }}>{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                        <Clock size={18} style={{ color: '#779F8D' }} />
                        <div>
                          <p style={{ fontSize: '12px', opacity: 0.7 }}>Time</p>
                          <p style={{ fontWeight: 500, fontSize: '14px' }}>{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                        <MapPin size={18} style={{ color: '#779F8D' }} />
                        <div>
                          <p style={{ fontSize: '12px', opacity: 0.7 }}>Location</p>
                          <p style={{ fontWeight: 500, fontSize: '14px' }}>{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3" style={{ color: '#2C3E50' }}>
                        <User size={18} style={{ color: '#779F8D' }} />
                        <div>
                          <p style={{ fontSize: '12px', opacity: 0.7 }}>Coordinator</p>
                          <p style={{ fontWeight: 500, fontSize: '14px' }}>{event.coordinator}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                        Description
                      </h3>
                      <p style={{ color: '#2C3E50', fontSize: '14px', lineHeight: '1.6' }}>
                        {event.description}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                        Requirements
                      </h3>
                      <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                        {event.requirements.map((req, idx) => (
                          <li key={idx} style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '4px' }}>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h3 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                        Skills Needed
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1"
                            style={{
                              backgroundColor: '#F0F7F4',
                              color: '#779F8D',
                              borderRadius: '100px',
                              fontSize: '12px',
                              fontWeight: 500
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" onClick={() => {
                      setSelectedEvent(null);
                      setActiveTab('schedule');
                    }}>
                      <CheckCircle2 size={16} />
                      Sign Up for Event
                    </Button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="p-4 space-y-4">
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '18px', marginBottom: '16px' }}>
                  My Schedule
                </h2>
                
                <div className="space-y-3">
                  {upcomingShifts.map((shift) => (
                    <div 
                      key={shift.id}
                      className="p-4 border-l-4"
                      style={{ 
                        backgroundColor: '#F5F7FA',
                        borderColor: shift.status === 'confirmed' ? '#779F8D' : '#FFB74D',
                        borderRadius: '4px'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px' }}>
                          {shift.title}
                        </h3>
                        <Badge variant={shift.status === 'confirmed' ? 'success' : 'pending'}>
                          {shift.status === 'confirmed' ? 'Confirmed' : 'Waitlist'}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                          <Calendar size={14} />
                          <span>{shift.date}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                          <Clock size={14} />
                          <span>{shift.time}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ fontSize: '12px', color: '#2C3E50' }}>
                          <MapPin size={14} />
                          <span>{shift.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LOG HOURS TAB */}
          {activeTab === 'log' && (
            <div className="p-4 space-y-4">
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '18px', marginBottom: '16px' }}>
                  Log Volunteer Hours
                </h2>

                <div className="space-y-4">
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                      Select Event
                    </label>
                    <select
                      value={selectedEventForLog}
                      onChange={(e) => setSelectedEventForLog(e.target.value)}
                      className="w-full px-3 py-3 border"
                      style={{
                        borderColor: '#E0E0E0',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        color: '#2C3E50',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Choose an event...</option>
                      <option value="food-pantry">Food Pantry - Oct 24</option>
                      <option value="beach-cleanup">Beach Cleanup - Nov 2</option>
                      <option value="senior-center">Senior Center - Nov 8</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={logDate}
                      onChange={(e) => setLogDate(e.target.value)}
                      className="w-full px-3 py-3 border"
                      style={{
                        borderColor: '#E0E0E0',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        color: '#2C3E50',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                      Hours Volunteered
                    </label>
                    <input
                      type="number"
                      value={loggedHours}
                      onChange={(e) => setLoggedHours(e.target.value)}
                      placeholder="Enter hours (e.g., 3.5)"
                      className="w-full px-3 py-3 border"
                      style={{
                        borderColor: '#E0E0E0',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        color: '#2C3E50',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                      Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Add any notes about your volunteer work..."
                      rows={4}
                      className="w-full px-3 py-3 border"
                      style={{
                        borderColor: '#E0E0E0',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        color: '#2C3E50',
                        fontSize: '14px',
                        resize: 'none'
                      }}
                    />
                  </div>

                  <Button 
                    onClick={handleLogHours}
                    disabled={!selectedEventForLog || !loggedHours || !logDate}
                    className="w-full"
                  >
                    <CheckCircle2 size={16} />
                    Submit Hours
                  </Button>
                </div>
              </div>

              {/* Recent Logs */}
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '16px', marginBottom: '12px' }}>
                  Recent Submissions
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-center justify-between p-3"
                      style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
                    >
                      <div>
                        <p style={{ color: '#2C3E50', fontWeight: 500, fontSize: '14px' }}>{activity.event}</p>
                        <p style={{ color: '#2C3E50', fontSize: '12px' }}>{activity.hours} hrs • {activity.date}</p>
                      </div>
                      <Badge variant={activity.status === 'approved' ? 'success' : 'pending'}>
                        {activity.status === 'approved' ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="p-4 space-y-4">
              <div 
                className="p-4"
                style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}
              >
                <div className="flex flex-col items-center mb-6">
                  <div 
                    className="w-20 h-20 flex items-center justify-center mb-3"
                    style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
                  >
                    <User size={40} style={{ color: '#FFFFFF' }} />
                  </div>
                  <h2 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '18px' }}>Sarah Johnson</h2>
                  <p style={{ color: '#2C3E50', fontSize: '14px' }}>sarah.j@email.com</p>
                </div>

                <div 
                  className="p-4 mb-4"
                  style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: '#2C3E50', fontWeight: 600 }}>Volunteer Stats</span>
                    <Award size={20} style={{ color: '#779F8D' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>12</p>
                      <p style={{ color: '#2C3E50', fontSize: '12px' }}>Total Hours</p>
                    </div>
                    <div>
                      <p style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>8</p>
                      <p style={{ color: '#2C3E50', fontSize: '12px' }}>Events Attended</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full p-3 flex items-center justify-between"
                    style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', border: 'none', textAlign: 'left' }}
                  >
                    <span style={{ color: '#2C3E50', fontWeight: 500, fontSize: '14px' }}>Edit Profile</span>
                    <span style={{ color: '#2C3E50' }}>›</span>
                  </button>
                  <button
                    className="w-full p-3 flex items-center justify-between"
                    style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', border: 'none', textAlign: 'left' }}
                  >
                    <span style={{ color: '#2C3E50', fontWeight: 500, fontSize: '14px' }}>Notifications</span>
                    <span style={{ color: '#2C3E50' }}>›</span>
                  </button>
                  <button
                    className="w-full p-3 flex items-center justify-between"
                    style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', border: 'none', textAlign: 'left' }}
                  >
                    <span style={{ color: '#2C3E50', fontWeight: 500, fontSize: '14px' }}>Settings</span>
                    <span style={{ color: '#2C3E50' }}>›</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tab Navigation */}
        <div 
          className="absolute bottom-0 left-0 right-0 flex items-center py-2 px-2"
          style={{ 
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E0E0E0',
            height: '70px',
            display: 'flex',
            justifyContent: 'space-evenly'
          }}
        >
          <button
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center gap-1 flex-1"
            style={{ border: 'none', backgroundColor: 'transparent', maxWidth: '80px' }}
          >
            <Home size={22} style={{ color: activeTab === 'home' ? '#779F8D' : '#9E9E9E' }} />
            <span style={{ 
              fontSize: '10px', 
              color: activeTab === 'home' ? '#779F8D' : '#9E9E9E',
              fontWeight: activeTab === 'home' ? 600 : 400
            }}>
              Home
            </span>
          </button>
          <button
            onClick={() => {
              setActiveTab('opportunities');
              setSelectedEvent(null);
            }}
            className="flex flex-col items-center gap-1 flex-1"
            style={{ border: 'none', backgroundColor: 'transparent', maxWidth: '80px' }}
          >
            <Search size={22} style={{ color: activeTab === 'opportunities' ? '#779F8D' : '#9E9E9E' }} />
            <span style={{ 
              fontSize: '10px', 
              color: activeTab === 'opportunities' ? '#779F8D' : '#9E9E9E',
              fontWeight: activeTab === 'opportunities' ? 600 : 400
            }}>
              Find
            </span>
          </button>
          <button
            onClick={() => setActiveTab('log')}
            className="flex flex-col items-center gap-1 flex-1"
            style={{ border: 'none', backgroundColor: 'transparent', marginTop: '-10px', maxWidth: '80px' }}
          >
            <Plus 
              size={28} 
              style={{ 
                color: '#FFFFFF',
                backgroundColor: '#779F8D',
                borderRadius: '50%',
                padding: '6px'
              }} 
            />
            <span style={{ 
              fontSize: '10px', 
              color: activeTab === 'log' ? '#779F8D' : '#9E9E9E',
              fontWeight: activeTab === 'log' ? 600 : 400
            }}>
              Log
            </span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className="flex flex-col items-center gap-1 flex-1"
            style={{ border: 'none', backgroundColor: 'transparent', maxWidth: '80px' }}
          >
            <Calendar size={22} style={{ color: activeTab === 'schedule' ? '#779F8D' : '#9E9E9E' }} />
            <span style={{ 
              fontSize: '10px', 
              color: activeTab === 'schedule' ? '#779F8D' : '#9E9E9E',
              fontWeight: activeTab === 'schedule' ? 600 : 400
            }}>
              Schedule
            </span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="flex flex-col items-center gap-1 flex-1"
            style={{ border: 'none', backgroundColor: 'transparent', maxWidth: '80px' }}
          >
            <User size={22} style={{ color: activeTab === 'profile' ? '#779F8D' : '#9E9E9E' }} />
            <span style={{ 
              fontSize: '10px', 
              color: activeTab === 'profile' ? '#779F8D' : '#9E9E9E',
              fontWeight: activeTab === 'profile' ? 600 : 400
            }}>
              Profile
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
