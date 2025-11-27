import { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { Button } from './Button';
import { Badge } from './Badge';
import { HourLoggingForm } from './HourLoggingForm';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';

interface VolunteerDashboardProps {
  onNavigateToOpportunities: () => void;
}

export function VolunteerDashboard({ onNavigateToOpportunities }: VolunteerDashboardProps) {
  const [showHourLogging, setShowHourLogging] = useState(false);

  const upcomingShifts = [
    { id: 1, title: 'Food Pantry', date: 'Oct 24, 2025', time: '9:00 AM - 12:00 PM', location: 'Community Center' },
    { id: 2, title: 'Beach Cleanup', date: 'Nov 2, 2025', time: '2:00 PM - 5:00 PM', location: 'Main Beach' },
    { id: 3, title: 'Senior Center Visit', date: 'Nov 8, 2025', time: '10:00 AM - 1:00 PM', location: 'Sunrise Senior Center' }
  ];

  const recommendations = [
    { id: 1, title: 'Weekly Food Delivery', type: 'Recurring', skills: ['Driver'], date: 'Multiple dates available' },
    { id: 2, title: 'Community Garden', type: 'Single Event', skills: ['Environment'], date: 'Nov 15, 2025' },
    { id: 3, title: 'Literacy Tutoring', type: 'Recurring', skills: ['Education'], date: 'Flexible schedule' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNavigation 
        activeItem="Home" 
        onNavigate={(item) => {
          if (item === 'Find Opportunities') {
            onNavigateToOpportunities();
          }
        }}
      />
      
      {/* Hero Section */}
      <div className="w-full bg-white border-b" style={{ borderColor: '#E0E0E0' }}>
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '16px' }}>
            Welcome back, Sarah
          </h1>
          
          {/* Gamification Bar */}
          <div 
            className="p-6 mt-6"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Award size={24} style={{ color: '#779F8D' }} />
                <span style={{ color: '#2C3E50', fontWeight: 600 }}>Volunteer Rank: Silver</span>
              </div>
              <span style={{ color: '#2C3E50', fontWeight: 500 }}>12/20 Hours to Gold</span>
            </div>
            <div className="w-full h-3" style={{ backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
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
        </div>
      </div>

      {/* Main Content - 3 Column Grid */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Upcoming Shifts */}
          <div 
            className="p-6"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
              Upcoming Shifts
            </h2>
            
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <div 
                  key={shift.id}
                  className="p-4 border-l-4"
                  style={{ 
                    backgroundColor: '#F5F7FA',
                    borderColor: '#779F8D',
                    borderRadius: '4px'
                  }}
                >
                  <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>
                    {shift.title}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                      <Calendar size={16} />
                      <span>{shift.date}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                      <Clock size={16} />
                      <span>{shift.time}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                      <MapPin size={16} />
                      <span>{shift.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column - Impact Stats */}
          <div 
            className="p-6"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
              Personal Impact Stats
            </h2>
            
            <div className="space-y-6">
              <div 
                className="p-6 text-center"
                style={{ backgroundColor: '#779F8D', borderRadius: '8px' }}
              >
                <div style={{ color: '#FFFFFF', fontSize: '48px', fontWeight: 700, marginBottom: '8px' }}>
                  45
                </div>
                <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 500 }}>
                  Total Hours Volunteered
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="p-4 text-center"
                  style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
                >
                  <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
                    120
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    Meals Served
                  </div>
                </div>

                <div 
                  className="p-4 text-center"
                  style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
                >
                  <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
                    8
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    Events Joined
                  </div>
                </div>

                <div 
                  className="p-4 text-center"
                  style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
                >
                  <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
                    15
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    Lives Impacted
                  </div>
                </div>

                <div 
                  className="p-4 text-center"
                  style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}
                >
                  <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
                    3
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    Skills Used
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recommendations */}
          <div 
            className="p-6"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
              Recommended for You
            </h2>
            
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-4 border"
                  style={{ 
                    borderColor: '#E0E0E0',
                    borderRadius: '8px'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 style={{ color: '#2C3E50', fontWeight: 600 }}>
                      {rec.title}
                    </h3>
                    {rec.type === 'Recurring' && (
                      <Badge variant="success">Recurring</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {rec.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1"
                        style={{ 
                          backgroundColor: '#F5F7FA',
                          color: '#2C3E50',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3" style={{ color: '#2C3E50', fontSize: '14px' }}>
                    <Calendar size={16} />
                    <span>{rec.date}</span>
                  </div>
                  
                  <Button variant="secondary" className="w-full">
                    Learn More
                  </Button>
                </div>
              ))}
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
            // Show success message
          }}
        />
      )}
    </div>
  );
}