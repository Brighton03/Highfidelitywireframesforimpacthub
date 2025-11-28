/* eslint-disable no-inline-styles/no-inline-styles */
import { useState } from 'react';
import { Button } from './Button';
import {
  DollarSign,
  Target,
  Calendar,
  Users,
  TrendingUp,
  Mail,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Sparkles,
  Copy
} from 'lucide-react';

interface FundraisingCampaignRecord {
  id: number;
  name: string;
  goal: number;
  raised: number;
  donors: number;
  start: string;
  end: string;
  status: 'Active' | 'Scheduled' | 'Completed';
  channel: string;
  focus: string;
}

const activeCampaigns: FundraisingCampaignRecord[] = [
  {
    id: 1,
    name: 'Community Resilience Fund',
    goal: 50000,
    raised: 38000,
    donors: 182,
    start: 'Oct 1',
    end: 'Dec 31',
    status: 'Active',
    channel: 'Email + Social',
    focus: 'Food security & housing'
  },
  {
    id: 2,
    name: 'Emergency Relief Pool',
    goal: 20000,
    raised: 9000,
    donors: 74,
    start: 'Nov 10',
    end: 'Feb 15',
    status: 'Active',
    channel: 'Corporate pledges',
    focus: 'Extreme weather readiness'
  },
  {
    id: 3,
    name: 'Digital Equity Microgrants',
    goal: 30000,
    raised: 30000,
    donors: 126,
    start: 'Aug 1',
    end: 'Oct 15',
    status: 'Completed',
    channel: 'Peer-to-peer',
    focus: 'Student device access'
  }
];

