import { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { Button } from './Button';
import { Badge } from './Badge';
import { DateSelectionModal } from './DateSelectionModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface OpportunityFinderProps {
  onNavigateBack: () => void;
}

export function OpportunityFinder({ onNavigateBack }: OpportunityFinderProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Driver']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Food']);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const opportunities = [
    {
      id: 1,
      title: 'Beach Cleanup',
      type: 'Single Event',
      date: 'Nov 12, 2025',
      time: '9:00 AM - 12:00 PM',
      location: 'Main Beach',
      spotsLeft: 5,
      totalSpots: 20,
      skills: ['Environment'],
      description: 'Help keep our beaches clean and protect marine life.'
    },
    {
      id: 2,
      title: 'Weekly Food Delivery',
      type: 'Multi-Shift',
      date: 'Multiple dates available',
      time: 'Flexible',
      location: 'Various locations',
      spotsLeft: 12,
      totalSpots: 15,
      skills: ['Driver', 'Food'],
      description: 'Deliver meals to homebound seniors every week.'
    },
    {
      id: 3,
      title: 'Medical Transport',
      type: 'Single Event',
      date: 'Nov 18, 2025',
      time: '8:00 AM - 4:00 PM',
      location: 'City Hospital',
      spotsLeft: 0,
      totalSpots: 5,
      skills: ['Driver', 'Medical'],
      description: 'Transport patients to medical appointments.',
      blocked: true,
      blockReason: 'Qualification Missing'
    }
  ];

  const toggleFilter = (category: 'skills' | 'interests', value: string) => {
    if (category === 'skills') {
      setSelectedSkills(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else {
      setSelectedInterests(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNavigation 
        activeItem="Find Opportunities" 
        onNavigate={(item) => {
          if (item === 'Home') {
            onNavigateBack();
          }
        }}
      />

      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
          Find Opportunities
        </h1>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside 
            className="w-72 p-6 h-fit"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '24px' }}>
              Filters
            </h2>

            {/* Skills Filter */}
            <div className="mb-6">
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                Skills
              </h3>
              <div className="space-y-2">
                {['Driver', 'Server', 'Teacher', 'Medical'].map((skill) => (
                  <label key={skill} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleFilter('skills', skill)}
                      className="w-4 h-4"
                      style={{ accentColor: '#779F8D' }}
                    />
                    <span style={{ color: '#2C3E50' }}>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interests Filter */}
            <div className="mb-6">
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                Interests
              </h3>
              <div className="space-y-2">
                {['Environment', 'Food', 'Education', 'Health'].map((interest) => (
                  <label key={interest} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(interest)}
                      onChange={() => toggleFilter('interests', interest)}
                      className="w-4 h-4"
                      style={{ accentColor: '#779F8D' }}
                    />
                    <span style={{ color: '#2C3E50' }}>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div>
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                Availability
              </h3>
              <select 
                className="w-full p-2 border"
                style={{ 
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50'
                }}
              >
                <option>Any day</option>
                <option>Weekdays</option>
                <option>Weekends</option>
              </select>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-6"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    opacity: opp.blocked ? 0.6 : 1
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                      {opp.title}
                    </h3>
                    {opp.type === 'Multi-Shift' && (
                      <Badge variant="success">Recurring</Badge>
                    )}
                  </div>

                  <p style={{ color: '#2C3E50', marginBottom: '16px', fontSize: '14px' }}>
                    {opp.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                      <Calendar size={16} />
                      <span>{opp.date}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                      <Clock size={16} />
                      <span>{opp.time}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                      <MapPin size={16} />
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                      <Users size={16} />
                      <span>{opp.spotsLeft} of {opp.totalSpots} spots left</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {opp.skills.map((skill) => (
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

                  {opp.blocked ? (
                    <Button variant="disabled" className="w-full">
                      {opp.blockReason}
                    </Button>
                  ) : opp.type === 'Multi-Shift' ? (
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => setShowDateModal(true)}
                    >
                      Select Dates
                    </Button>
                  ) : (
                    <Button variant="primary" className="w-full">
                      Join Event
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showDateModal && (
        <DateSelectionModal
          onClose={() => setShowDateModal(false)}
          onConfirm={() => {
            setShowDateModal(false);
            setShowConfirmationModal(true);
          }}
        />
      )}

      {showConfirmationModal && (
        <BookingConfirmationModal
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  );
}
