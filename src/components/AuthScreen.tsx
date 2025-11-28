import { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from './Button';
import logoImage from '../assets/logo-colored.png';

interface AuthScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function AuthScreen({ onLogin, onRegister }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="w-full max-w-[480px] p-8 mx-4" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)' }}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoImage} alt="ImpactHub" className="h-16" />
        </div>

        {/* Title */}
        <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Join ImpactHub'}
        </h1>
        <p style={{ color: '#2C3E50', opacity: 0.8, marginBottom: '32px', textAlign: 'center' }}>
          {isLogin ? 'Sign in to continue making a difference' : 'Create an account to start volunteering'}
        </p>

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Full Name
              </label>
              <div className="relative">
                <User size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 border"
                  style={{ borderColor: '#E0E0E0', borderRadius: '12px', outline: 'none', height: '48px' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '12px', outline: 'none', height: '48px' }}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Phone Number
              </label>
              <div className="relative">
                <Phone size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                <input
                  type="tel"
                  placeholder="+65 8123 4567"
                  className="w-full pl-10 pr-4 border"
                  style={{ borderColor: '#E0E0E0', borderRadius: '12px', outline: 'none', height: '48px' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '12px', outline: 'none', height: '48px' }}
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#779F8D' }} />
                <span style={{ color: '#2C3E50', fontSize: '14px' }}>Remember me</span>
              </label>
              <button style={{ color: '#779F8D', fontWeight: 600, fontSize: '14px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                Forgot Password?
              </button>
            </div>
          )}

          <Button 
            variant="primary" 
            className="w-full"
            onClick={isLogin ? onLogin : onRegister}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </div>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <span style={{ color: '#2C3E50', opacity: 0.8 }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          {' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#779F8D', fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {/* Social Login */}
        {isLogin && (
          <div className="mt-8">
            <div className="relative mb-6">
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#E0E0E0' }} />
              <div className="relative text-center">
                <span style={{ backgroundColor: '#FFFFFF', padding: '0 16px', color: '#2C3E50', opacity: 0.6 }}>
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-3 border transition-colors hover:bg-opacity-80" style={{ borderColor: '#E0E0E0', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                <span style={{ color: '#2C3E50', fontWeight: 600 }}>Google</span>
              </button>
              <button className="p-3 border transition-colors hover:bg-opacity-80" style={{ borderColor: '#E0E0E0', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
                <span style={{ color: '#2C3E50', fontWeight: 600 }}>Facebook</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
