import { useState } from 'react';
import { Button } from './Button';
import { ArrowRight, CheckCircle2, User, Mail, Lock, MapPin, Calendar, Award } from 'lucide-react';

export function RegistrationFlow() {
  const [step, setStep] = useState<'registration' | 'otp' | 'profile' | 'skills' | 'confirmation'>('registration');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Progress Indicator */}
      <div className="w-full bg-white border-b" style={{ borderColor: '#E0E0E0' }}>
        <div className="max-w-[800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {['Registration', 'Verify', 'Profile', 'Skills', 'Complete'].map((label, index) => {
              const stepNames = ['registration', 'otp', 'profile', 'skills', 'confirmation'];
              const currentIndex = stepNames.indexOf(step);
              const isActive = index === currentIndex;
              const isCompleted = index < currentIndex;

              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-2"
                      style={{
                        backgroundColor: isActive || isCompleted ? '#779F8D' : '#E0E0E0',
                        borderRadius: '50%',
                        color: '#FFFFFF',
                        fontWeight: 600
                      }}
                    >
                      {isCompleted ? <CheckCircle2 size={20} /> : index + 1}
                    </div>
                    <span style={{ color: isActive ? '#2C3E50' : '#9E9E9E', fontSize: '14px', fontWeight: isActive ? 600 : 400 }}>
                      {label}
                    </span>
                  </div>
                  {index < 4 && (
                    <div
                      className="w-16 h-1 mb-6 mx-2"
                      style={{ backgroundColor: isCompleted ? '#779F8D' : '#E0E0E0' }}
                    />
                  )}
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
                    placeholder="Enter your full name"
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

              <Button variant="primary" onClick={() => setStep('otp')} className="w-full mt-6">
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
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Verify Your Email
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              We've sent a verification code to {email}
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
                  Resend Code
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
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    outline: 'none'
                  }}
                />
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
                  {['Driver', 'Server', 'Teacher', 'Medical', 'Tech Support', 'Translator'].map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-2 p-3 border cursor-pointer transition-colors"
                      style={{
                        borderColor: '#E0E0E0',
                        borderRadius: '8px'
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50' }}>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                  Interests
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Environment', 'Food', 'Education', 'Health', 'Animals', 'Seniors'].map((interest) => (
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
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50' }}>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="primary" onClick={() => setStep('confirmation')} className="w-full mt-6">
                Complete Registration
              </Button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div
            className="p-8 text-center"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
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
    </div>
  );
}