export function FundraisingCampaign() {
  const [mode, setMode] = useState<'overview' | 'setup' | 'success'>('overview');
  const [campaignName, setCampaignName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [copied, setCopied] = useState(false);

  const totalRaised = activeCampaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const totalGoal = activeCampaigns.reduce((sum, campaign) => sum + campaign.goal, 0);
  const averageDonation = Math.round(totalRaised / activeCampaigns.reduce((sum, campaign) => sum + campaign.donors, 0));

  if (mode === 'success') {
    const formattedGoal = goalAmount ? `$${Number(goalAmount).toLocaleString()}` : '$—';
    const formattedDates = startDate && endDate ? `${startDate} – ${endDate}` : 'Dates to be confirmed';
    const shareableSlug = campaignName ? campaignName.toLowerCase().replace(/\s+/g, '-') : 'new-drive';
    const shareableLink = `impacthub.org/campaign/${shareableSlug}`;

    const handleCopyLink = () => {
      if (typeof navigator !== 'undefined' && navigator.clipboard && shareableLink) {
        navigator.clipboard.writeText(shareableLink).catch(() => null);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="p-8">
        <div className="max-w-[1440px] mx-auto">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '32px',
              padding: '40px',
              boxShadow: '0 25px 60px rgba(44,62,80,0.12)'
            }}
          >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 size={40} color="#81C784" />
                <div>
                  <p style={{ color: '#2C3E50', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Campaign launched
                  </p>
                  <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px' }}>
                    {campaignName || 'New fundraising campaign'} is live
                  </h1>
                </div>
              </div>
              <p style={{ color: '#2C3E50', opacity: 0.75, marginBottom: '24px', lineHeight: 1.6 }}>
                Donor landing page, email notifications, and tracking dashboards have all been activated. You can
                monitor traction from the Fundraising overview.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div style={{ backgroundColor: '#F5F7FA', borderRadius: '20px', padding: '16px' }}>
                  <span style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.7 }}>Goal</span>
                  <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>{formattedGoal}</div>
                </div>
                <div style={{ backgroundColor: '#F5F7FA', borderRadius: '20px', padding: '16px' }}>
                  <span style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.7 }}>Audience</span>
                  <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>Multi-channel</div>
                </div>
                <div style={{ backgroundColor: '#F5F7FA', borderRadius: '20px', padding: '16px' }}>
                  <span style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.7 }}>Tracking</span>
                  <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>Synced</div>
                </div>
              </div>

              <div className="p-4 mb-6" style={{ border: '1px dashed #E0E0E0', borderRadius: '16px' }}>
                <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Launch timeline</div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>{formattedDates}</div>
              </div>

              <div className="grid grid-cols-1 mb-6">
                <div style={{ backgroundColor: '#F5F7FA', borderRadius: '20px', padding: '16px' }}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <span style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.7 }}>Shareable link</span>
                      <div style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>{shareableLink}</div>
                    </div>
                    <button
                      onClick={handleCopyLink}
                      style={{
                        border: '1px solid #779F8D',
                        backgroundColor: copied ? '#779F8D' : 'transparent',
                        color: copied ? '#FFFFFF' : '#779F8D',
                        borderRadius: '999px',
                        padding: '8px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <Copy size={16} />
                      {copied ? 'Copied' : 'Copy link'}
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="p-6 mb-6"
                style={{
                  backgroundColor: '#F0F7F4',
                  borderRadius: '24px',
                  border: '1px solid #D5EAE1'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={24} color="#779F8D" />
                  <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', margin: 0 }}>Next best actions</h2>
                </div>
                <ul className="space-y-4" style={{ color: '#2C3E50', fontSize: '14px', lineHeight: 1.6 }}>
                  <li>• Share the campaign link with priority donors. High-engagement donors already received an alert.</li>
                  <li>• Schedule a mid-launch update highlighting early impact stories and stretch goals.</li>
                  <li>• Sync with Volunteer Success for testimonial footage within 72 hours.</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1" onClick={() => setMode('overview')}>
                  View in dashboard
                </Button>
                <Button variant="secondary" className="flex-1" onClick={() => setMode('setup')}>
                  Launch another
                </Button>
              </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'setup') {
    return (
      <div className="p-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => setMode('overview')}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#2C3E50',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} />
                Back to fundraising overview
              </button>
              <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginTop: '12px' }}>
                Fundraising Campaign Setup
              </h1>
              <p style={{ color: '#2C3E50', opacity: 0.75, marginTop: '4px' }}>
                Configure a new donor initiative in less than 5 minutes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
                Campaign details
              </h2>

              <div className="space-y-6">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
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

                <div className="flex gap-3 pt-4">
                  <Button variant="secondary" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button variant="primary" className="flex-1" onClick={() => setMode('success')}>
                    Launch Campaign
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
                <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>Why this matters</h3>
                <p style={{ color: '#2C3E50', fontSize: '14px', lineHeight: 1.6 }}>
                  The selected audience receives a branded landing page and automated receipts. Launching a campaign also
                  syncs milestones to the Analytics dashboard for board-ready reporting.
                </p>
              </div>
              <div className="p-6" style={{ backgroundColor: '#FFF8E1', borderRadius: '12px', border: '1px solid #FFB74D' }}>
                <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>Checklist</h3>
                <ul className="space-y-2" style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <li>• Confirm leadership sign-off for target goal</li>
                  <li>• Prepare donor thank-you template</li>
                  <li>• Align volunteer story highlights for launch email</li>
                  <li>• Schedule a mid-campaign impact update</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Fundraising Programs
            </h1>
            <p style={{ color: '#2C3E50', fontSize: '16px', opacity: 0.8 }}>
              Track live drives, donor momentum, and impact narratives across ImpactHub.
            </p>
          </div>
          <Button variant="primary" onClick={() => setMode('setup')}>
            Launch new Campaign
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', borderTop: '4px solid #779F8D' }}>
            <div className="flex items-center gap-3 mb-3">
              <DollarSign size={28} color="#779F8D" />
              <span style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>Total Raised (Active)</span>
            </div>
            <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700 }}>
              ${totalRaised.toLocaleString()}
            </div>
            <p style={{ color: '#779F8D', fontSize: '12px', marginTop: '4px' }}>Across {activeCampaigns.length} campaigns</p>
          </div>

          <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', borderTop: '4px solid #2C3E50' }}>
            <div className="flex items-center gap-3 mb-3">
              <Target size={28} color="#2C3E50" />
              <span style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>Goal Progress</span>
            </div>
            <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700 }}>
              {(Math.round((totalRaised / totalGoal) * 100))}%
            </div>
            <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '4px' }}>of ${totalGoal.toLocaleString()} target</p>
          </div>

          <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', borderTop: '4px solid #FFB74D' }}>
            <div className="flex items-center gap-3 mb-3">
              <Users size={28} color="#FFB74D" />
              <span style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>Avg. Donation</span>
            </div>
            <div style={{ color: '#2C3E50', fontSize: '36px', fontWeight: 700 }}>
              ${averageDonation.toLocaleString()}
            </div>
            <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '4px' }}>per donor this quarter</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2" style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '24px', boxShadow: '0 25px 50px rgba(44,62,80,0.08)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '22px' }}>Live campaigns</h2>
                <p style={{ color: '#2C3E50', opacity: 0.65 }}>See pacing against weekly targets</p>
              </div>
              <Button variant="secondary" onClick={() => setMode('setup')}>
                Launch new Campaign
              </Button>
            </div>

            <div className="space-y-4">
              {activeCampaigns.map((campaign) => {
                const progress = Math.round((campaign.raised / campaign.goal) * 100);
                const progressColor = progress >= 100 ? '#81C784' : '#779F8D';
                return (
                  <div key={campaign.id} className="p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '18px', border: '1px solid #E0E0E0' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div style={{ color: '#2C3E50', fontWeight: 700, fontSize: '16px' }}>{campaign.name}</div>
                        <div style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.75 }}>{campaign.focus}</div>
                      </div>
                      <span
                        style={{
                          backgroundColor: campaign.status === 'Completed' ? '#81C784' : '#E0E0E0',
                          color: campaign.status === 'Completed' ? '#FFFFFF' : '#2C3E50',
                          borderRadius: '999px',
                          padding: '6px 16px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        {campaign.status}
                      </span>
                    </div>
                    <div className="w-full h-2 mb-2" style={{ backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
                      <div
                        className="h-full"
                        style={{
                          backgroundColor: progressColor,
                          width: `${Math.min(progress, 100)}%`,
                          borderRadius: '100px'
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between" style={{ color: '#2C3E50', fontSize: '12px' }}>
                      <span>${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()} ({progress}%)</span>
                      <span>{campaign.start} – {campaign.end}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between" style={{ color: '#2C3E50', fontSize: '12px' }}>
                      <div className="flex items-center gap-2">
                        <Users size={14} color="#779F8D" />
                        {campaign.donors} donors
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={14} color="#779F8D" />
                        {campaign.channel}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid #E0E0E0'
              }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>Milestones & reminders</h3>
              <div className="space-y-4">
                <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#F0F7F4', border: '1px solid #E0F0E8' }}>
                  <div style={{ color: '#2C3E50', fontWeight: 600 }}>Mid Campaign Storytelling</div>
                  <p style={{ color: '#2C3E50', fontSize: '12px', margin: 0 }}>Schedule social proof update by Nov 30</p>
                </div>
                <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#F5F7FA', border: '1px solid #E0E0E0' }}>
                  <div style={{ color: '#2C3E50', fontWeight: 600 }}>Corporate pledge follow-up</div>
                  <p style={{ color: '#2C3E50', fontSize: '12px', margin: 0 }}>Send recap deck to partners by Dec 5</p>
                </div>
                <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#FFF8E1', border: '1px solid #FFB74D' }}>
                  <div style={{ color: '#2C3E50', fontWeight: 600 }}>Donor gratitude flow</div>
                  <p style={{ color: '#2C3E50', fontSize: '12px', margin: 0 }}>Automations active – monitor replies</p>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px solid #E0E0E0'
              }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>Daily pledge velocity</h3>
              <div style={{ color: '#2C3E50', fontSize: '48px', fontWeight: 700 }}>$4.2K</div>
              <p style={{ color: '#2C3E50', opacity: 0.65, fontSize: '12px', marginBottom: '16px' }}>Rolling 7-day average</p>
              <div className="space-y-3" style={{ color: '#2C3E50', fontSize: '13px' }}>
                <div className="flex items-center justify-between">
                  <span>Email conversions</span>
                  <span>54%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Peer-to-peer</span>
                  <span>29%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Corporate matches</span>
                  <span>17%</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '24px',
                border: '1px dashed #E0E0E0'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Clock size={18} color="#779F8D" />
                <span style={{ color: '#2C3E50', fontWeight: 700 }}>Upcoming launch</span>
              </div>
              <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '16px', lineHeight: 1.5 }}>
                Youth Innovation Fund slated for Jan 8. Prep assets now to hit the ground running.
              </p>
              <Button variant="secondary" className="w-full" onClick={() => setMode('setup')}>
                Prepare campaign brief
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
