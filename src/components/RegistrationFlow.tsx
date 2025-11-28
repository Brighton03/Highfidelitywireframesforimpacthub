import { useState, ReactNode } from 'react';
import { Button } from './Button';
import { ArrowLeft, CheckCircle2, User, Mail, Lock, MapPin, Calendar, Phone, AlertTriangle, Edit3, X } from 'lucide-react';
import { SKILL_OPTIONS, INTEREST_OPTIONS, SKILL_DOCUMENT_REQUIREMENTS, createHighRiskSkillSet } from '@/constants/skills';

export function RegistrationFlow() {
  const [step, setStep] = useState<'registration' | 'otp' | 'profile' | 'skills' | 'review' | 'confirmation'>('registration');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [phoneExists, setPhoneExists] = useState(false);
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [editingSection, setEditingSection] = useState<'account' | 'profile' | 'skills' | null>(null);
  const [draftAccount, setDraftAccount] = useState({ fullName: '', phone: '', email: '' });
  const [draftProfile, setDraftProfile] = useState({ location: '', dateOfBirth: '' });
  const [draftSkillsSelection, setDraftSkillsSelection] = useState<{ skills: string[]; interests: string[] }>({ skills: [], interests: [] });

  const stepSequence: Array<'registration' | 'otp' | 'profile' | 'skills' | 'review' | 'confirmation'> = ['registration', 'otp', 'profile', 'skills', 'review', 'confirmation'];
  const currentStepIndex = stepSequence.indexOf(step);
  const progressRatio = currentStepIndex / Math.max(1, stepSequence.length - 1);
  const registrationSkills = SKILL_OPTIONS;
  const interestOptions = INTEREST_OPTIONS;
  const skillDocumentRequirements = SKILL_DOCUMENT_REQUIREMENTS;
  const highRiskSkillSet = createHighRiskSkillSet();
  const pendingDocuments = selectedSkills
    .filter((skill) => Boolean(skillDocumentRequirements[skill]))
    .map((skill) => ({
      skill,
      documents: skillDocumentRequirements[skill] as string[]
    }));
  const requiresSafetyDocs = pendingDocuments.length > 0;
  const previousLabelMap: Record<'registration' | 'otp' | 'profile' | 'skills' | 'review' | 'confirmation', string | null> = {
    registration: null,
    otp: 'Registration',
    profile: 'Verification',
    skills: 'Profile',
    review: 'Skills & Interests',
    confirmation: null
  };
  const safetyCheckPillStyle = {
    backgroundColor: 'transparent',
    color: '#FFB74D',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap'
  } as const;

  const checkPhoneUniqueness = (rawPhone: string) => {
    const normalized = rawPhone.replace(/\s+/g, '');
    const existingPhones = ['+6581234567', '+6598765432'];
    const duplicate = existingPhones.includes(normalized);
    setPhoneExists(duplicate);
    return duplicate;
  };

  const handleRegistrationContinue = () => {
    const normalized = phone.trim();
    if (!normalized) return;
    if (checkPhoneUniqueness(normalized)) {
      return;
    }
    setPhone(normalized);
    setStep('otp');
  };

  const goToPreviousStep = () => {
    const currentIndex = stepSequence.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepSequence[currentIndex - 1]);
    }
  };

  const renderBackButton = () => {
    const label = previousLabelMap[step];
    if (!label) return null;
    return (
      <button
        onClick={goToPreviousStep}
        className="flex items-center gap-2 mb-6"
        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#2C3E50', fontWeight: 600 }}
      >
        <ArrowLeft size={18} style={{ color: '#779F8D' }} />
        Back to {label}
      </button>
    );
  };

  const toggleSkillSelection = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterestSelection = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const openEditModal = (section: 'account' | 'profile' | 'skills') => {
    if (section === 'account') {
      setDraftAccount({ fullName, phone, email });
    } else if (section === 'profile') {
      setDraftProfile({ location, dateOfBirth });
    } else {
      setDraftSkillsSelection({ skills: [...selectedSkills], interests: [...selectedInterests] });
    }
    setEditingSection(section);
  };

  const handleModalCancel = () => setEditingSection(null);

  const handleModalSave = () => {
    if (!editingSection) return;

    if (editingSection === 'account') {
      setFullName(draftAccount.fullName);
      setPhone(draftAccount.phone);
      setEmail(draftAccount.email);
      setPhoneExists(false);
    } else if (editingSection === 'profile') {
      setLocation(draftProfile.location);
      setDateOfBirth(draftProfile.dateOfBirth);
    } else {
      setSelectedSkills(draftSkillsSelection.skills);
      setSelectedInterests(draftSkillsSelection.interests);
    }

    setEditingSection(null);
  };

  const toggleDraftSkill = (skill: string) => {
    setDraftSkillsSelection((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((entry) => entry !== skill) : [...prev.skills, skill]
      };
    });
  };

  const toggleDraftInterest = (interest: string) => {
    setDraftSkillsSelection((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((entry) => entry !== interest) : [...prev.interests, interest]
      };
    });
  };

  const renderEditModal = () => {
    if (!editingSection) return null;

    let modalTitle = '';
    let modalContent: ReactNode = null;

    if (editingSection === 'account') {
      modalTitle = 'Edit Account Details';
      modalContent = (
        <div className="space-y-4">
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Full Name</label>
            <input
              type="text"
              value={draftAccount.fullName}
              onChange={(e) => setDraftAccount((prev) => ({ ...prev, fullName: e.target.value }))}
              className="w-full px-4 py-3 border"
              style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
            />
          </div>
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Phone Number</label>
            <input
              type="tel"
              value={draftAccount.phone}
              onChange={(e) => setDraftAccount((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border"
              style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
            />
          </div>
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Email Address</label>
            <input
              type="email"
              value={draftAccount.email}
              onChange={(e) => setDraftAccount((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border"
              style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
            />
          </div>
        </div>
      );
    } else if (editingSection === 'profile') {
      modalTitle = 'Edit Profile & Availability';
      modalContent = (
        <div className="space-y-4">
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Location</label>
            <input
              type="text"
              value={draftProfile.location}
              onChange={(e) => setDraftProfile((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-3 border"
              style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
            />
          </div>
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Date of Birth</label>
            <input
              type="date"
              value={draftProfile.dateOfBirth}
              onChange={(e) => setDraftProfile((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
              className="w-full px-4 py-3 border"
              style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
            />
          </div>
        </div>
      );
    } else {
      modalTitle = 'Edit Skills & Interests';
      modalContent = (
        <div className="space-y-6">
          <div>
            <h4 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>Skills</h4>
            <div className="grid grid-cols-2 gap-3">
              {registrationSkills.map((skill: string) => {
                const isSelected = draftSkillsSelection.skills.includes(skill);
                const isHighRisk = highRiskSkillSet.has(skill);
                return (
                  <label
                    key={`draft-${skill}`}
                    className="flex items-center justify-between gap-2 p-3 border cursor-pointer"
                    style={{
                      borderColor: isSelected ? '#779F8D' : '#E0E0E0',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#F0F7F4' : '#FFFFFF'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleDraftSkill(skill)}
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50', fontWeight: 500 }}>{skill}</span>
                    </div>
                    {isHighRisk && (
                      <span style={safetyCheckPillStyle}>
                        <AlertTriangle size={14} style={{ color: '#FFB74D' }} />
                        Safety check
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>Interests</h4>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest: string) => {
                const isSelected = draftSkillsSelection.interests.includes(interest);
                return (
                  <label
                    key={`draft-interest-${interest}`}
                    className="flex items-center gap-2 p-3 border cursor-pointer"
                    style={{ borderColor: '#E0E0E0', borderRadius: '8px', backgroundColor: isSelected ? '#F0F7F4' : '#FFFFFF' }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleDraftInterest(interest)}
                      style={{ accentColor: '#779F8D' }}
                    />
                    <span style={{ color: '#2C3E50' }}>{interest}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 60 }}>
        <div className="w-full max-w-2xl p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>{modalTitle}</h2>
            <button onClick={handleModalCancel} style={{ border: 'none', background: 'transparent', color: '#2C3E50', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          {modalContent}
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={handleModalCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleModalSave}>
              Save changes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Progress Indicator */}
      <div className="w-full bg-white border-b shadow-sm" style={{ borderColor: '#E0E0E0' }}>
        <div className="max-w-[800px] mx-auto px-8 py-8">
          <div className="relative flex items-center justify-between">
            {/* Progress Line Background */}
            <div
              className="absolute top-5 h-1"
              style={{
                backgroundColor: '#E0E0E0',
                left: '20px',
                right: '20px',
                zIndex: 0
              }}
            />
            {/* Progress Line Fill */}
            <div
              className="absolute top-5 h-1 transition-all"
              style={{
                backgroundColor: '#779F8D',
                left: '20px',
                width: `calc(${progressRatio} * (100% - 40px))`,
                zIndex: 1
              }}
            />

            {['Registration', 'Verify', 'Profile', 'Skills', 'Review', 'Complete'].map((label, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={label} className="flex flex-col items-center relative">
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-2 transition-all"
                    style={{
                      backgroundColor: isActive || isCompleted ? '#779F8D' : '#E0E0E0',
                      borderRadius: '50%',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      boxShadow: isActive ? '0 4px 12px rgba(119, 159, 141, 0.4)' : 'none',
                      zIndex: 10
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={20} /> : index + 1}
                  </div>
                  <span style={{ color: isActive ? '#2C3E50' : '#9E9E9E', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[600px] mx-auto px-8 py-12">
        {step === 'registration' && (
          <div
            className="p-8"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Register as a Volunteer
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Join ImpactHub and start making a difference in your community
            </p>

            <div className="space-y-4">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Full Name
                </label>
                <div className="relative">
                  <User size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 border"
                    style={{
                      borderColor: '#E0E0E0',
                      borderRadius: '12px',
                      color: '#2C3E50',
                      outline: 'none',
                      height: '48px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Phone Number (for OTP)
                </label>
                <div className="relative">
                  <Phone size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneExists) setPhoneExists(false);
                    }}
                    placeholder="e.g. +6581234567"
                    className="w-full pl-10 pr-4 py-3 border"
                    style={{
                      borderColor: '#E0E0E0',
                      borderRadius: '8px',
                      color: '#2C3E50',
                      outline: 'none'
                    }}
                  />
                </div>
                {phoneExists && (
                  <p style={{ color: '#E57373', fontSize: '12px', marginTop: '4px' }}>
                    This phone number is already registered.
                  </p>
                )}
              </div>

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
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

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="password"
                    placeholder="Create a strong password"
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

              <Button
                variant="primary"
                onClick={handleRegistrationContinue}
                className="w-full mt-6"
                disabled={!phone}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'otp' && (
          <div
            className="p-8"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            {renderBackButton()}
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Verify Your Phone Number
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              We've sent a verification code via SMS to {phone || 'your phone number'}
            </p>

            <div className="space-y-4">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Enter OTP Code
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="000000"
                  className="w-full px-4 py-3 border text-center"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    fontSize: '24px',
                    fontWeight: 600,
                    letterSpacing: '8px',
                    outline: 'none'
                  }}
                  maxLength={6}
                />
              </div>

              <div className="text-center">
                <button style={{ color: '#779F8D', fontWeight: 500 }}>
                  Resend via SMS
                </button>
              </div>

              <Button variant="primary" onClick={() => setStep('profile')} className="w-full mt-6">
                Verify
              </Button>
            </div>
          </div>
        )}

        {step === 'profile' && (
          <div
            className="p-8"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            {renderBackButton()}
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Complete Your Profile
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Tell us more about yourself
            </p>

            <div className="space-y-4">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Location
                </label>
                <div className="relative">
                  <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your city or zip code"
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

              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
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

              <Button variant="primary" onClick={() => setStep('skills')} className="w-full mt-6">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'skills' && (
          <div
            className="p-8"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            {renderBackButton()}
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Select Your Skills & Interests
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              This helps us match you with relevant opportunities
            </p>

            <div className="space-y-6">
              <div>
                <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                  Skills
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {registrationSkills.map((skill: string) => {
                    const isSelected = selectedSkills.includes(skill);
                    const isHighRisk = highRiskSkillSet.has(skill);
                    return (
                      <label
                        key={skill}
                        className="flex items-center justify-between gap-2 p-3 border cursor-pointer transition-all"
                        style={{
                          borderColor: isSelected ? '#779F8D' : '#E0E0E0',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#F0F7F4' : '#FFFFFF',
                          boxShadow: isSelected ? '0 8px 20px rgba(119,159,141,0.12)' : 'none'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSkillSelection(skill)}
                            style={{ accentColor: '#779F8D' }}
                          />
                          <span style={{ color: '#2C3E50', fontWeight: 500 }}>{skill}</span>
                        </div>
                        {isHighRisk && (
                          <span style={safetyCheckPillStyle}>
                            <AlertTriangle size={14} style={{ color: '#FFB74D' }} />
                            Safety check
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                <div
                  className="flex items-center gap-3 mt-4"
                  style={{
                    color: '#2C3E50',
                    fontSize: '12px',
                    backgroundColor: '#F5F7FA',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} color="#2C3E50" />
                    <span style={{ color: '#2C3E50', fontWeight: 600 }}>Safety check</span>
                  </div>
                  <div>High-risk selections require document verification before you can be scheduled.</div>
                </div>

                {requiresSafetyDocs && (
                  <div
                    className="mt-4 p-4"
                    style={{
                      backgroundColor: '#FFF8E1',
                      borderRadius: '8px',
                      border: '1px solid #FFB74D'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} style={{ color: '#FFB74D' }} />
                      <div>
                        <div style={{ color: '#2C3E50', fontWeight: 600 }}>Documents required after registration</div>
                        <p style={{ color: '#2C3E50', fontSize: '13px', marginTop: '4px' }}>
                          The following credentials must be uploaded once your profile is set up so we can activate these roles safely:
                        </p>
                        <ul style={{ marginTop: '12px', color: '#2C3E50', fontSize: '13px', paddingLeft: '18px', lineHeight: 1.6 }}>
                          {pendingDocuments.map((entry) => (
                            <li key={entry.skill}>
                              <strong>{entry.skill}:</strong> {entry.documents.join(', ')}
                            </li>
                          ))}
                        </ul>
                        <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '12px' }}>
                          Upload the proof anytime from your Profile tab after registration so we can activate these roles.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                  Interests
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((interest: string) => (
                    <label
                      key={interest}
                      className="flex items-center gap-2 p-3 border cursor-pointer transition-colors"
                      style={{
                        borderColor: '#E0E0E0',
                        borderRadius: '8px'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedInterests.includes(interest)}
                        onChange={() => toggleInterestSelection(interest)}
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50' }}>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="primary" onClick={() => setStep('review')} className="w-full mt-6">
                Review your details
              </Button>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div
            className="p-8"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            {renderBackButton()}
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Review & Confirm
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Double-check your profile before submitting. You can still edit any section below.
            </p>

            <div className="space-y-6">
              <div className="p-6"
                style={{ border: '1px solid #E0E0E0', borderRadius: '12px', backgroundColor: '#FDFDFD' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: '#2C3E50', fontWeight: 600 }}>Account Details</h3>
                  <button
                    type="button"
                    onClick={() => openEditModal('account')}
                    className="flex items-center gap-2"
                    style={{ border: 'none', background: 'transparent', color: '#779F8D', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '4px' }}>Full Name</p>
                    <p style={{ color: '#2C3E50', fontWeight: 600 }}>{fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '4px' }}>Phone</p>
                    <p style={{ color: '#2C3E50', fontWeight: 600 }}>{phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '4px' }}>Email</p>
                    <p style={{ color: '#2C3E50', fontWeight: 600 }}>{email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '4px' }}>OTP Status</p>
                    <p style={{ color: '#2C3E50', fontWeight: 600 }}>{otpCode.length === 6 ? 'Verified' : 'Pending verification'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6"
                style={{ border: '1px solid #E0E0E0', borderRadius: '12px', backgroundColor: '#FDFDFD' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: '#2C3E50', fontWeight: 600 }}>Profile & Availability</h3>
                  <button
                    type="button"
                    onClick={() => openEditModal('profile')}
                    className="flex items-center gap-2"
                    style={{ border: 'none', background: 'transparent', color: '#779F8D', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '4px' }}>Location</p>
                    <p style={{ color: '#2C3E50', fontWeight: 600 }}>{location || 'Not provided'}</p>
                  </div>
                  <div>
                    <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '4px' }}>Date of Birth</p>
                    <p style={{ color: '#2C3E50', fontWeight: 600 }}>{dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div className="col-span-2">
                    <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '4px' }}>General Availability</p>
                    <p style={{ color: '#2C3E50', fontWeight: 600 }}>Weekends, 9AM - 1PM (editable placeholder)</p>
                  </div>
                </div>
              </div>

              <div className="p-6"
                style={{ border: '1px solid #E0E0E0', borderRadius: '12px', backgroundColor: '#FDFDFD' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 style={{ color: '#2C3E50', fontWeight: 600 }}>Skills & Interests</h3>
                  <button
                    type="button"
                    onClick={() => openEditModal('skills')}
                    className="flex items-center gap-2"
                    style={{ border: 'none', background: 'transparent', color: '#779F8D', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                </div>
                <div className="mb-4">
                  <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '8px' }}>Skills selected</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.length > 0 ? (
                      selectedSkills.map((skill) => (
                        <span key={skill} style={{ backgroundColor: '#F0F7F4', color: '#2C3E50', borderRadius: '999px', padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#9E9E9E' }}>No skills selected</span>
                    )}
                  </div>
                </div>
                <div>
                  <p style={{ color: '#9E9E9E', fontSize: '12px', marginBottom: '8px' }}>Interests selected</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterests.length > 0 ? (
                      selectedInterests.map((interest) => (
                        <span key={interest} style={{ backgroundColor: '#E8EEF2', color: '#2C3E50', borderRadius: '999px', padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}>
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#9E9E9E' }}>No interests selected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button variant="primary" className="w-full mt-8" onClick={() => setStep('confirmation')}>
              Submit registration
            </Button>
          </div>
        )}

        {step === 'confirmation' && (
          <div
            className="p-8 text-center"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            {renderBackButton()}
            <div
              className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
            >
              <CheckCircle2 size={48} color="#FFFFFF" />
            </div>

            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '16px' }}>
              Welcome to ImpactHub!
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Your account has been created successfully. You're now ready to start volunteering and making an impact.
            </p>

            {requiresSafetyDocs && (
              <div
                className="p-4 mb-4 text-left"
                style={{
                  backgroundColor: '#FFF8E1',
                  borderRadius: '8px',
                  border: '1px solid #FFB74D'
                }}
              >
                <div className="flex gap-3">
                  <AlertTriangle size={24} style={{ color: '#FFB74D' }} />
                  <div>
                    <div style={{ color: '#2C3E50', fontWeight: 600 }}>Safety verification pending</div>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginTop: '4px' }}>
                      These credentials must be uploaded in your dashboard before you can be scheduled for the highlighted roles:
                    </p>
                    <ul style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px', paddingLeft: '18px', lineHeight: 1.6 }}>
                      {pendingDocuments.map((entry) => (
                        <li key={`${entry.skill}-confirmation`}>
                          {entry.skill}: {entry.documents.join(', ')}
                        </li>
                      ))}
                    </ul>
                    <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
                      Look for the “Upload proof” alert on your volunteer dashboard right after onboarding.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              className="p-6 mb-6"
              style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '16px' }}>
                Next Steps:
              </h3>
              <ul className="text-left space-y-2">
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>✓ Profile created and verified</li>
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>✓ Skills and interests saved</li>
                {requiresSafetyDocs && (
                  <li style={{ color: '#2C3E50', fontSize: '14px' }}>• Submit: {pendingDocuments.map((entry) => `${entry.documents.join(', ')}`).join('; ')}</li>
                )}
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>• Browse available opportunities</li>
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>• Sign up for your first event</li>
                <li style={{ color: '#2C3E50', fontSize: '14px' }}>• Start tracking your impact</li>
              </ul>
            </div>

            <Button variant="primary" className="w-full">
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
      {renderEditModal()}
    </div>
  );
}