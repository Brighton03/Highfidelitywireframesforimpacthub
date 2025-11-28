import { Button } from './Button';
import { X, Target, Clock, MapPin, Award, Plus, CheckCircle2 } from 'lucide-react';

interface SmartRecruitmentModalProps {
  onClose: () => void;
  onComplete: (matchedCount: number) => void;
  eventName: string;
  eventDate: string;
  timeRange: string;
  location: string;
}

export function SmartRecruitmentModal({ onClose, onComplete, eventName, eventDate, timeRange, location }: SmartRecruitmentModalProps) {
  const topMatches = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      skills: ['Driver', 'Food'],
      matchScore: 98,
      distance: '2.3 miles',
      availability: 'Friday 9am-12pm'
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'MC',
      skills: ['Driver'],
      matchScore: 95,
      distance: '3.1 miles',
      availability: 'Friday 9am-12pm'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'EW',
      skills: ['Driver', 'Server'],
      matchScore: 92,
      distance: '1.8 miles',
      availability: 'Friday 9am-12pm'
    }
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 50 }}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl"
        style={{ backgroundColor: '#ffffff', borderRadius: '24px' }}
      >
        {/* Header */}
        <div 
          className="p-8 border-b"
          style={{ borderColor: '#F5F7FA' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
                Smart Recruitment Scan
              </h2>
              <p style={{ color: '#2C3E50', fontSize: '16px', opacity: 0.8 }}>
                AI-powered matching for "{eventName}" • {eventDate} • {timeRange}
              </p>
              <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                Location: {location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: '#F5F7FA',
                borderRadius: '50%',
                color: '#2C3E50'
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Central Gauge/Donut Chart */}
          <div className="flex items-center justify-center mb-12">
            <div className="relative" style={{ width: '280px', height: '280px' }}>
              {/* Donut Chart */}
              <svg className="transform -rotate-90" width="280" height="280">
                {/* Background Circle */}
                <circle
                  cx="140"
                  cy="140"
                  r="110"
                  stroke="#F5F7FA"
                  strokeWidth="36"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="140"
                  cy="140"
                  r="110"
                  stroke="url(#gradient)"
                  strokeWidth="36"
                  fill="none"
                  strokeDasharray={`${(15 / 20) * 691.15} 691.15`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#779F8D', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#9DBAA9', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Content */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ color: '#2C3E50' }}
              >
                <div style={{ fontSize: '72px', fontWeight: 700, color: '#779F8D', lineHeight: 1 }}>
                  15
                </div>
                <div style={{ fontSize: '20px', fontWeight: 600, marginTop: '8px', color: '#2C3E50' }}>
                  High-Confidence
                </div>
                <div style={{ fontSize: '16px', opacity: 0.7, color: '#2C3E50' }}>
                  Matches Found
                </div>
              </div>
            </div>
          </div>

          {/* Match Logic Flow */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div 
              className="p-6 text-center shadow-lg"
              style={{ backgroundColor: '#F0F7F4', borderRadius: '16px' }}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
              >
                <Target size={32} color="#ffffff" />
              </div>
              <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>
                15
              </div>
              <div style={{ color: '#2C3E50', fontSize: '16px', fontWeight: 600 }}>
                Skills Match
              </div>
              <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7, marginTop: '4px' }}>
                Has "Driver" qualification
              </div>
            </div>

            <div 
              className="p-6 text-center shadow-lg"
              style={{ backgroundColor: '#FFF8E1', borderRadius: '16px' }}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#FFB74D', borderRadius: '50%' }}
              >
                <Clock size={32} color="#ffffff" />
              </div>
              <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>
                12
              </div>
              <div style={{ color: '#2C3E50', fontSize: '16px', fontWeight: 600 }}>
                Available
              </div>
              <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7, marginTop: '4px' }}>
                Free Friday 9am-12pm
              </div>
            </div>

            <div 
              className="p-6 text-center shadow-lg"
              style={{ backgroundColor: '#E8F4F8', borderRadius: '16px' }}
            >
              <div 
                className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#2C3E50', borderRadius: '50%' }}
              >
                <Award size={32} color="#ffffff" />
              </div>
              <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>
                8
              </div>
              <div style={{ color: '#2C3E50', fontSize: '16px', fontWeight: 600 }}>
                Active Status
              </div>
              <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7, marginTop: '4px' }}>
                Engaged in past 30 days
              </div>
            </div>
          </div>

          {/* Logic Flow Visualization */}
          <div 
            className="p-6 mb-12"
            style={{ backgroundColor: '#F5F7FA', borderRadius: '16px' }}
          >
            <div className="flex items-center justify-center gap-4">
              <div 
                className="px-4 py-2"
                style={{ backgroundColor: '#779F8D', color: '#ffffff', borderRadius: '8px', fontWeight: 600 }}
              >
                Skills Match
              </div>
              <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>+</div>
              <div 
                className="px-4 py-2"
                style={{ backgroundColor: '#FFB74D', color: '#ffffff', borderRadius: '8px', fontWeight: 600 }}
              >
                Availability
              </div>
              <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>+</div>
              <div 
                className="px-4 py-2"
                style={{ backgroundColor: '#2C3E50', color: '#ffffff', borderRadius: '8px', fontWeight: 600 }}
              >
                Active Status
              </div>
              <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>=</div>
              <div 
                className="px-6 py-2"
                style={{ backgroundColor: '#779F8D', color: '#ffffff', borderRadius: '8px', fontWeight: 700, fontSize: '18px' }}
              >
                15 Perfect Matches
              </div>
            </div>
          </div>

          {/* Top 3 Matched Profiles */}
          <div className="mb-8">
            <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '16px' }}>
              Top Matched Volunteers
            </h3>

            <div className="space-y-4">
              {topMatches.map((match) => (
                <div
                  key={match.id}
                  className="p-6 shadow-lg flex items-center gap-6"
                  style={{ 
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '2px solid #F0F7F4'
                  }}
                >
                  {/* Avatar */}
                  <div 
                    className="w-16 h-16 flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: '#779F8D',
                      borderRadius: '50%',
                      color: '#ffffff',
                      fontSize: '20px',
                      fontWeight: 700
                    }}
                  >
                    {match.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                        {match.name}
                      </h4>
                      <div 
                        className="px-3 py-1"
                        style={{ 
                          backgroundColor: '#779F8D',
                          color: '#ffffff',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: 700
                        }}
                      >
                        {match.matchScore}% Match
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-2">
                      <div className="flex items-center gap-2">
                        <Clock size={16} style={{ color: '#2C3E50', opacity: 0.6 }} />
                        <span style={{ color: '#2C3E50', fontSize: '14px' }}>
                          {match.availability}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} style={{ color: '#2C3E50', opacity: 0.6 }} />
                        <span style={{ color: '#2C3E50', fontSize: '14px' }}>
                          {match.distance}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {match.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1"
                          style={{
                            backgroundColor: '#F0F7F4',
                            color: '#779F8D',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <button 
                    className="w-10 h-10 flex items-center justify-center transition-all"
                    style={{ 
                      backgroundColor: '#F0F7F4',
                      borderRadius: '50%',
                      color: '#779F8D'
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Context */}
          <div 
            className="p-6 mb-6"
            style={{ 
              backgroundColor: '#F0F7F4',
              borderRadius: '16px',
              border: '2px solid #779F8D'
            }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 size={24} style={{ color: '#779F8D', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '8px' }}>
                  Match Breakdown
                </h4>
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
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={() => onComplete(15)}>
              Send Invitations to All 15 Volunteers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
