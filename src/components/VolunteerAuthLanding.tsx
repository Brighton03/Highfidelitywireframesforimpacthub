import { Button } from './Button';
import { ShieldCheck, Heart, Calendar } from 'lucide-react';

interface VolunteerAuthLandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

const featureHighlights = [
  { icon: ShieldCheck, label: 'Safe & Secure' },
  { icon: Heart, label: 'Meaningful Work' },
  { icon: Calendar, label: 'Flexible Scheduling' }
];

export function VolunteerAuthLanding({ onLogin, onRegister }: VolunteerAuthLandingProps) {
  return (
    <div
      style={{
        backgroundColor: '#F5F7FA',
        minHeight: '100vh',
        padding: '56px 0'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
            alignItems: 'stretch'
          }}
        >
          <div
            style={{
              flex: '1 1 520px',
              backgroundColor: '#2C3E50',
              borderRadius: '20px',
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              boxShadow: '0 30px 60px rgba(21, 35, 56, 0.35)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '560px' }}>
              <span
                style={{
                  alignSelf: 'flex-start',
                  padding: '8px 20px',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  borderRadius: '100px',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                ImpactHub Volunteers
              </span>
              <div>
                <h1
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '42px',
                    lineHeight: 1.2,
                    marginBottom: '16px'
                  }}
                >
                  Ready to create community impact?
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', lineHeight: 1.7 }}>
                  Continue your volunteering journey or register to join thousands of active volunteers delivering meals,
                  tutoring students, and supporting urgent operations every week.
                </p>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'space-between'
              }}
            >
              {featureHighlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  style={{
                    flex: '1 1 140px',
                    minWidth: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: '#FFFFFF'
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={24} color="#FFFFFF" />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '16px' }}>{label}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '24px',
                flexWrap: 'wrap',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <div style={{ flex: '1 1 220px', color: '#FFFFFF' }}>
                <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>Set your impact goals</p>
                <p style={{ margin: 0, opacity: 0.85 }}>
                  We guide you through onboarding, safety verification, and curated opportunity matching.
                </p>
              </div>
              <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '6px', color: '#FFFFFF', fontSize: '14px' }}>
                <span>• Activate your credentialed skills in minutes</span>
                <span>• Sync shifts directly to your calendar</span>
                <span>• Get notified when urgent roles open</span>
              </div>
            </div>
          </div>

          <div
            style={{
              flex: '1 1 360px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '32px',
                boxShadow: '0 18px 40px rgba(120, 136, 160, 0.16)'
              }}
            >
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '12px' }}>
                Returning Volunteer Login
              </h2>
              <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
                Access your dashboard, log hours, and manage schedules.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2C3E50', fontWeight: 600 }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #E0E0E0',
                      backgroundColor: '#F7FAFF',
                      color: '#2C3E50',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#2C3E50', fontWeight: 600 }}>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #E0E0E0',
                      backgroundColor: '#F7FAFF',
                      color: '#2C3E50',
                      outline: 'none'
                    }}
                  />
                </div>
                <Button variant="primary" className="w-full" onClick={onLogin}>
                  Login & Continue
                </Button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '32px',
                border: '1px solid #E0E0E0'
              }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                New to ImpactHub?
              </h3>
              <p style={{ color: '#2C3E50', marginBottom: '16px' }}>
                Create your volunteer profile, verify your phone, and start matching with curated opportunities.
              </p>
              <ul style={{ color: '#2C3E50', fontSize: '14px', lineHeight: 1.8 }}>
                <li>✓ Guided registration & onboarding</li>
                <li>✓ Skill & interest-based recommendations</li>
                <li>✓ Track hours and achievements</li>
              </ul>
              <Button variant="secondary" className="w-full" onClick={onRegister}>
                Create a Volunteer Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
