import { useState } from 'react';
import { Button } from './Button';
import { FileText, Download, Eye, EyeOff } from 'lucide-react';

/**
 * BUSINESS RULES ENFORCEMENT - Generate Impact & Analytics Reports
 * 
 * 1. DATA PRIVACY & ANONYMIZATION
 *    - Public reports: All personal identifiers removed (names → IDs)
 *    - Internal reports: Full volunteer details visible (admin/coordinator only)
 *    - Sensitive data (contact info, demographics) hidden in public reports
 *    - GDPR/privacy compliance: Volunteer consent required for public data
 * 
 * 2. AUDIENCE-BASED FILTERING
 *    - Public audience: Aggregate metrics only, no individual breakdowns
 *    - Internal audience: Detailed volunteer-level data, attendance patterns
 *    - Different report templates based on audience type
 *    - Auto-redact fields based on audience selection
 * 
 * 3. METRICS CALCULATION
 *    - Total volunteer hours: Sum of approved hours only
 *    - Retention rate: (Active this period / Active last period) * 100
 *    - Impact metrics: Event outcomes, beneficiaries served, community impact
 *    - Demographic breakdown: Age, location, skills (internal only)
 *    - All calculations based on verified, approved data
 */

export function ReportGenerator() {
  const [audienceType, setAudienceType] = useState<'internal' | 'public'>('public');
  const [timeframe, setTimeframe] = useState('Q4 2025');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['Total Hours']);
  const [previewReady, setPreviewReady] = useState(false);

  // BUSINESS RULE: Audience-based metric availability
  const availableMetrics = audienceType === 'public'
    ? ['Total Hours', 'Events Completed', 'Impact Metrics'] // Public: aggregate only
    : ['Total Hours', 'Active Volunteers', 'Events Completed', 'Retention Rate', 'Impact Metrics', 'Demographic Data']; // Internal: full details

  // BUSINESS RULE: Data anonymization for public reports
  const anonymizeData = (data: any[]) => {
    if (audienceType === 'public') {
      return data.map((item, index) => ({
        ...item,
        volunteer: `Volunteer #${index + 100}`, // Replace name with ID
        email: undefined, // Remove contact info
        phone: undefined,
        address: undefined
      }));
    }
    return data; // Internal reports show full data
  };

  // BUSINESS RULE: Privacy-compliant data export
  const exportReport = (format: 'PDF' | 'Excel') => {
    // Ensure data is anonymized for public reports
    // Include privacy disclaimer in footer
    // Log report generation for audit trail (who, when, what data)
    console.log(`Generating ${audienceType} report in ${format} format`);
  };

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  // Mock preview data
  const previewData = audienceType === 'public'
    ? [
        { volunteer: 'Volunteer #123', hours: 45, events: 8 },
        { volunteer: 'Volunteer #456', hours: 38, events: 6 },
        { volunteer: 'Volunteer #789', hours: 52, events: 9 }
      ]
    : [
        { volunteer: 'Sarah Chen', hours: 45, events: 8 },
        { volunteer: 'Michael Johnson', hours: 38, events: 6 },
        { volunteer: 'Emma Davis', hours: 52, events: 9 }
      ];

  return (
    <div className="p-8">
      <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
        Report Generator
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Configuration Form */}
        <div 
          className="col-span-2 p-6"
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        >
          <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '24px' }}>
            Report Configuration
          </h2>

          {/* Timeframe */}
          <div className="mb-6">
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
              Timeframe
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-4 py-2 border"
              style={{
                borderColor: '#E0E0E0',
                borderRadius: '8px',
                color: '#2C3E50'
              }}
            >
              <option>Q1 2025</option>
              <option>Q2 2025</option>
              <option>Q3 2025</option>
              <option>Q4 2025</option>
              <option>Year to Date 2025</option>
              <option>Custom Range</option>
            </select>
          </div>

          {/* Metrics Selection */}
          <div className="mb-6">
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
              Metrics to Include
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableMetrics.map((metric) => (
                <label 
                  key={metric}
                  className="flex items-center gap-2 p-3 border cursor-pointer transition-colors"
                  style={{
                    borderColor: selectedMetrics.includes(metric) ? '#779F8D' : '#E0E0E0',
                    backgroundColor: selectedMetrics.includes(metric) ? '#F0F7F4' : '#FFFFFF',
                    borderRadius: '8px'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedMetrics.includes(metric)}
                    onChange={() => toggleMetric(metric)}
                    style={{ accentColor: '#779F8D' }}
                  />
                  <span style={{ color: '#2C3E50' }}>{metric}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Feature - Audience Type */}
          <div className="mb-6">
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
              Audience Type
            </label>
            <div 
              className="p-4 mb-4"
              style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '1px solid #779F8D' }}
            >
              <div className="flex items-center gap-2 mb-2">
                {audienceType === 'public' ? (
                  <EyeOff size={20} style={{ color: '#779F8D' }} />
                ) : (
                  <Eye size={20} style={{ color: '#779F8D' }} />
                )}
                <span style={{ color: '#2C3E50', fontWeight: 600 }}>
                  Privacy Protection Active
                </span>
              </div>
              <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                {audienceType === 'public'
                  ? 'Volunteer names will be anonymized for public/external reports'
                  : 'Full volunteer details will be visible for internal board reports'}
              </p>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={audienceType === 'internal'}
                  onChange={() => setAudienceType('internal')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>Internal Board</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={audienceType === 'public'}
                  onChange={() => setAudienceType('public')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>Public/External</span>
              </label>
            </div>
          </div>

          {/* Preview Table */}
          <div className="mb-6">
            <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
              Preview
            </h3>
            <div 
              className="border overflow-hidden"
              style={{ borderColor: '#E0E0E0', borderRadius: '8px' }}
            >
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#F5F7FA', borderBottom: '2px solid #E0E0E0' }}>
                    <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                      Volunteer
                    </th>
                    <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                      Total Hours
                    </th>
                    <th className="text-left py-3 px-4" style={{ color: '#2C3E50', fontWeight: 600 }}>
                      Events
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #E0E0E0' }}>
                      <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                        {row.volunteer}
                      </td>
                      <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                        {row.hours}
                      </td>
                      <td className="py-3 px-4" style={{ color: '#2C3E50' }}>
                        {row.events}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px', fontStyle: 'italic' }}>
              {audienceType === 'public' && 'Volunteer names are anonymized in this preview'}
            </p>
          </div>

          {/* Generate Preview in New Tab */}
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              setPreviewReady(true);
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Download size={20} />
              <span>Generate Preview</span>
            </div>
          </Button>

          {/* Export controls on main page (only after preview generated) */}
          {previewReady && (
            <div className="mt-4 flex gap-2">
              <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-2">
                <Download size={18} />
                <span>Download PDF</span>
              </Button>
              <Button variant="secondary" onClick={() => alert('Excel export simulated')} className="flex items-center gap-2">
                <Download size={18} />
                <span>Export Excel</span>
              </Button>
            </div>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div 
            className="p-6"
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText size={24} style={{ color: '#779F8D' }} />
              <h3 style={{ color: '#2C3E50', fontWeight: 700 }}>
                Report Types
              </h3>
            </div>
            <ul className="space-y-2">
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Executive Summary
              </li>
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Volunteer Performance
              </li>
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Impact Analysis
              </li>
              <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                • Grant Compliance
              </li>
            </ul>
          </div>

          <div 
            className="p-6"
            style={{ backgroundColor: '#FFF8E1', borderRadius: '8px', border: '1px solid #FFB74D' }}
          >
            <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>
              Privacy Notice
            </h3>
            <p style={{ color: '#2C3E50', fontSize: '14px', lineHeight: '1.6' }}>
              When generating public reports, all personally identifiable information (PII) will be automatically anonymized to protect volunteer privacy.
            </p>
          </div>

          <div 
            className="p-6"
            style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}
          >
            <h3 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '12px' }}>
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div>
                <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>
                  5,840
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Total Hours (Q4)
                </div>
              </div>
              <div>
                <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>
                  342
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Active Volunteers
                </div>
              </div>
              <div>
                <div style={{ color: '#2C3E50', fontSize: '24px', fontWeight: 700 }}>
                  89%
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Retention Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
