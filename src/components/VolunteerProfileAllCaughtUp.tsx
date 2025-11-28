import { User, Mail, Phone, CheckCircle } from 'lucide-react';
import { TopNavigation } from './TopNavigation';
import { SKILL_OPTIONS, INTEREST_OPTIONS } from '@/constants/skills';

interface VolunteerProfileAllCaughtUpProps {
  onNavigate: (item: string) => void;
}

export function VolunteerProfileAllCaughtUp({ onNavigate }: VolunteerProfileAllCaughtUpProps) {
  const selectedSkillSet = new Set(['Delivery Driver', 'Food Handling', 'First Aid']);
  const selectedInterestSet = new Set(['Food', 'Education']);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <TopNavigation activeItem="Profile" onNavigate={onNavigate} />
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '40px', marginBottom: '8px' }}>My Profile</h1>
        <p style={{ color: '#2C3E50', fontSize: '18px', opacity: 0.8, marginBottom: '32px' }}>Manage your contact info, skills and interests</p>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>Contact Information</h2>
              </div>
              <div className="space-y-3" style={{ color: '#2C3E50', fontSize: '14px' }}>
                <div className="flex items-center gap-2"><User size={16} /> Brighton Tan</div>
                <div className="flex items-center gap-2"><Mail size={16} /> brighton.tan@example.com</div>
                <div className="flex items-center gap-2"><Phone size={16} /> +65 8123 4567</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>Skills</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {SKILL_OPTIONS.map((skill) => {
                  const isSelected = selectedSkillSet.has(skill);
                  return (
                    <div
                      key={skill}
                      style={{
                        backgroundColor: isSelected ? '#F0F7F4' : '#FFFFFF',
                        color: isSelected ? '#779F8D' : '#2C3E50',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: 600,
                        border: `1px solid ${isSelected ? '#779F8D' : '#E0E0E0'}`,
                        opacity: isSelected ? 1 : 0.5
                      }}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>Interests</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = selectedInterestSet.has(interest);
                  return (
                    <div
                      key={interest}
                      style={{
                        backgroundColor: isSelected ? '#F0F7F4' : '#FFFFFF',
                        color: isSelected ? '#779F8D' : '#2C3E50',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: 600,
                        border: `1px solid ${isSelected ? '#779F8D' : '#E0E0E0'}`,
                        opacity: isSelected ? 1 : 0.5
                      }}
                    >
                      {interest}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* All Caught Up Section */}
            <div style={{ backgroundColor: '#F0F7F4', borderRadius: '12px', padding: '32px', border: '2px solid #779F8D' }}>
              <div className="flex flex-col items-center text-center">
                <div style={{ backgroundColor: '#779F8D', borderRadius: '50%', padding: '16px', marginBottom: '16px' }}>
                  <CheckCircle size={48} style={{ color: '#FFFFFF' }} />
                </div>
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '12px' }}>All Caught Up!</h2>
                <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8 }}>
                  All your documents have been verified and approved. You're ready to volunteer!
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '16px' }}>Set Availability</h2>
              <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8, marginBottom: '16px' }}>Select days you are typically free to volunteer</p>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <label key={day} className="flex items-center gap-3 cursor-pointer p-2" style={{ borderRadius: '8px', backgroundColor: '#F5F7FA' }}>
                    <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#779F8D' }} />
                    <span style={{ color: '#2C3E50', fontWeight: 500 }}>{day}</span>
                  </label>
                ))}
              </div>
              <button style={{ backgroundColor: '#779F8D', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%', marginTop: '16px' }}>Save Availability</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
