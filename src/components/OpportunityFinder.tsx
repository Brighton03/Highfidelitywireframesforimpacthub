/* eslint-disable no-inline-styles/no-inline-styles */
import { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { Button } from './Button';
import { Badge } from './Badge';
import { DateSelectionModal, SelectedSlotSummary } from './DateSelectionModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { Calendar, MapPin, Users, Clock, Star, AlertCircle, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import safetyOfficerImage from '../assets/safety-officer.png';
import { SKILL_OPTIONS, INTEREST_OPTIONS } from '@/constants/skills';

type OpportunityType = 'Single Event' | 'Multi-Shift';

interface Opportunity {
  id: number;
  title: string;
  type: OpportunityType;
  date: string;
  time: string;
  location: string;
  spotsLeft: number;
  totalSpots: number;
  skills: string[];
  description: string;
  image: string;
  matchScore: number;
  missingQualification?: string;
  defaultState?: 'joined' | 'waitlisted';
}

const opportunityCatalog: Opportunity[] = [
  {
    id: 1,
    title: 'Beach Day Cleanup',
    type: 'Single Event',
    date: 'Nov 12, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Main Beach',
    spotsLeft: 5,
    totalSpots: 20,
    skills: ['Environmental Education', 'Gardening'],
    description: 'Help keep our beaches clean and protect marine life.',
    image: 'https://images.unsplash.com/photo-1751646312130-d6be98d867bf?auto=format&fit=crop&w=1080&q=80',
    matchScore: 75,
    defaultState: 'joined'
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
    skills: ['Delivery Driver', 'Food Handling'],
    description: 'Deliver meals to homebound seniors every week.',
    image: 'https://images.unsplash.com/photo-1628717341663-0007b0ee2597?auto=format&fit=crop&w=1080&q=80',
    matchScore: 95
  },
  {
    id: 3,
    title: 'Safety Officer',
    type: 'Single Event',
    date: 'Nov 18, 2025',
    time: '8:00 AM - 4:00 PM',
    location: 'City Hospital',
    spotsLeft: 3,
    totalSpots: 8,
    skills: ['First Aid', 'Delivery Driver'],
    description: 'Provide safety oversight and first aid support at community events.',
    image: safetyOfficerImage,
    matchScore: 45,
    missingQualification: 'First Aid'
  },
  {
    id: 4,
    title: 'Community Pantry Pop-Up',
    type: 'Single Event',
    date: 'Nov 22, 2025',
    time: '7:30 AM - 11:30 AM',
    location: 'River Market Plaza',
    spotsLeft: 0,
    totalSpots: 18,
    skills: ['Community Outreach', 'Food Handling'],
    description: 'Distribute and cook fresh groceries during our monthly mobile pantry event.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1080&q=80',
    matchScore: 82
  },
  {
    id: 5,
    title: 'Harvest Kitchen Prep Night',
    type: 'Single Event',
    date: 'Nov 28, 2025',
    time: '5:30 PM - 8:30 PM',
    location: 'ImpactHub Community Kitchen',
    spotsLeft: 7,
    totalSpots: 12,
    skills: ['Food Handling', 'Customer Service'],
    description: 'Chop produce, assemble meal kits, and greet families picking up hot dinners.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1080&q=80',
    matchScore: 88
  },
  {
    id: 6,
    title: 'Neighborhood Garden Hub',
    type: 'Multi-Shift',
    date: 'Weekly shifts',
    time: '9:00 AM - 12:00 PM',
    location: 'Civic Greenhouse Collective',
    spotsLeft: 6,
    totalSpots: 14,
    skills: ['Gardening', 'Environmental Education'],
    description: 'Rotate through planting beds, prep compost, and host student eco-tours during Saturday mornings.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1080&q=80',
    matchScore: 72,
    defaultState: 'joined'
  }
];

interface OpportunityFinderProps {
  onNavigate: (item: string) => void;
  onLogout?: () => void;
}

export function OpportunityFinder({ onNavigate, onLogout }: OpportunityFinderProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Delivery Driver', 'Food Handling']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Food']);
  const [showDateModal, setShowDateModal] = useState(false);
  const [activeOpportunityId, setActiveOpportunityId] = useState<number | null>(null);
  const [bookingSummary, setBookingSummary] = useState<{
    heading: string;
    joined: string[];
    waitlisted: string[];
  } | null>(null);
  const [opportunityStatus, setOpportunityStatus] = useState<Record<number, 'available' | 'joined' | 'waitlisted'>>(() => {
    const initial: Record<number, 'available' | 'joined' | 'waitlisted'> = {};
    opportunityCatalog.forEach((opp) => {
      initial[opp.id] = opp.defaultState ?? 'available';
    });
    return initial;
  });
  const [slotSelections, setSlotSelections] = useState<Record<number, SelectedSlotSummary[]>>(() => {
    const initial: Record<number, SelectedSlotSummary[]> = {};
    opportunityCatalog.forEach((opp) => {
      if (opp.defaultState) {
        initial[opp.id] = opp.type === 'Multi-Shift'
          ? [
              {
                id: 'nov-12',
                date: 'Nov 12, 2025',
                time: '9:00 AM - 12:00 PM',
                result: 'confirmed'
              },
              {
                id: 'nov-19',
                date: 'Nov 19, 2025',
                time: '9:00 AM - 12:00 PM',
                result: 'confirmed'
              }
            ]
          : [
              {
                id: `single-${opp.id}`,
                date: opp.date,
                time: opp.time,
                result: opp.defaultState === 'joined' ? 'confirmed' : 'waitlist'
              }
            ];
      }
    });
    return initial;
  });

  // User profile skills/qualifications
  const userSkills = ['Delivery Driver', 'Food Handling', 'Teaching/Education'];

  const opportunities = opportunityCatalog;

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

  const activeOpportunity = activeOpportunityId ? opportunities.find((opp) => opp.id === activeOpportunityId) : null;

  const formatSlotLabel = (slot: SelectedSlotSummary) => `${slot.date} • ${slot.time}`;

  const openSummaryModal = (heading: string, slots: SelectedSlotSummary[]) => {
    const joined = slots.filter((slot) => slot.result === 'confirmed').map(formatSlotLabel);
    const waitlisted = slots.filter((slot) => slot.result === 'waitlist').map(formatSlotLabel);
    setBookingSummary({ heading, joined, waitlisted });
  };

  const handleSingleEventAction = (opp: Opportunity) => {
    const result = opp.spotsLeft === 0 ? 'waitlist' : 'confirmed';
    const slot: SelectedSlotSummary = {
      id: `single-${opp.id}`,
      date: opp.date,
      time: opp.time,
      result
    };
    setSlotSelections((prev) => ({ ...prev, [opp.id]: [slot] }));
    setOpportunityStatus((prev) => ({ ...prev, [opp.id]: result === 'confirmed' ? 'joined' : 'waitlisted' }));
    openSummaryModal(opp.title, [slot]);
  };

  const handleDateConfirm = (slots: SelectedSlotSummary[]) => {
    if (!activeOpportunity || slots.length === 0) {
      setShowDateModal(false);
      setActiveOpportunityId(null);
      return;
    }
    const joinedSlots = slots.filter((slot) => slot.result === 'confirmed');
    const waitlistedSlots = slots.filter((slot) => slot.result === 'waitlist');

    setSlotSelections((prev) => ({ ...prev, [activeOpportunity.id]: slots }));
    setOpportunityStatus((prev) => ({
      ...prev,
      [activeOpportunity.id]: joinedSlots.length > 0 ? 'joined' : waitlistedSlots.length > 0 ? 'waitlisted' : prev[activeOpportunity.id]
    }));

    openSummaryModal(activeOpportunity.title, slots);
    setShowDateModal(false);
    setActiveOpportunityId(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNavigation activeItem="Find Opportunities" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Header with Smart Discovery Badge */}
        <div className="mb-12">
          <button
            onClick={() => onNavigate('Home')}
            style={{ color: '#779F8D', fontWeight: 600, marginBottom: '16px', background: 'transparent', border: 'none', cursor: 'pointer' }}
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
                {SKILL_OPTIONS.map((skill) => (
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
                {INTEREST_OPTIONS.map((interest) => (
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
                const status = opportunityStatus[opp.id];
                const selections = slotSelections[opp.id] || [];
                const confirmedSelections = selections.filter((slot) => slot.result === 'confirmed');
                const waitlistedSelections = selections.filter((slot) => slot.result === 'waitlist');
                const isMultiShift = opp.type === 'Multi-Shift';
                const nextScheduled = isMultiShift && confirmedSelections.length > 0 ? confirmedSelections[0] : null;
                const isFullSingle = opp.spotsLeft === 0 && opp.type === 'Single Event';
                const isJoined = status === 'joined';
                const isWaitlisted = status === 'waitlisted';
                const isJoinWaitlistCTA = !isMultiShift && isFullSingle && !isWaitlisted;

                const actionLabel = (() => {
                  if (isMultiShift) {
                    return isJoined ? 'Schedule more' : 'Select Dates';
                  }
                  if (isFullSingle) {
                    return isWaitlisted ? 'Waitlist Submitted' : 'Join Waitlist';
                  }
                  return isJoined ? 'Added to Schedule' : 'Sign Up';
                })();

                const actionDisabled =
                  needsQualification ||
                  (!isMultiShift && (isJoined || (isWaitlisted && isFullSingle)));

                const handleActionClick = () => {
                  if (actionDisabled) return;
                  if (isMultiShift) {
                    setActiveOpportunityId(opp.id);
                    setShowDateModal(true);
                    return;
                  }
                  handleSingleEventAction(opp);
                };

                return (
                  <div
                    key={opp.id}
                    className="shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col h-full"
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
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>
                          {opp.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {opp.type === 'Multi-Shift' && <Badge variant="success">Recurring</Badge>}
                          {isFullSingle && <Badge variant="warning">Waitlist</Badge>}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 flex-1">
                        {isJoined && (
                          <div
                            className="flex items-center gap-2 px-3 py-2"
                            style={{
                              backgroundColor: '#F0F7F4',
                              borderRadius: '100px',
                              border: '1px solid #779F8D'
                            }}
                          >
                            <CheckCircle2 size={16} style={{ color: '#779F8D' }} />
                            <span style={{ color: '#2C3E50', fontSize: '13px', fontWeight: 600 }}>
                              Added to upcoming shifts
                            </span>
                          </div>
                        )}

                        {isWaitlisted && (
                          <div
                            className="flex items-center gap-2 px-3 py-2"
                            style={{
                              backgroundColor: '#FFF8E1',
                              borderRadius: '100px',
                              border: '1px solid #FFB74D'
                            }}
                          >
                            <AlertTriangle size={16} style={{ color: '#FFB74D' }} />
                            <span style={{ color: '#2C3E50', fontSize: '13px', fontWeight: 600 }}>
                              On waitlist — we will notify you
                            </span>
                          </div>
                        )}

                        <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8 }}>
                          {opp.description}
                        </p>

                        {/* Skills Tags with Match Highlighting */}
                        <div className="flex flex-wrap gap-2">
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

                        <div className="space-y-2">
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
                            <span>{opp.totalSpots - opp.spotsLeft} of {opp.totalSpots} spots filled</span>
                          </div>
                        </div>

                        {needsQualification ? (
                          <div 
                            className="p-3"
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

                        {isMultiShift
                          ? nextScheduled && (
                              <div
                                className="p-3"
                                style={{
                                  backgroundColor: '#E9F3EE',
                                  borderRadius: '12px',
                                  border: '1px solid #C7E0D4'
                                }}
                              >
                                <div style={{ color: '#2C3E50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                                  Next Scheduled
                                </div>
                                <div style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px' }}>
                                  • {nextScheduled.date} • {nextScheduled.time}
                                </div>
                                {confirmedSelections.length > 1 && (
                                  <div style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.75, marginTop: '2px' }}>
                                    {confirmedSelections.length} shifts active
                                  </div>
                                )}
                              </div>
                            )
                          : confirmedSelections.length > 0 && (
                              <div
                                className="p-3"
                                style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '1px solid #779F8D' }}
                              >
                                <div style={{ color: '#2C3E50', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>Scheduled</div>
                                <ul style={{ color: '#2C3E50', fontSize: '13px', lineHeight: 1.6 }}>
                                  {confirmedSelections.map((slot) => (
                                    <li key={`${opp.id}-${slot.id}`}>• {formatSlotLabel(slot)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                        {waitlistedSelections.length > 0 && (
                          <div
                            className="p-3"
                            style={{ backgroundColor: '#FFF8E1', borderRadius: '8px', border: '1px solid #FFB74D' }}
                          >
                            <div style={{ color: '#2C3E50', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>Waitlist</div>
                            <ul style={{ color: '#2C3E50', fontSize: '13px', lineHeight: 1.6 }}>
                              {waitlistedSelections.map((slot) => (
                                <li key={`${opp.id}-${slot.id}`}>• {formatSlotLabel(slot)}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="primary"
                        onClick={handleActionClick}
                        className="w-full mt-4"
                        disabled={actionDisabled}
                        style={
                          isJoinWaitlistCTA
                            ? {
                                backgroundColor: '#FFB74D',
                                color: '#2C3E50',
                                border: 'none',
                                boxShadow: '0 10px 20px rgba(255, 183, 77, 0.35)'
                              }
                            : undefined
                        }
                      >
                        {actionLabel}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showDateModal && activeOpportunity && (
        <DateSelectionModal
          eventTitle={activeOpportunity.title}
          initialSelections={slotSelections[activeOpportunity.id]}
          onClose={() => {
            setShowDateModal(false);
            setActiveOpportunityId(null);
          }}
          onConfirm={handleDateConfirm}
        />
      )}

      {bookingSummary && (
        <BookingConfirmationModal
          heading={bookingSummary.heading}
          joinedEntries={bookingSummary.joined}
          waitlistedEntries={bookingSummary.waitlisted}
          onClose={() => setBookingSummary(null)}
        />
      )}
    </div>
  );
}
