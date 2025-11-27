import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, DollarSign, Award, AlertCircle, CheckCircle } from 'lucide-react';

export function AnalyticsDashboard() {
  const participationData = [
    { month: 'Jan', hours: 420, volunteers: 45 },
    { month: 'Feb', hours: 380, volunteers: 42 },
    { month: 'Mar', hours: 510, volunteers: 52 },
    { month: 'Apr', hours: 480, volunteers: 48 },
    { month: 'May', hours: 560, volunteers: 58 },
    { month: 'Jun', hours: 620, volunteers: 62 },
    { month: 'Jul', hours: 590, volunteers: 59 },
    { month: 'Aug', hours: 650, volunteers: 65 },
    { month: 'Sep', hours: 700, volunteers: 68 },
    { month: 'Oct', hours: 720, volunteers: 72 }
  ];

  const donationData = [
    { quarter: 'Q1', target: 50000, actual: 45000 },
    { quarter: 'Q2', target: 50000, actual: 52000 },
    { quarter: 'Q3', target: 50000, actual: 48000 },
    { quarter: 'Q4', target: 50000, actual: 38000 }
  ];

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '40px', marginBottom: '8px' }}>
          Global Analytics Dashboard
        </h1>
        <p style={{ color: '#2C3E50', fontSize: '18px', opacity: 0.8, marginBottom: '32px' }}>
          Strategic oversight and key performance indicators
        </p>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content - 9 cols */}
          <div className="col-span-9 space-y-8">
            {/* KPI Cards with Colored Top Borders */}
            <div className="grid grid-cols-4 gap-6">
              {/* Total Hours - Green */}
              <div 
                className="p-6 shadow-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  borderTop: '6px solid #779F8D'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ backgroundColor: '#F0F7F4', borderRadius: '12px' }}
                  >
                    <Clock size={28} style={{ color: '#779F8D' }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={16} style={{ color: '#779F8D' }} />
                    <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 700 }}>
                      +18%
                    </span>
                  </div>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '40px', fontWeight: 700, marginBottom: '4px', lineHeight: 1 }}>
                  5,840
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                  Total Volunteer Hours
                </div>
                <div style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
                  Year to Date
                </div>
              </div>

              {/* Active Volunteers - Green */}
              <div 
                className="p-6 shadow-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  borderTop: '6px solid #779F8D'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ backgroundColor: '#F0F7F4', borderRadius: '12px' }}
                  >
                    <Users size={28} style={{ color: '#779F8D' }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={16} style={{ color: '#779F8D' }} />
                    <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 700 }}>
                      +12%
                    </span>
                  </div>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '40px', fontWeight: 700, marginBottom: '4px', lineHeight: 1 }}>
                  245
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                  Active Volunteers
                </div>
                <div style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
                  Last 30 Days
                </div>
              </div>

              {/* Total Donations - Blue */}
              <div 
                className="p-6 shadow-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  borderTop: '6px solid #2C3E50'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ backgroundColor: '#E8F4F8', borderRadius: '12px' }}
                  >
                    <DollarSign size={28} style={{ color: '#2C3E50' }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={16} style={{ color: '#779F8D' }} />
                    <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 700 }}>
                      +8%
                    </span>
                  </div>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '40px', fontWeight: 700, marginBottom: '4px', lineHeight: 1 }}>
                  $183K
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                  Total Donations
                </div>
                <div style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
                  Year to Date
                </div>
              </div>

              {/* Events Completed - Orange */}
              <div 
                className="p-6 shadow-lg"
                style={{ 
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  borderTop: '6px solid #FFB74D'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-14 h-14 flex items-center justify-center"
                    style={{ backgroundColor: '#FFF8E1', borderRadius: '12px' }}
                  >
                    <Award size={28} style={{ color: '#FFB74D' }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={16} style={{ color: '#779F8D' }} />
                    <span style={{ color: '#779F8D', fontSize: '12px', fontWeight: 700 }}>
                      +25%
                    </span>
                  </div>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '40px', fontWeight: 700, marginBottom: '4px', lineHeight: 1 }}>
                  156
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                  Events Completed
                </div>
                <div style={{ color: '#2C3E50', fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
                  Year to Date
                </div>
              </div>
            </div>

            {/* Volunteer Participation Trend - Area Chart */}
            <div 
              className="p-8 shadow-lg"
              style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '24px' }}>
                Volunteer Participation Trend
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={participationData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#779F8D" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#779F8D" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2C3E50" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2C3E50" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    stroke="#2C3E50"
                    style={{ fontSize: '14px' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#2C3E50"
                    style={{ fontSize: '14px' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#779F8D" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHours)"
                    name="Hours"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volunteers" 
                    stroke="#2C3E50" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVolunteers)"
                    name="Volunteers"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Donation vs Target - Bar Chart */}
            <div 
              className="p-8 shadow-lg"
              style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '24px' }}>
                Fundraising Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={donationData}>
                  <XAxis 
                    dataKey="quarter" 
                    stroke="#2C3E50"
                    style={{ fontSize: '14px' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#2C3E50"
                    style={{ fontSize: '14px' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="target" 
                    fill="#E0E0E0" 
                    radius={[8, 8, 0, 0]}
                    name="Target"
                  />
                  <Bar 
                    dataKey="actual" 
                    fill="#779F8D" 
                    radius={[8, 8, 0, 0]}
                    name="Actual"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar - Key Insights - 3 cols */}
          <div className="col-span-3 space-y-6">
            {/* Key Insights */}
            <div 
              className="p-6 shadow-lg"
              style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '20px' }}>
                Key Insights
              </h3>

              <div className="space-y-4">
                <div 
                  className="p-4"
                  style={{ backgroundColor: '#F0F7F4', borderRadius: '12px', borderLeft: '4px solid #779F8D' }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} style={{ color: '#779F8D', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                        Retention Up 12%
                      </div>
                      <div style={{ color: '#2C3E50', fontSize: '13px', opacity: 0.8 }}>
                        Volunteer retention has improved significantly this quarter
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4"
                  style={{ backgroundColor: '#FFF8E1', borderRadius: '12px', borderLeft: '4px solid #FFB74D' }}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} style={{ color: '#FFB74D', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                        Q4 Fundraising Below Target
                      </div>
                      <div style={{ color: '#2C3E50', fontSize: '13px', opacity: 0.8 }}>
                        Need $12K more to reach Q4 goal
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4"
                  style={{ backgroundColor: '#F0F7F4', borderRadius: '12px', borderLeft: '4px solid #779F8D' }}
                >
                  <div className="flex items-start gap-3">
                    <TrendingUp size={20} style={{ color: '#779F8D', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                        Peak Engagement in Sept
                      </div>
                      <div style={{ color: '#2C3E50', fontSize: '13px', opacity: 0.8 }}>
                        68 active volunteers, highest this year
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4"
                  style={{ backgroundColor: '#F0F7F4', borderRadius: '12px', borderLeft: '4px solid #779F8D' }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} style={{ color: '#779F8D', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ color: '#2C3E50', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                        Events Up 25%
                      </div>
                      <div style={{ color: '#2C3E50', fontSize: '13px', opacity: 0.8 }}>
                        156 events completed vs 125 last year
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Programs */}
            <div 
              className="p-6 shadow-lg"
              style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '20px' }}>
                Top Programs
              </h3>

              <div className="space-y-4">
                {[
                  { name: 'Food Distribution', hours: 1250, color: '#779F8D' },
                  { name: 'Environmental', hours: 980, color: '#9DBAA9' },
                  { name: 'Senior Support', hours: 840, color: '#C4D7CC' }
                ].map((program, index) => (
                  <div key={program.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>
                        {program.name}
                      </span>
                      <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 700 }}>
                        {program.hours}h
                      </span>
                    </div>
                    <div 
                      className="w-full h-2"
                      style={{ backgroundColor: '#F5F7FA', borderRadius: '100px', overflow: 'hidden' }}
                    >
                      <div
                        className="h-full"
                        style={{
                          backgroundColor: program.color,
                          width: `${(program.hours / 1250) * 100}%`,
                          borderRadius: '100px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div 
              className="p-6 shadow-lg"
              style={{ backgroundColor: '#ffffff', borderRadius: '16px' }}
            >
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '20px' }}>
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button 
                  className="w-full p-3 text-left transition-all"
                  style={{ 
                    backgroundColor: '#F0F7F4',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    fontWeight: 600
                  }}
                >
                  Export Full Report
                </button>
                <button 
                  className="w-full p-3 text-left transition-all"
                  style={{ 
                    backgroundColor: '#F5F7FA',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    fontWeight: 600
                  }}
                >
                  Schedule Meeting
                </button>
                <button 
                  className="w-full p-3 text-left transition-all"
                  style={{ 
                    backgroundColor: '#F5F7FA',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    fontWeight: 600
                  }}
                >
                  View All Metrics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
