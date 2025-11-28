import { User, Mail, Phone, Bell, Lock, Shield } from 'lucide-react';
import { Button } from './Button';

export function CoordinatorSettings() {
  return (
    <div className="p-8">
      <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
        Settings
      </h1>
      <p style={{ color: '#2C3E50', fontSize: '16px', opacity: 0.8, marginBottom: '32px' }}>
        Manage your account and notification preferences
      </p>

      <div className="grid grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Alex Coordinator"
                className="w-full p-3 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
              />
            </div>
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                defaultValue="alex.coord@example.com"
                className="w-full p-3 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
              />
            </div>
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                <Phone size={16} className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+65 9123 4567"
                className="w-full p-3 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
              />
            </div>
            <Button variant="primary" className="w-full">Save Changes</Button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            <Bell size={20} className="inline mr-2" />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer p-3" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
              <span style={{ color: '#2C3E50', fontWeight: 500 }}>Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: '#779F8D' }} />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
              <span style={{ color: '#2C3E50', fontWeight: 500 }}>SMS Alerts</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: '#779F8D' }} />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
              <span style={{ color: '#2C3E50', fontWeight: 500 }}>Volunteer Sign-ups</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: '#779F8D' }} />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
              <span style={{ color: '#2C3E50', fontWeight: 500 }}>Hour Approvals Pending</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: '#779F8D' }} />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
              <span style={{ color: '#2C3E50', fontWeight: 500 }}>Event Reminders</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" style={{ accentColor: '#779F8D' }} />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            <Lock size={20} className="inline mr-2" />
            Security
          </h2>
          <div className="space-y-4">
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full p-3 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
              />
            </div>
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
              />
            </div>
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-3 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
              />
            </div>
            <Button variant="primary" className="w-full">Update Password</Button>
          </div>
        </div>

        {/* Account Management */}
        <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            <Shield size={20} className="inline mr-2" />
            Account Management
          </h2>
          <div className="space-y-4">
            <div className="p-4" style={{ backgroundColor: '#FFF8E1', borderRadius: '8px', border: '1px solid #FFB74D' }}>
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Active Sessions</h3>
              <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>You are currently logged in on 2 devices</p>
              <button style={{ color: '#779F8D', fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                View All Sessions
              </button>
            </div>
            <div className="p-4" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
              <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Two-Factor Authentication</h3>
              <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>Add an extra layer of security</p>
              <Button variant="secondary" className="w-full">Enable 2FA</Button>
            </div>
            <div className="pt-4 border-t" style={{ borderColor: '#E0E0E0' }}>
              <button 
                className="w-full p-3 transition-colors"
                style={{ backgroundColor: '#E57373', color: '#FFFFFF', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
