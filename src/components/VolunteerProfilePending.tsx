import { User, Mail, Phone, AlertCircle, Upload, CheckCircle2 } from 'lucide-react';
import { TopNavigation } from './TopNavigation';
import { SKILL_OPTIONS, INTEREST_OPTIONS, SKILL_DOCUMENT_REQUIREMENTS } from '@/constants/skills';

interface VolunteerProfilePendingProps {
  onNavigate: (item: string) => void;
}

export function VolunteerProfilePending({ onNavigate }: VolunteerProfilePendingProps) {
  const selectedSkillSet = new Set(['Delivery Driver', 'Food Handling', 'First Aid']);
  const selectedInterestSet = new Set(['Food', 'Education']);
  const complianceDocuments = [
    {
      title: 'Driver License',
      skill: 'Delivery Driver',
      status: 'pending' as const,
      requiredFor: 'Delivery Driver'
    },
    {
      title: 'Food Handling Certificate',
      skill: 'Food Handling',
      status: 'verified' as const,
      requiredFor: 'Food Handling',
      verifiedOn: 'Oct 18, 2025'
    },
    {
      title: 'First Aid Certification',
      skill: 'First Aid',
      status: 'verified' as const,
      requiredFor: 'First Aid',
      verifiedOn: 'Oct 21, 2025'
    }
  ];
  const pendingSkillSet = new Set(
    complianceDocuments.filter((doc) => doc.status === 'pending').map((doc) => doc.skill)
  );

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
                  const isPending = pendingSkillSet.has(skill);
                  return (
                    <div
                      key={skill}
                      style={{
                        backgroundColor: isPending ? '#FFF4E6' : isSelected ? '#F0F7F4' : '#FFFFFF',
                        color: isPending ? '#C05621' : isSelected ? '#779F8D' : '#2C3E50',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: 600,
                        border: `1px solid ${isPending ? '#FFB74D' : isSelected ? '#779F8D' : '#E0E0E0'}`,
                        opacity: isSelected ? 1 : 0.5,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isPending && (
                        <AlertCircle size={14} style={{ color: '#C05621' }} />
                      )}
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
            {/* Pending Documents Section */}
            <div style={{ backgroundColor: '#FFF4E6', borderRadius: '12px', padding: '24px', border: '2px solid #FFB74D' }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={24} style={{ color: '#F4A261' }} />
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px' }}>Document Upload Required</h2>
              </div>
              <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8, marginBottom: '20px' }}>
                You have selected high-risk skills that require additional verification. Please upload the required documents.
              </p>

              <div className="space-y-4">
                {complianceDocuments.map((doc) => {
                  if (doc.status === 'pending') {
                    return (
                      <div key={doc.title} className="p-4" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '2px dashed #FFB74D' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>{doc.title}</span>
                          <span style={{ color: '#F4A261', fontSize: '12px', fontWeight: 600 }}>PENDING</span>
                        </div>
                        <p style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.7, marginBottom: '12px' }}>
                          Required for: {doc.requiredFor}
                        </p>
                        <label className="flex items-center justify-center gap-2 p-3 cursor-pointer" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', border: '1px dashed #E0E0E0' }}>
                          <Upload size={16} style={{ color: '#779F8D' }} />
                          <span style={{ color: '#779F8D', fontSize: '14px', fontWeight: 600 }}>Upload Document</span>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    );
                  }

                  return (
                    <div key={doc.title} className="p-4" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px dashed #81C784' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={18} style={{ color: '#81C784' }} />
                          <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>{doc.title}</span>
                        </div>
                        <span
                          style={{
                            backgroundColor: '#81C784',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: '999px',
                            padding: '2px 10px'
                          }}
                        >
                          VERIFIED
                        </span>
                      </div>
                      <p style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.8 }}>
                        Required for: {doc.requiredFor}
                      </p>
                      {doc.verifiedOn && (
                        <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
                          Verified on {doc.verifiedOn}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button style={{ backgroundColor: '#779F8D', color: '#FFFFFF', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%', marginTop: '16px' }}>
                Submit Documents
              </button>
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
