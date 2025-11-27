import { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { Button } from './Button';
import { Badge } from './Badge';
import { HourLoggingForm } from './HourLoggingForm';
import { Calendar, Clock, MapPin, Users, Award, Star, TrendingUp, Heart, Trophy } from 'lucide-react';

interface VolunteerDashboardProps {
  onNavigateToOpportunities: () => void;
}

export function VolunteerDashboard({ onNavigateToOpportunities }: VolunteerDashboardProps) {
  const [showHourLogging, setShowHourLogging] = useState(false);

  const upcomingShifts = [
    {
      id: 1,
      title: 'Food Pantry Volunteer',
      date: 'Oct 24, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Community Center',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Beach Cleanup',
      date: 'Nov 2, 2025',
      time: '8:00 AM - 11:00 AM',
      location: 'Main Beach',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Senior Center Visit',
      date: 'Nov 8, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Sunset Senior Center',
      status: 'waitlist'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Weekly Food Delivery',
      match: 95,
      reason: 'Matches your Driver skill',
      date: 'Multiple dates available'
    },
    {
      id: 2,
      title: 'Community Garden',
      match: 88,
      reason: 'Based on your Environment interest',
      date: 'Every Saturday'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNavigation userName="Alex Martinez" />

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '40px', marginBottom: '8px' }}>
            Welcome back, Alex! 👋
          </h1>
          <p style={{ color: '#2C3E50', fontSize: '18px', opacity: 0.8 }}>
            You're making a real difference in your community
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Gamification Card - Visual Rich */}
            <div 
              className="p-8 shadow-lg"
              style={{ 
                backgroundColor: 'linear-gradient(135deg, #779F8D 0%, #9DBAA9 100%)',
                background: 'linear-gradient(135deg, #779F8D 0%, #9DBAA9 100%)',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-16 h-16 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '50%' }}
                    >
                      <Trophy size={32} color="#ffffff" />
                    </div>
                    <div>
                      <h2 style={{ color: '#ffffff', fontWeight: 700, fontSize: '28px' }}>
                        Silver Volunteer
                      </h2>
                      <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
                        Keep up the amazing work!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', marginBottom: '4px' }}>
                        Current Level
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700 }}>
                        Silver
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', marginBottom: '4px' }}>
                        Hours to Gold
                      </div>
                      <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700 }}>
                        20h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="relative" style={{ width: '160px', height: '160px' }}>
                  <svg className="transform -rotate-90" width="160" height="160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#ffffff"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(45 / 65) * 440} 440`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ color: '#ffffff' }}
                  >
                    <div style={{ fontSize: '36px', fontWeight: 700 }}>69%</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Complete</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div 
                  className="w-full h-3"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '100px', overflow: 'hidden' }}
                >
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: '#ffffff',
                      width: '69%',
                      borderRadius: '100px',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>45 hours completed</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>65 hours for Gold</span>
                </div>
              </div>
            </div>

            {/* Impact Stats - Achievement Cards */}
            <div>
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '24px' }}>
                Your Impact
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {/* Hours Card */}
                <div 
                  className="p-6 shadow-lg relative overflow-hidden"
                  style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
                >
                  <div 
                    className="absolute top-0 right-0 w-24 h-24 opacity-10"
                    style={{ transform: 'translate(30%, -30%)' }}
                  >
                    <Clock size={96} color="#779F8D" />
                  </div>
                  <div 
                    className="w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#F0F7F4', borderRadius: '12px' }}
                  >
                    <Clock size={24} color="#779F8D" />
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>
                    45
                  </div>
                  <div style={{ color: '#2C3E50', opacity: 0.7, fontSize: '14px' }}>
                    Total Hours
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={14} color="#779F8D" />
                    <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 600 }}>
                      +12% this month
                    </span>
                  </div>
                </div>

                {/* Meals Served Card */}
                <div 
                  className="p-6 shadow-lg relative overflow-hidden"
                  style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
                >
                  <div 
                    className="absolute top-0 right-0 w-24 h-24 opacity-10"
                    style={{ transform: 'translate(30%, -30%)' }}
                  >
                    <Heart size={96} color="#FFB74D" />
                  </div>
                  <div 
                    className="w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#FFF8E1', borderRadius: '12px' }}
                  >
                    <Heart size={24} color="#FFB74D" />
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>
                    250
                  </div>
                  <div style={{ color: '#2C3E50', opacity: 0.7, fontSize: '14px' }}>
                    Meals Served
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={14} color="#FFB74D" />
                    <span style={{ color: '#FFB74D', fontSize: '12px', fontWeight: 600 }}>
                      New milestone!
                    </span>
                  </div>
                </div>

                {/* Events Card */}
                <div 
                  className="p-6 shadow-lg relative overflow-hidden"
                  style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
                >
                  <div 
                    className="absolute top-0 right-0 w-24 h-24 opacity-10"
                    style={{ transform: 'translate(30%, -30%)' }}
                  >
                    <Award size={96} color="#2C3E50" />
                  </div>
                  <div 
                    className="w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: '#F5F7FA', borderRadius: '12px' }}
                  >
                    <Award size={24} color="#2C3E50" />
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700, marginBottom: '4px' }}>
                    12
                  </div>
                  <div style={{ color: '#2C3E50', opacity: 0.7, fontSize: '14px' }}>
                    Events Completed
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={14} color="#779F8D" />
                    <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 600 }}>
                      Top 20% active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Shifts - Ticket Style */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>
                  Upcoming Shifts
                </h2>
                <Button variant="primary" onClick={() => setShowHourLogging(false)}>
                  Log Hours
                </Button>
              </div>

              <div className="space-y-4">
                {upcomingShifts.map((shift) => (
                  <div 
                    key={shift.id}
                    className="flex items-stretch shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    style={{ 
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      borderLeft: `6px solid ${shift.status === 'confirmed' ? '#779F8D' : '#FFB74D'}`
                    }}
                  >
                    {/* Date Badge */}
                    <div 
                      className="flex flex-col items-center justify-center px-6 py-6"
                      style={{ 
                        backgroundColor: shift.status === 'confirmed' ? '#F0F7F4' : '#FFF8E1',
                        minWidth: '120px'
                      }}
                    >
                      <div style={{ 
                        color: shift.status === 'confirmed' ? '#779F8D' : '#FFB74D',
                        fontSize: '32px',
                        fontWeight: 700,
                        lineHeight: 1
                      }}>
                        {shift.date.split(' ')[1].replace(',', '')}
                      </div>
                      <div style={{ 
                        color: shift.status === 'confirmed' ? '#779F8D' : '#FFB74D',
                        fontSize: '14px',
                        fontWeight: 600,
                        marginTop: '4px'
                      }}>
                        {shift.date.split(' ')[0]}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                          {shift.title}
                        </h3>
                        <Badge variant={shift.status === 'confirmed' ? 'success' : 'warning'}>
                          {shift.status === 'confirmed' ? 'Confirmed' : 'Waitlist'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <Clock size={16} style={{ opacity: 0.6 }} />
                          <span>{shift.time}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <MapPin size={16} style={{ opacity: 0.6 }} />
                          <span>{shift.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Smart Recommendations */}
            <div 
              className="p-6 shadow-lg"
              style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Star size={24} color="#779F8D" />
                <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                  Recommended for You
                </h3>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div 
                    key={rec.id}
                    className="p-4 border-2 cursor-pointer hover:border-opacity-100 transition-all"
                    style={{ 
                      borderColor: '#779F8D',
                      backgroundColor: '#F0F7F4',
                      borderRadius: '12px'
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 style={{ color: '#2C3E50', fontWeight: 600, fontSize: '16px' }}>
                        {rec.title}
                      </h4>
                      <div 
                        className="px-2 py-1"
                        style={{ 
                          backgroundColor: '#779F8D',
                          color: '#ffffff',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 700
                        }}
                      >
                        {rec.match}% Match
                      </div>
                    </div>
                    <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>
                      {rec.reason}
                    </p>
                    <div style={{ color: '#779F8D', fontSize: '12px', fontWeight: 600 }}>
                      {rec.date}
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                variant="primary" 
                onClick={onNavigateToOpportunities}
                className="w-full mt-6"
              >
                Browse All Opportunities
              </Button>
            </div>

            {/* Quick Actions */}
            <div 
              className="p-6 shadow-lg"
              style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowHourLogging(true)}
                  className="w-full p-3 text-left transition-all"
                  style={{ 
                    backgroundColor: '#F0F7F4',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    fontWeight: 600
                  }}
                >
                  Log Volunteer Hours
                </button>
                <button 
                  className="w-full p-3 text-left transition-all"
                  style={{ 
                    backgroundColor: '#F5F7FA',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    fontWeight: 600
                  }}
                >
                  Update Availability
                </button>
                <button 
                  className="w-full p-3 text-left transition-all"
                  style={{ 
                    backgroundColor: '#F5F7FA',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    fontWeight: 600
                  }}
                >
                  View Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hour Logging Form */}
      {showHourLogging && (
        <HourLoggingForm 
          onClose={() => setShowHourLogging(false)}
          onSubmit={() => {
            setShowHourLogging(false);
          }}
        />
      )}
    </div>
  );
}
