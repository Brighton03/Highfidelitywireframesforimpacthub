import { useState } from 'react';
import { Button } from './Button';
import { DollarSign, Target, Calendar, Users, TrendingUp, Mail } from 'lucide-react';

export function FundraisingCampaign() {
  const [campaignName, setCampaignName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="p-8">
      <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
        Fundraising Campaign Setup
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Campaign Form */}
        <div className="col-span-2 p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            Create New Campaign
          </h2>

          <div className="space-y-6">
            {/* Campaign Name */}
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Annual Community Impact Fund 2025"
                className="w-full px-4 py-3 border"
                style={{
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50',
                  outline: 'none'
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Description
              </label>
              <textarea
                placeholder="Describe the campaign purpose and how funds will be used..."
                rows={4}
                className="w-full px-4 py-3 border"
                style={{
                  borderColor: '#E0E0E0',
                  borderRadius: '8px',
                  color: '#2C3E50',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Goal Amount */}
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Fundraising Goal
              </label>
              <div className="relative">
                <DollarSign size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  placeholder="50000"
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

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Start Date
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
                  End Date
                </label>
                <div className="relative">
                  <Calendar size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
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
            </div>

            {/* Target Audience */}
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                Target Audience
              </label>
              <div className="space-y-2">
                {['All Volunteers', 'Active Volunteers Only', 'Donors & Supporters', 'Public'].map((audience) => (
                  <label key={audience} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={audience === 'All Volunteers'}
                      style={{ accentColor: '#779F8D' }}
                    />
                    <span style={{ color: '#2C3E50' }}>{audience}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Email Campaign */}
            <div className="p-4" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '1px solid #779F8D' }}>
              <div className="flex items-center gap-2 mb-3">
                <Mail size={20} style={{ color: '#779F8D' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Email Campaign Integration
                </h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Send announcement email to selected audience
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="secondary" className="flex-1">
                Save as Draft
              </Button>
              <Button variant="primary" className="flex-1">
                Launch Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Campaign Preview & Stats */}
        <div className="space-y-6">
          {/* Active Campaigns Summary */}
          <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '16px' }}>
              Active Campaigns
            </h3>
            <div className="space-y-4">
              <div className="p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
                <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>
                  Q4 2025 Drive
                </div>
                <div className="w-full h-2 mb-2" style={{ backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: '#779F8D',
                      width: '76%',
                      borderRadius: '100px'
                    }}
                  />
                </div>
                <div style={{ color: '#2C3E50', fontSize: '12px' }}>
                  $38,000 / $50,000 (76%)
                </div>
              </div>

              <div className="p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
                <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>
                  Emergency Fund
                </div>
                <div className="w-full h-2 mb-2" style={{ backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: '#779F8D',
                      width: '45%',
                      borderRadius: '100px'
                    }}
                  />
                </div>
                <div style={{ color: '#2C3E50', fontSize: '12px' }}>
                  $9,000 / $20,000 (45%)
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Tips */}
          <div className="p-6" style={{ backgroundColor: '#FFF8E1', borderRadius: '8px', border: '1px solid #FFB74D' }}>
            <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>
              Campaign Best Practices
            </h3>
            <ul className="space-y-2">
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Set realistic, achievable goals
              </li>
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Include clear impact messaging
              </li>
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Update progress regularly
              </li>
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Thank donors promptly
              </li>
            </ul>
          </div>

          {/* Quick Stats */}
          <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '16px' }}>
              Fundraising Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} style={{ color: '#779F8D' }} />
                  <span style={{ color: '#2C3E50', fontSize: '14px' }}>Total Raised (YTD)</span>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>
                  $183,000
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} style={{ color: '#779F8D' }} />
                  <span style={{ color: '#2C3E50', fontSize: '14px' }}>Total Donors</span>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>
                  245
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={16} style={{ color: '#779F8D' }} />
                  <span style={{ color: '#2C3E50', fontSize: '14px' }}>Avg. Donation</span>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>
                  $747
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
