import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

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
      <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
        Global Analytics Dashboard
      </h1>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div 
          className="p-6"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}
            >
              <Clock size={24} style={{ color: '#779F8D' }} />
            </div>
            <TrendingUp size={20} style={{ color: '#81C784' }} />
          </div>
          <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
            5,840
          </div>
          <div style={{ color: '#2C3E50', fontSize: '14px' }}>
            Total Volunteer Hours (YTD)
          </div>
          <div style={{ color: '#81C784', fontSize: '12px', marginTop: '8px' }}>
            +12% from last year
          </div>
        </div>

        <div 
          className="p-6"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}
            >
              <Users size={24} style={{ color: '#779F8D' }} />
            </div>
            <TrendingUp size={20} style={{ color: '#81C784' }} />
          </div>
          <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
            342
          </div>
          <div style={{ color: '#2C3E50', fontSize: '14px' }}>
            Active Volunteers
          </div>
          <div style={{ color: '#81C784', fontSize: '12px', marginTop: '8px' }}>
            +8% from last month
          </div>
        </div>

        <div 
          className="p-6"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: '#FFF8E1', borderRadius: '8px' }}
            >
              <DollarSign size={24} style={{ color: '#FFB74D' }} />
            </div>
          </div>
          <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
            $183K
          </div>
          <div style={{ color: '#2C3E50', fontSize: '14px' }}>
            Grant Metrics Status
          </div>
          <div style={{ color: '#FFB74D', fontSize: '12px', marginTop: '8px' }}>
            92% of annual target
          </div>
        </div>

        <div 
          className="p-6"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}
            >
              <TrendingUp size={24} style={{ color: '#779F8D' }} />
            </div>
            <TrendingUp size={20} style={{ color: '#81C784' }} />
          </div>
          <div style={{ color: '#2C3E50', fontSize: '32px', fontWeight: 700, marginBottom: '4px' }}>
            89%
          </div>
          <div style={{ color: '#2C3E50', fontSize: '14px' }}>
            Volunteer Retention Rate
          </div>
          <div style={{ color: '#81C784', fontSize: '12px', marginTop: '8px' }}>
            +3% from last quarter
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Participation Trends */}
        <div 
          className="p-6"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        >
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            Participation Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis 
                dataKey="month" 
                stroke="#2C3E50"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#2C3E50"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
              />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#779F8D" 
                strokeWidth={2}
                name="Total Hours"
                dot={{ fill: '#779F8D', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="volunteers" 
                stroke="#2C3E50" 
                strokeWidth={2}
                name="Active Volunteers"
                dot={{ fill: '#2C3E50', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donations vs Targets */}
        <div 
          className="p-6"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        >
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            Donations vs Targets
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis 
                dataKey="quarter" 
                stroke="#2C3E50"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#2C3E50"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px'
                }}
                formatter={(value) => `$${(value as number).toLocaleString()}`}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
              />
              <Bar 
                dataKey="target" 
                fill="#E0E0E0" 
                name="Target"
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="actual" 
                fill="#779F8D" 
                name="Actual"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
