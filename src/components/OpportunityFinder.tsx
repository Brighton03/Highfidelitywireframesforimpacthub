import { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { Button } from './Button';
import { Badge } from './Badge';
import { DateSelectionModal } from './DateSelectionModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { Calendar, MapPin, Users, Clock, Star, AlertCircle, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OpportunityFinderProps {
  onNavigateBack: () => void;
}

export function OpportunityFinder({ onNavigateBack }: OpportunityFinderProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Driver']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Food']);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // User profile skills/qualifications
  const userSkills = ['Driver', 'Server', 'Teacher'];

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
      description: 'Help keep our beaches clean and protect marine life.',
      image: 'https://images.unsplash.com/photo-1751646312130-d6be98d867bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNsZWFudXAlMjB2b2x1bnRlZXJzfGVufDF8fHx8MTc2NDE3MjY4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      matchScore: 75
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
      description: 'Deliver meals to homebound seniors every week.',
      image: 'https://images.unsplash.com/photo-1628717341663-0007b0ee2597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjB2b2x1bnRlZXJ8ZW58MXx8fHwxNzY0MjI4ODY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      matchScore: 95
    },
    {
      id: 3,
      title: 'Medical Transport',
      type: 'Single Event',
      date: 'Nov 18, 2025',
      time: '8:00 AM - 4:00 PM',
      location: 'City Hospital',
      spotsLeft: 3,
      totalSpots: 8,
      skills: ['Medical', 'Driver'],
      description: 'Transport patients to medical appointments.',
      image: 'https://images.unsplash.com/photo-1721411480070-fcb558776d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdHJhbnNwb3J0JTIwYW1idWxhbmNlfGVufDF8fHx8MTc2NDIyODg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      matchScore: 45,
      missingQualification: 'Medical'
    }
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const checkSkillMatch = (requiredSkills: string[]) => {
    return requiredSkills.filter(skill => userSkills.includes(skill));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNavigation userName="Alex Martinez" />

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Header with Smart Discovery Badge */}
        <div className="mb-12">
          <button
            onClick={onNavigateBack}
            style={{ color: '#779F8D', fontWeight: 600, marginBottom: '16px' }}
          >
            ← Back to Dashboard
          </button>
          <div className="flex items-center gap-4 mb-4">
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '40px' }}>
              Find Opportunities
            </h1>
            <div 
              className="flex items-center gap-2 px-4 py-2"
              style={{ 
                backgroundColor: '#F0F7F4',
                borderRadius: '100px',
                border: '2px solid #779F8D'
              }}
            >
              <Sparkles size={18} color="#779F8D" />
              <span style={{ color: '#779F8D', fontWeight: 600, fontSize: '14px' }}>
                Smart Recommendations Active
              </span>
            </div>
          </div>
          <p style={{ color: '#2C3E50', fontSize: '18px', opacity: 0.8 }}>
            Discover volunteer opportunities that match your skills and interests
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside 
            className="w-80 h-fit p-8 shadow-lg"
            style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
          >
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
              Filters
            </h2>

            {/* Skills */}
            <div className="mb-8">
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '16px' }}>
                Your Skills
              </h3>
              <div className="space-y-3">
                {['Driver', 'Server', 'Teacher', 'Medical'].map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-3 cursor-pointer p-3 transition-all"
                    style={{
                      backgroundColor: selectedSkills.includes(skill) ? '#F0F7F4' : 'transparent',
                      borderRadius: '8px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      className="w-5 h-5"
                      style={{ accentColor: '#779F8D' }}
                    />
                    <span style={{ color: '#2C3E50', fontWeight: 500 }}>{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-8">
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '16px' }}>
                Interests
              </h3>
              <div className="space-y-3">
                {['Environment', 'Food', 'Education', 'Health', 'Animals', 'Seniors'].map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center gap-3 cursor-pointer p-3 transition-all"
                    style={{
                      backgroundColor: selectedInterests.includes(interest) ? '#F0F7F4' : 'transparent',
                      borderRadius: '8px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                      className="w-5 h-5"
                      style={{ accentColor: '#779F8D' }}
                    />
                    <span style={{ color: '#2C3E50', fontWeight: 500 }}>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '16px' }}>
                Availability
              </h3>
              <select 
                className="w-full px-4 py-3 border"
                style={{
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50',
                  outline: 'none'
                }}
              >
                <option>Any time</option>
                <option>Weekdays</option>
                <option>Weekends</option>
                <option>Mornings</option>
                <option>Afternoons</option>
              </select>
            </div>
          </aside>

          {/* Opportunities Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div style={{ color: '#2C3E50', fontSize: '18px' }}>
                <span style={{ fontWeight: 700 }}>{opportunities.length}</span> opportunities found
              </div>
              <select 
                className="px-4 py-2 border"
                style={{
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50',
                  outline: 'none'
                }}
              >
                <option>Best Match</option>
                <option>Newest</option>
                <option>Most Urgent</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {opportunities.map((opp) => {
                const matchedSkills = checkSkillMatch(opp.skills);
                const hasMatch = matchedSkills.length > 0;
                const needsQualification = opp.missingQualification && !userSkills.includes(opp.missingQualification);
                
                return (
                  <div
                    key={opp.id}
                    className="shadow-lg hover:shadow-xl transition-all overflow-hidden"
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      opacity: needsQualification ? 0.75 : 1,
                      border: hasMatch ? '2px solid #779F8D' : 'none'
                    }}
                  >
                    {/* Hero Image */}
                    <div className="relative" style={{ height: '200px', overflow: 'hidden' }}>
                      <ImageWithFallback
                        src={opp.image}
                        alt={opp.title}
                        className="w-full h-full object-cover"
                      />
                      {hasMatch && (
                        <div 
                          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2"
                          style={{
                            backgroundColor: '#779F8D',
                            borderRadius: '100px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <Star size={16} color="#ffffff" fill="#ffffff" />
                          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '14px' }}>
                            {opp.matchScore}% Match
                          </span>
                        </div>
                      )}
                      {needsQualification && (
                        <div 
                          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2"
                          style={{
                            backgroundColor: '#E57373',
                            borderRadius: '100px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          <AlertCircle size={16} color="#ffffff" />
                          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '12px' }}>
                            Qualification Needed
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                          {opp.title}
                        </h3>
                        {opp.type === 'Multi-Shift' && (
                          <Badge variant="success">Recurring</Badge>
                        )}
                      </div>

                      <p style={{ color: '#2C3E50', marginBottom: '16px', fontSize: '14px', opacity: 0.8 }}>
                        {opp.description}
                      </p>

                      {/* Skills Tags with Match Highlighting */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opp.skills.map((skill) => {
                          const isMatch = userSkills.includes(skill);
                          return (
                            <div
                              key={skill}
                              className="flex items-center gap-1 px-3 py-1"
                              style={{
                                backgroundColor: isMatch ? '#FFB74D' : '#F5F7FA',
                                borderRadius: '6px',
                                border: isMatch ? '2px solid #FFB74D' : 'none'
                              }}
                            >
                              {isMatch && <Star size={12} color="#ffffff" fill="#ffffff" />}
                              <span style={{ 
                                color: isMatch ? '#ffffff' : '#2C3E50',
                                fontSize: '12px',
                                fontWeight: isMatch ? 700 : 500
                              }}>
                                {skill}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <Calendar size={16} style={{ opacity: 0.6 }} />
                          <span>{opp.date}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <Clock size={16} style={{ opacity: 0.6 }} />
                          <span>{opp.time}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <MapPin size={16} style={{ opacity: 0.6 }} />
                          <span>{opp.location}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                          <Users size={16} style={{ opacity: 0.6 }} />
                          <span>{opp.spotsLeft} of {opp.totalSpots} spots left</span>
                        </div>
                      </div>

                      {needsQualification ? (
                        <div 
                          className="p-3 mb-3"
                          style={{
                            backgroundColor: '#FFF8E1',
                            borderRadius: '8px',
                            border: '1px solid #FFB74D'
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <AlertCircle size={16} color="#FFB74D" />
                            <span style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600 }}>
                              Requires: {opp.missingQualification}
                            </span>
                          </div>
                        </div>
                      ) : null}

                      <Button
                        variant="primary"
                        onClick={() => {
                          if (opp.type === 'Multi-Shift') {
                            setShowDateModal(true);
                          } else {
                            setShowConfirmationModal(true);
                          }
                        }}
                        className="w-full"
                        disabled={needsQualification}
                      >
                        {opp.type === 'Multi-Shift' ? 'Select Dates' : 'Sign Up'}
                      </Button>
                    </div>
                  </div>
                );
              })}
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
        <BookingConfirmationModal onClose={() => setShowConfirmationModal(false)} />
      )}
    </div>
  );
}
