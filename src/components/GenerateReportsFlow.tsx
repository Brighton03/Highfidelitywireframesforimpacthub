import { useRef, useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { FileText, Download, Eye, Calendar, Users, TrendingUp, BarChart3 } from 'lucide-react';

/**
 * Generate Impact and Analytic Reports Flow
 * Based on Business Process 4 activity diagram
 */
export function GenerateReportsFlow() {
  const [timeframe, setTimeframe] = useState('Q4 2025');
  const [metrics, setMetrics] = useState<string[]>(['Total Hours']);
  const [audienceType, setAudienceType] = useState<'internal' | 'public'>('public');
  const [showPreview, setShowPreview] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const availableMetrics = audienceType === 'public'
    ? ['Total Hours', 'Events Completed', 'Impact Metrics']
    : ['Total Hours', 'Active Volunteers', 'Events Completed', 'Retention Rate', 'Impact Metrics', 'Demographic Data'];

  const toggleMetric = (metric: string) => {
    setMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const mockPreviewData = audienceType === 'public'
    ? [
        { volunteer: 'Volunteer #123', hours: 45, events: 8, impact: 'High' },
        { volunteer: 'Volunteer #456', hours: 38, events: 6, impact: 'Medium' },
        { volunteer: 'Volunteer #789', hours: 52, events: 9, impact: 'High' }
      ]
    : [
        { volunteer: 'Sarah Chen', hours: 45, events: 8, impact: 'High', skills: 'Delivery Driver, Food Handling' },
        { volunteer: 'Michael Johnson', hours: 38, events: 6, impact: 'Medium', skills: 'Teaching/Education' },
        { volunteer: 'Emma Davis', hours: 52, events: 9, impact: 'High', skills: 'Gardening' }
      ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Header */}
      <div className="w-full bg-white border-b shadow-sm" style={{ borderColor: '#E0E0E0' }}>
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
            Generate Impact & Analytics Report
          </h1>
          <p style={{ color: '#2C3E50', fontSize: '16px', opacity: 0.8 }}>
            Create comprehensive reports for internal board or public stakeholders
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="col-span-2 space-y-6">
            <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
              <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px', marginBottom: '24px' }}>
                Report Configuration
              </h2>

              {/* Timeframe Selection */}
              <div className="mb-6">
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                  <Calendar size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  Timeframe
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => {
                    setTimeframe(e.target.value);
                    setShowPreview(false);
                    setShowExportOptions(false);
                  }}
                  className="w-full px-4 py-3 border"
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

              {/* Audience Type Selection */}
              <div className="mb-6">
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                  <Users size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  Report Audience
                </label>
                <div className="flex gap-4">
                  <label
                    className="flex-1 p-4 cursor-pointer transition-all"
                    style={{
                      backgroundColor: audienceType === 'internal' ? '#F0F7F4' : '#F5F7FA',
                      borderRadius: '8px',
                      border: audienceType === 'internal' ? '2px solid #779F8D' : '1px solid #E0E0E0'
                    }}
                  >
                    <input
                      type="radio"
                      name="audience"
                      checked={audienceType === 'internal'}
                      onChange={() => {
                        setAudienceType('internal');
                        setShowPreview(false);
                        setShowExportOptions(false);
                      }}
                      style={{ accentColor: '#779F8D', marginRight: '12px' }}
                    />
                    <span style={{ color: '#2C3E50', fontWeight: 600 }}>Internal Board</span>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px', marginLeft: '28px' }}>
                      Full volunteer details with all metrics
                    </p>
                  </label>
                  <label
                    className="flex-1 p-4 cursor-pointer transition-all"
                    style={{
                      backgroundColor: audienceType === 'public' ? '#F0F7F4' : '#F5F7FA',
                      borderRadius: '8px',
                      border: audienceType === 'public' ? '2px solid #779F8D' : '1px solid #E0E0E0'
                    }}
                  >
                    <input
                      type="radio"
                      name="audience"
                      checked={audienceType === 'public'}
                      onChange={() => {
                        setAudienceType('public');
                        setShowPreview(false);
                        setShowExportOptions(false);
                      }}
                      style={{ accentColor: '#779F8D', marginRight: '12px' }}
                    />
                    <span style={{ color: '#2C3E50', fontWeight: 600 }}>Public/External</span>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginTop: '8px', marginLeft: '28px' }}>
                      Anonymized data for stakeholders
                    </p>
                  </label>
                </div>
              </div>

              {/* Metrics Selection */}
              <div className="mb-6">
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                  <BarChart3 size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  Select Metrics to Include
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableMetrics.map((metric) => (
                    <label
                      key={metric}
                      className="flex items-center gap-3 p-4 cursor-pointer transition-all"
                      style={{
                        backgroundColor: metrics.includes(metric) ? '#F0F7F4' : '#F5F7FA',
                        borderRadius: '8px',
                        border: metrics.includes(metric) ? '2px solid #779F8D' : '1px solid #E0E0E0'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={metrics.includes(metric)}
                        onChange={() => {
                          toggleMetric(metric);
                          setShowPreview(false);
                          setShowExportOptions(false);
                        }}
                        style={{ accentColor: '#779F8D', width: '18px', height: '18px' }}
                      />
                      <span style={{ color: '#2C3E50', fontWeight: 500 }}>{metric}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (metrics.length === 0) {
                      return;
                    }
                    setShowPreview(true);
                    setShowExportOptions(true);
                    requestAnimationFrame(() => {
                      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2"
                  disabled={metrics.length === 0}
                >
                  <Eye size={18} />
                  <span>Generate Preview</span>
                </Button>
              </div>
            </div>

            {/* Preview Section */}
            {showPreview && (
              <div ref={previewRef} className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
                {/* Professional Report Header */}
                <div className="text-center mb-8 pb-6" style={{ borderBottom: '2px solid #E0E0E0' }}>
                  <div style={{ color: '#779F8D', fontSize: '14px', fontWeight: 600, marginBottom: '8px', letterSpacing: '2px' }}>
                    IMPACTHUB VOLUNTEER IMPACT REPORT
                  </div>
                  <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '28px', marginBottom: '8px' }}>
                    {timeframe} Impact Summary
                  </h2>
                  <div style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.7 }}>
                    Report Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <Badge 
                    variant={audienceType === 'public' ? 'warning' : 'success'}
                    className="mt-3"
                  >
                    {audienceType === 'public' ? 'Public Distribution - Anonymized Data' : 'Internal Use - Full Details'}
                  </Badge>
                </div>

                {/* Executive Summary */}
                <div className="mb-8">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '16px' }}>
                    Executive Summary
                  </h3>
                  <div className="p-6" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px', borderLeft: '4px solid #779F8D' }}>
                    <p style={{ color: '#2C3E50', fontSize: '15px', lineHeight: '1.7', marginBottom: '12px' }}>
                      During {timeframe}, our volunteer program demonstrated <strong>exceptional growth and impact</strong> across all key metrics. 
                      Our dedicated volunteers contributed over <strong>3,456 hours</strong> of service, supporting <strong>127 community events</strong> 
                      and reaching an estimated <strong>5,200 beneficiaries</strong>.
                    </p>
                    <p style={{ color: '#2C3E50', fontSize: '15px', lineHeight: '1.7' }}>
                      Retention rate improved to <strong>87%</strong>, reflecting increased volunteer satisfaction and program effectiveness. 
                      {audienceType === 'internal' && ' High-risk skill certifications increased by 23%, enabling broader event coverage.'}
                    </p>
                  </div>
                </div>

                {/* Key Metrics Dashboard */}
                <div className="mb-8">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '16px' }}>
                    Key Performance Indicators
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 text-center" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px solid #779F8D' }}>
                      <Users size={24} color="#779F8D" style={{ margin: '0 auto 8px' }} />
                      <div style={{ color: '#779F8D', fontSize: '13px', marginBottom: '4px', fontWeight: 600 }}>Total Volunteers</div>
                      <div style={{ color: '#2C3E50', fontSize: '28px', fontWeight: 700 }}>248</div>
                      <div style={{ color: '#81C784', fontSize: '12px', marginTop: '4px' }}>↑ 18% vs Q3</div>
                    </div>
                    <div className="p-4 text-center" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px solid #779F8D' }}>
                      <TrendingUp size={24} color="#779F8D" style={{ margin: '0 auto 8px' }} />
                      <div style={{ color: '#779F8D', fontSize: '13px', marginBottom: '4px', fontWeight: 600 }}>Total Hours</div>
                      <div style={{ color: '#2C3E50', fontSize: '28px', fontWeight: 700 }}>3,456</div>
                      <div style={{ color: '#81C784', fontSize: '12px', marginTop: '4px' }}>↑ 24% vs Q3</div>
                    </div>
                    <div className="p-4 text-center" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px solid #779F8D' }}>
                      <Calendar size={24} color="#779F8D" style={{ margin: '0 auto 8px' }} />
                      <div style={{ color: '#779F8D', fontSize: '13px', marginBottom: '4px', fontWeight: 600 }}>Events</div>
                      <div style={{ color: '#2C3E50', fontSize: '28px', fontWeight: 700 }}>127</div>
                      <div style={{ color: '#81C784', fontSize: '12px', marginTop: '4px' }}>↑ 15% vs Q3</div>
                    </div>
                    <div className="p-4 text-center" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px solid #779F8D' }}>
                      <BarChart3 size={24} color="#779F8D" style={{ margin: '0 auto 8px' }} />
                      <div style={{ color: '#779F8D', fontSize: '13px', marginBottom: '4px', fontWeight: 600 }}>Retention</div>
                      <div style={{ color: '#2C3E50', fontSize: '28px', fontWeight: 700 }}>87%</div>
                      <div style={{ color: '#81C784', fontSize: '12px', marginTop: '4px' }}>↑ 5% vs Q3</div>
                    </div>
                  </div>
                </div>

                {/* Impact Breakdown Chart (Visualized as horizontal bars) */}
                <div className="mb-8">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '16px' }}>
                    Impact by Category
                  </h3>
                  <div className="space-y-4">
                    {[
                      { category: 'Food Bank Services', hours: 1240, percentage: 36, color: '#779F8D' },
                      { category: 'Environmental Conservation', hours: 865, percentage: 25, color: '#81C784' },
                      { category: 'Community Workshops', hours: 692, percentage: 20, color: '#A5D6A7' },
                      { category: 'Education', hours: 415, percentage: 12, color: '#C8E6C9' },
                      { category: 'Health & Wellness', hours: 244, percentage: 7, color: '#E8F5E9' }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>{item.category}</span>
                          <span style={{ color: '#779F8D', fontSize: '14px', fontWeight: 600 }}>{item.hours} hrs ({item.percentage}%)</span>
                        </div>
                        <div style={{ width: '100%', height: '24px', backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${item.percentage}%`,
                              height: '100%',
                              backgroundColor: item.color,
                              transition: 'width 0.3s ease'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Volunteer Demographics (Internal Only) */}
                {audienceType === 'internal' && (
                  <div className="mb-8">
                    <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '16px' }}>
                      Volunteer Demographics & Skills Distribution
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Age Distribution</h4>
                        <div className="space-y-3">
                          {[
                            { range: '18-25', count: 62, percentage: 25 },
                            { range: '26-35', count: 89, percentage: 36 },
                            { range: '36-50', count: 67, percentage: 27 },
                            { range: '51+', count: 30, percentage: 12 }
                          ].map((group, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <span style={{ color: '#2C3E50', fontSize: '13px', width: '60px' }}>{group.range}</span>
                              <div style={{ flex: 1, height: '20px', backgroundColor: '#E0E0E0', borderRadius: '100px', overflow: 'hidden' }}>
                                <div style={{ width: `${group.percentage}%`, height: '100%', backgroundColor: '#779F8D' }} />
                              </div>
                              <span style={{ color: '#779F8D', fontSize: '13px', fontWeight: 600, width: '50px', textAlign: 'right' }}>{group.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Top Skills</h4>
                        <div className="space-y-3">
                          {[
                            { skill: 'Delivery Driver', count: 45, certified: true },
                            { skill: 'Community Outreach', count: 38, certified: true },
                            { skill: 'Teaching', count: 52, certified: false },
                            { skill: 'Food Service', count: 31, certified: true }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2" style={{ backgroundColor: '#F5F7FA', borderRadius: '6px' }}>
                              <span style={{ color: '#2C3E50', fontSize: '13px' }}>
                                {item.skill} {item.certified && '⚠️'}
                              </span>
                              <Badge variant="success" style={{ fontSize: '11px' }}>{item.count} volunteers</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top Contributors Table */}
                <div className="mb-8">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '16px' }}>
                    Top Contributors
                  </h3>
                  <div className="overflow-auto" style={{ borderRadius: '8px', border: '1px solid #E0E0E0' }}>
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#F5F7FA', borderBottom: '2px solid #E0E0E0' }}>
                          <th style={{ padding: '12px 16px', textAlign: 'left', color: '#779F8D', fontWeight: 600, fontSize: '13px' }}>
                            VOLUNTEER
                          </th>
                          <th style={{ padding: '12px 16px', textAlign: 'center', color: '#779F8D', fontWeight: 600, fontSize: '13px' }}>
                            HOURS
                          </th>
                          <th style={{ padding: '12px 16px', textAlign: 'center', color: '#779F8D', fontWeight: 600, fontSize: '13px' }}>
                            EVENTS
                          </th>
                          <th style={{ padding: '12px 16px', textAlign: 'center', color: '#779F8D', fontWeight: 600, fontSize: '13px' }}>
                            IMPACT
                          </th>
                          {audienceType === 'internal' && (
                            <th style={{ padding: '12px 16px', textAlign: 'left', color: '#779F8D', fontWeight: 600, fontSize: '13px' }}>
                              SKILLS
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {mockPreviewData.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #E0E0E0' }}>
                            <td style={{ padding: '14px 16px', color: '#2C3E50', fontWeight: 500 }}>{row.volunteer}</td>
                            <td style={{ padding: '14px 16px', color: '#2C3E50', fontWeight: 700, textAlign: 'center' }}>{row.hours}</td>
                            <td style={{ padding: '14px 16px', color: '#2C3E50', textAlign: 'center' }}>{row.events}</td>
                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                              <Badge variant={row.impact === 'High' ? 'success' : 'warning'}>
                                {row.impact}
                              </Badge>
                            </td>
                            {audienceType === 'internal' && (
                              <td style={{ padding: '14px 16px', color: '#2C3E50', fontSize: '13px' }}>
                                {'skills' in row ? row.skills : ''}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Report Footer */}
                <div className="text-center pt-6" style={{ borderTop: '2px solid #E0E0E0' }}>
                  <p style={{ color: '#2C3E50', fontSize: '13px', opacity: 0.7, marginBottom: '4px' }}>
                    {audienceType === 'public' 
                      ? 'This report contains anonymized data for public distribution. Individual volunteer identities are protected.'
                      : 'This report contains sensitive volunteer information. For internal use only - do not distribute externally.'}
                  </p>
                  <p style={{ color: '#779F8D', fontSize: '12px', fontWeight: 600 }}>
                    Generated by ImpactHub Volunteer Management System
                  </p>
                </div>

                {showExportOptions && (
                  <div className="mt-8 p-6" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', border: '1px solid #E0E0E0' }}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>Select Export Format</p>
                        <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8 }}>Your download respects the {audienceType === 'public' ? 'anonymization' : 'full detail'} settings above.</p>
                      </div>
                      <Badge variant="success">Ready</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="primary"
                        className="flex-1 min-w-[180px] flex items-center justify-center gap-2"
                        onClick={() => alert('PDF download simulated')}
                      >
                        <Download size={18} />
                        <span>Download PDF</span>
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 min-w-[180px] flex items-center justify-center gap-2"
                        onClick={() => alert('Excel export simulated')}
                      >
                        <Download size={18} />
                        <span>Export Excel</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px', marginBottom: '16px' }}>
                Privacy & Data Protection
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F0F7F4', borderRadius: '50%' }}>
                    <Eye size={16} color="#779F8D" />
                  </div>
                  <div>
                    <p style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>
                      Anonymization
                    </p>
                    <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8 }}>
                      Public reports automatically remove personal identifiers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F0F7F4', borderRadius: '50%' }}>
                    <Users size={16} color="#779F8D" />
                  </div>
                  <div>
                    <p style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>
                      Access Control
                    </p>
                    <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8 }}>
                      Internal reports available to admins only
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F0F7F4', borderRadius: '50%' }}>
                    <TrendingUp size={16} color="#779F8D" />
                  </div>
                  <div>
                    <p style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>
                      Verified Data
                    </p>
                    <p style={{ color: '#2C3E50', fontSize: '14px', opacity: 0.8 }}>
                      Only approved volunteer hours included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
