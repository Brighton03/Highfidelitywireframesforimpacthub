import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { CheckCircle2, Calendar, MapPin, Users, Clock, Target, AlertTriangle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SKILL_OPTIONS, createHighRiskSkillSet } from '@/constants/skills';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const JS_WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const EVENT_INTEREST_TAG = 'Food Distribution';

type SlotDescriptor = {
  day: string;
  start: string;
  end: string;
};

interface VolunteerProfile {
  name: string;
  skills: string[];
  interests: string[];
  availabilityPreferences: SlotDescriptor[];
}

const VOLUNTEER_POOL: VolunteerProfile[] = [
  {
    name: 'Priya Desai',
    skills: ['Delivery Driver', 'Food Handling', 'First Aid'],
    interests: ['Food Distribution', 'Community Logistics'],
    availabilityPreferences: [
      { day: 'Friday', start: '09:00', end: '12:00' },
      { day: 'Saturday', start: '08:00', end: '11:00' }
    ]
  },
  {
    name: 'Luis Ramirez',
    skills: ['Warehouse Operations', 'Administrative'],
    interests: ['Food Distribution'],
    availabilityPreferences: [
      { day: 'Friday', start: '09:00', end: '12:00' }
    ]
  },
  {
    name: 'Aisha Khan',
    skills: ['Teaching/Education', 'Customer Service'],
    interests: ['Youth Mentorship'],
    availabilityPreferences: [
      { day: 'Thursday', start: '10:00', end: '13:00' }
    ]
  },
  {
    name: 'Marco Silva',
    skills: ['Delivery Driver', 'First Aid'],
    interests: ['Food Distribution', 'Community Health'],
    availabilityPreferences: [
      { day: 'Friday', start: '09:00', end: '12:00' },
      { day: 'Sunday', start: '09:00', end: '12:00' }
    ]
  },
  {
    name: 'Yuna Park',
    skills: ['Food Handling', 'Customer Service'],
    interests: ['Sustainability'],
    availabilityPreferences: [
      { day: 'Saturday', start: '09:00', end: '12:00' }
    ]
  },
  {
    name: 'Selena Wong',
    skills: ['Delivery Driver', 'Recycling Expertise'],
    interests: ['Food Distribution'],
    availabilityPreferences: [
      { day: 'Wednesday', start: '09:00', end: '12:00' }
    ]
  }
];

/**
 * BUSINESS RULES ENFORCEMENT - Create Event & Recruit Volunteers
 * 
 * 1. ROLE INTEGRITY & PERMISSIONS
 *    - Only Programme Coordinators can create events
 *    - Coordinators can only edit their own events (creator ID check)
 *    - Admin approval required for events with >50 volunteers
 *    - High-capacity events require additional documentation
 * 
 * 2. SKILL REQUIREMENT SPECIFICATION
 *    - Must define required skills/certifications for event
 *    - Auto-match volunteers based on skill compatibility
 *    - Filter volunteer pool to show only qualified candidates
 *    - Warn when assigning volunteer without required skill
 * 
 * 3. SMART RECRUITMENT
 *    - Auto-recommend volunteers based on:
 *      * Skill match percentage
 *      * Historical attendance rate
 *      * Geographic proximity to event location
 *      * Previous participation in similar events
 *    - Send targeted invitations to high-match volunteers
 */

interface CreateEventFlowProps {
  onBackToManager?: () => void;
  onDiscarded?: () => void;
  scenario?: 'default' | 'no-matches';
}

type StepType =
  | 'title-description'
  | 'event-type'
  | 'schedule'
  | 'uniform-roster'
  | 'next-action'
  | 'matches'
  | 'publish'
  | 'confirmation';

const STEP_SEQUENCE: StepType[] = ['title-description', 'event-type', 'schedule', 'uniform-roster', 'next-action', 'matches', 'publish', 'confirmation'];
const STEP_NAV_SEQUENCE: StepType[] = STEP_SEQUENCE.filter((step) => step !== 'confirmation');
const STEP_LABELS: Record<StepType, string> = {
  'title-description': 'Details',
  'event-type': 'Type',
  'schedule': 'Schedule',
  'uniform-roster': 'Roster',
  'next-action': 'Recruit',
  'matches': 'Matches',
  'publish': 'Publish',
  'confirmation': 'Confirm'
};

const DEFAULT_RECURRING_ANCHOR = '2025-11-28';

export function CreateEventFlow({ onBackToManager, onDiscarded, scenario = 'default' }: CreateEventFlowProps) {
  const weekDays = WEEK_DAYS;
  const jsWeekDayNames = JS_WEEKDAY_NAMES;
  const months = MONTH_NAMES;
  const defaultAnchorDate = new Date(`${DEFAULT_RECURRING_ANCHOR}T00:00:00`);

  const [step, setStep] = useState<StepType>('title-description');
  const [eventType, setEventType] = useState<'single' | 'recurring'>('recurring');
  const [recurringPattern, setRecurringPattern] = useState<'recurring' | 'manual'>('recurring');
  const [recurringPreset, setRecurringPreset] = useState<'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'yearly' | 'custom'>('weekly');
  const [customInterval, setCustomInterval] = useState(1);
  const [customWeekDays, setCustomWeekDays] = useState<string[]>(['Friday']);
  const [customFrequency, setCustomFrequency] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [customEndMode, setCustomEndMode] = useState<'never' | 'on' | 'after'>('never');
  const [customEndDate, setCustomEndDate] = useState('2026-02-27');
  const [customOccurrences, setCustomOccurrences] = useState(10);
  const [customMonthlyDay, setCustomMonthlyDay] = useState(() => defaultAnchorDate.getDate());
  const [yearlyMonth, setYearlyMonth] = useState(() => months[defaultAnchorDate.getMonth()]);
  const [yearlyDay, setYearlyDay] = useState(() => defaultAnchorDate.getDate());
  const [eventTitle, setEventTitle] = useState('Weekly Food Delivery');
  const [roleName, setRoleName] = useState('Driver');
  const [roleCapacity, setRoleCapacity] = useState(3);
  const [requiredSkills, setRequiredSkills] = useState<string[]>(['Delivery Driver']);
  const [eventCapacity, setEventCapacity] = useState(20);
  const [uniformStart, setUniformStart] = useState('09:00');
  const [uniformEnd, setUniformEnd] = useState('12:00');
  const [singleDate, setSingleDate] = useState('');
  const [recurringStartDate, setRecurringStartDate] = useState(DEFAULT_RECURRING_ANCHOR);
  const [calendarViewDate, setCalendarViewDate] = useState(DEFAULT_RECURRING_ANCHOR);
  const [manualSelectedDates, setManualSelectedDates] = useState<string[]>([]);
  const [manualCalendarViewDate, setManualCalendarViewDate] = useState(DEFAULT_RECURRING_ANCHOR);
  const [nextActionChoice, setNextActionChoice] = useState<'publish-now' | 'smart-match'>('smart-match');
  const [publishMode, setPublishMode] = useState<'direct-invites' | 'public-only'>('direct-invites');

  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [showUndoBanner, setShowUndoBanner] = useState(false);
  const [confirmationContext, setConfirmationContext] = useState<'publish-now' | 'publish-with-invites' | null>(null);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [rosterError, setRosterError] = useState<string | null>(null);
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rawNavIndex = STEP_NAV_SEQUENCE.indexOf(step);
  const currentStepIndex = rawNavIndex === -1 ? STEP_NAV_SEQUENCE.length - 1 : rawNavIndex;
  const progressRatio = currentStepIndex / Math.max(1, STEP_NAV_SEQUENCE.length - 1);
  const highRiskSkillSet = createHighRiskSkillSet();
  const safetyCheckPillStyle = {
    backgroundColor: '#FFB74D',
    color: '#2C3E50',
    borderRadius: '999px',
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    border: '1px solid #FFB74D',
    boxShadow: 'none'
  } as const;

  const handleStepJump = (targetStep: StepType, targetIndex: number) => {
    if (targetIndex <= currentStepIndex) {
      setStep(targetStep);
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardConfirm(false);
    setStep('title-description');
    if (onDiscarded) {
      onDiscarded();
    }
    if (onBackToManager) {
      onBackToManager();
      return;
    }
    setShowUndoBanner(true);
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
    }
    undoTimeoutRef.current = setTimeout(() => {
      setShowUndoBanner(false);
      undoTimeoutRef.current = null;
    }, 5000);
  };

  const handleUndoDiscard = () => {
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
      undoTimeoutRef.current = null;
    }
    setShowUndoBanner(false);
    setStep('title-description');
  };

  const toggleSkill = (skill: string) => {
    setRequiredSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleCustomWeekday = (day: string) => {
    setCustomWeekDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleManualDate = (iso: string) => {
    setManualSelectedDates((prev) => {
      const exists = prev.includes(iso);
      if (exists) {
        return prev.filter((date) => date !== iso);
      }
      const next = [...prev, iso];
      return next.sort((a, b) => new Date(`${a}T00:00:00`).getTime() - new Date(`${b}T00:00:00`).getTime());
    });
  };

  const renderRecurringPresetDetails = () => {
    if (recurringPreset === 'daily') {
      return (
        <div className="p-5" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '32px' }}>
          <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Daily cadence</div>
          <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '0' }}>
            Volunteers repeat this shift every day once published. Ideal for daily drops or rotating onsite help.
          </p>
        </div>
      );
    }

    if (recurringPreset === 'weekly' || recurringPreset === 'bi-weekly') {
      return (
        <div className="p-5" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '32px' }}>
          <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Week-by-week cadence</div>
          <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
            {recurringPreset === 'bi-weekly' ? 'Every other week' : 'Weekly'} patterns stay flexible—choose your active weekdays on the schedule step and we will repeat automatically.
          </p>
        </div>
      );
    }

    if (recurringPreset === 'monthly') {
      return (
        <div className="p-5" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '32px' }}>
          <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Monthly cadence</div>
          <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
            No additional setup needed. Pick your anchor date on the next step and we will repeat the shift on that day each month.
          </p>
        </div>
      );
    }

    if (recurringPreset === 'yearly') {
      return (
        <div className="space-y-3 p-5" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '32px' }}>
          <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '4px' }}>Annual anchor</div>
          <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
            Pick the exact month and day in the Schedule step. No calendar scrolling required—just set the annual anchor once and we will repeat every year.
          </p>
        </div>
      );
    }

    if (recurringPreset === 'custom') {
      return (
        <div className="space-y-5 p-6" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '32px' }}>
          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Repeat every
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="number"
                min="1"
                value={customInterval}
                onChange={(e) => setCustomInterval(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
              />
              <select
                value={customFrequency}
                onChange={(e) => {
                  const freq = e.target.value as 'day' | 'week' | 'month' | 'year';
                  setCustomFrequency(freq);
                }}
                className="px-3 py-2 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50', minWidth: '160px' }}
              >
                <option value="day">day</option>
                <option value="week">week</option>
                <option value="month">month</option>
                <option value="year">year</option>
              </select>
            </div>
          </div>

          {customFrequency === 'week' && (
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Repeat on
              </label>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => {
                  const isSelected = customWeekDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleCustomWeekday(day)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        border: `1px solid ${isSelected ? '#779F8D' : '#E0E0E0'}`,
                        backgroundColor: isSelected ? '#F0F7F4' : '#FFFFFF',
                        color: '#2C3E50',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {day.slice(0, 1)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {customFrequency === 'month' && (
            <div>
              <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                Day of month
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={customMonthlyDay}
                onChange={(e) => setCustomMonthlyDay(Math.min(31, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border"
                style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
              />
              <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '6px' }}>Repeats on this day each cycle.</p>
            </div>
          )}

          <div>
            <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
              Ends
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={customEndMode === 'never'}
                  onChange={() => setCustomEndMode('never')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>Never</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={customEndMode === 'on'}
                  onChange={() => setCustomEndMode('on')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>On</span>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  disabled={customEndMode !== 'on'}
                  className="px-3 py-2 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    opacity: customEndMode === 'on' ? 1 : 0.5
                  }}
                />
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={customEndMode === 'after'}
                  onChange={() => setCustomEndMode('after')}
                  style={{ accentColor: '#779F8D' }}
                />
                <span style={{ color: '#2C3E50' }}>After</span>
                <input
                  type="number"
                  min="1"
                  value={customOccurrences}
                  onChange={(e) => setCustomOccurrences(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={customEndMode !== 'after'}
                  className="w-24 px-3 py-2 border"
                  style={{
                    borderColor: '#E0E0E0',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    opacity: customEndMode === 'after' ? 1 : 0.5
                  }}
                />
                <span style={{ color: '#2C3E50' }}>occurrences</span>
              </label>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const calendarDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const isoFromDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (iso: string) => {
    if (!iso) return '';
    const date = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()].slice(0, 3);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatReadableDateWithYear = (iso: string) => formatDisplayDate(iso);

  const formatMonthYearLabel = (iso: string) => {
    const date = new Date(`${iso}T00:00:00`);
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const buildCalendarGrid = (anchorISO: string) => {
    const reference = anchorISO || DEFAULT_RECURRING_ANCHOR;
    const anchorDate = new Date(`${reference}T00:00:00`);
    const firstOfMonth = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
    const mondayAlignedOffset = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(firstOfMonth.getDate() - mondayAlignedOffset);

    return Array.from({ length: 42 }, (_, index) => {
      const cellDate = new Date(gridStart);
      cellDate.setDate(gridStart.getDate() + index);
      return {
        iso: isoFromDate(cellDate),
        label: cellDate.getDate(),
        isCurrentMonth: cellDate.getMonth() === anchorDate.getMonth()
      };
    });
  };


  const selectedAnchorDate = recurringStartDate || DEFAULT_RECURRING_ANCHOR;
  const calendarReferenceDate = calendarViewDate || selectedAnchorDate;
  const calendarDays = buildCalendarGrid(calendarReferenceDate);
  const manualCalendarDays = buildCalendarGrid(manualCalendarViewDate);
  const manualCalendarMonthLabel = formatMonthYearLabel(manualCalendarViewDate);
  const manualSelectedDatesSet = new Set(manualSelectedDates);
  const calendarMonthLabel = formatMonthYearLabel(calendarReferenceDate);
  const dayInMs = 24 * 60 * 60 * 1000;
  const isCustomYearly = recurringPreset === 'custom' && customFrequency === 'year';
  const isYearlyMode = recurringPreset === 'yearly' || isCustomYearly;

  const timeStringToMinutes = (value: string) => {
    if (!value) return 0;
    const [hours, minutes] = value.split(':').map((segment) => parseInt(segment, 10));
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return 0;
    }
    return hours * 60 + minutes;
  };

  const buildSlotDescriptor = (iso: string): SlotDescriptor | null => {
    if (!iso) return null;
    const parsed = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(parsed.getTime()) || !uniformStart || !uniformEnd) {
      return null;
    }
    return {
      day: jsWeekDayNames[parsed.getDay()],
      start: uniformStart,
      end: uniformEnd
    };
  };

  const eventSlotDescriptors: SlotDescriptor[] = (() => {
    if (eventType === 'single' && singleDate) {
      const descriptor = buildSlotDescriptor(singleDate);
      return descriptor ? [descriptor] : [];
    }

    if (eventType === 'recurring' && recurringPattern === 'manual' && manualSelectedDates.length) {
      return manualSelectedDates
        .map((date) => buildSlotDescriptor(date))
        .filter((descriptor): descriptor is SlotDescriptor => Boolean(descriptor));
    }

    if (eventType === 'recurring') {
      const descriptor = buildSlotDescriptor(selectedAnchorDate);
      return descriptor ? [descriptor] : [];
    }

    return [];
  })();

  const primarySlotLabel = eventSlotDescriptors.length
    ? `${eventSlotDescriptors[0].day} ${eventSlotDescriptors[0].start}-${eventSlotDescriptors[0].end}`
    : 'this opportunity';

  const volunteerMatchStats = VOLUNTEER_POOL.map((volunteer) => {
    const hasSkill = requiredSkills.length === 0
      ? true
      : requiredSkills.some((skill) => volunteer.skills.includes(skill));
    const hasInterest = volunteer.interests.includes(EVENT_INTEREST_TAG);
    const hasAvailability = eventSlotDescriptors.length === 0
      ? false
      : eventSlotDescriptors.some((slot) =>
          volunteer.availabilityPreferences.some(
            (pref) => pref.day === slot.day && pref.start === slot.start && pref.end === slot.end
          )
        );

    return {
      ...volunteer,
      hasSkill,
      hasInterest,
      hasAvailability,
      isHighConfidence: hasSkill && hasInterest && hasAvailability
    };
  });

  const isZeroMatchScenario = scenario === 'no-matches';
  const mediumConfidenceMatches = volunteerMatchStats.filter(
    (vol) => vol.hasSkill && vol.hasInterest && !vol.isHighConfidence
  );
  const mediumConfidenceCount = mediumConfidenceMatches.length;
  const mediumConfidenceLabel = mediumConfidenceCount === 1 ? 'match' : 'matches';
  const computedHighConfidenceMatches = volunteerMatchStats.filter((vol) => vol.isHighConfidence);
  const highConfidenceMatches = isZeroMatchScenario ? [] : computedHighConfidenceMatches;
  const highConfidenceCount = highConfidenceMatches.length;
  const highConfidenceLabel = highConfidenceCount === 1 ? 'match' : 'matches';
  const matchedVolunteersSummary = isZeroMatchScenario
    ? `${mediumConfidenceCount} medium-confidence ${mediumConfidenceLabel} available after confirming availability`
    : `${highConfidenceCount} high-confidence ${highConfidenceLabel} ready for invites`;

  const buildManualDatesSummary = () => {
    if (manualSelectedDates.length === 0) {
      return 'Manual dates not selected yet.';
    }
    const preview = manualSelectedDates
      .slice(0, 3)
      .map((date) => formatReadableDateWithYear(date))
      .join(', ');
    const overflow = manualSelectedDates.length > 3 ? `, +${manualSelectedDates.length - 3} more` : '';
    return `Manual dates (${manualSelectedDates.length}): ${preview}${overflow}\nUniform shift ${uniformStart} - ${uniformEnd}`;
  };

  const getRoleSummary = () => {
    const safeCapacity = Math.max(0, roleCapacity);
    const capacityLabel = `${safeCapacity} volunteer${safeCapacity === 1 ? '' : 's'} needed`;
    const label = roleName.trim() || 'Role not defined';
    return `${label} (${capacityLabel})`;
  };

  const getScheduleStepDescription = () => {
    if (eventType === 'single') {
      return 'Pick a single date along with the uniform start/end time for this shift.';
    }

    if (recurringPattern === 'manual') {
      return 'Choose specific dates from the calendar; uniform start/end times apply to every selected shift.';
    }

    if (recurringPreset === 'daily') {
      return 'Set the first shift date and uniform time range—ImpactHub repeats it every day automatically.';
    }

    if (recurringPreset === 'weekly') {
      return 'Select an anchor date to lock in your weekday cadence. Future weekly shifts mirror the same hours.';
    }

    if (recurringPreset === 'bi-weekly') {
      return 'Choose the kick-off date for this every-other-week route. We stagger future shifts based on that anchor.';
    }

    if (recurringPreset === 'monthly') {
      return 'Anchor this opportunity to a specific day each month. Pick the start date and we replicate the cadence for you.';
    }

    if (isYearlyMode) {
      return isCustomYearly
        ? 'Set the annual anchor by month and day—custom yearly intervals reuse these shift hours automatically.'
        : 'Lock this opportunity to a single annual moment—just set the month, day, and shift hours once.';
    }

    if (recurringPreset === 'custom') {
      return 'Choose your anchor date and uniform times; custom intervals and weekdays determine the future pattern.';
    }

    return 'Configure your recurring pattern by selecting an anchor date and uniform shift times.';
  };

  const validateScheduleStep = () => {
    if (!uniformStart || !uniformEnd) {
      return 'Provide both a start and end time for these shifts.';
    }

    if (timeStringToMinutes(uniformEnd) <= timeStringToMinutes(uniformStart)) {
      return 'The end time must be later than the start time.';
    }

    if (eventType === 'single') {
      if (!singleDate) {
        return 'Select a date for this single event before continuing.';
      }
      return null;
    }

    if (recurringPattern === 'manual') {
      if (manualSelectedDates.length === 0) {
        return 'Select at least one calendar date for this manual series.';
      }
      return null;
    }

    if (!selectedAnchorDate) {
      return 'Pick a start date on the calendar to generate this recurring series.';
    }

    return null;
  };

  const handleScheduleContinue = () => {
    const error = validateScheduleStep();
    if (error) {
      setScheduleError(error);
      return;
    }
    setScheduleError(null);
    setStep('uniform-roster');
  };

  const handleRosterContinue = () => {
    if (!roleName.trim()) {
      setRosterError('Add at least one shift role to continue.');
      return;
    }

    if (roleCapacity < 1) {
      setRosterError('Role capacity must be at least 1.');
      return;
    }

    setRosterError(null);
    setStep('next-action');
  };

  const handleNextActionContinue = () => {
    if (nextActionChoice === 'publish-now') {
      setConfirmationContext('publish-now');
      setStep('confirmation');
      return;
    }
    setStep('matches');
  };

  useEffect(() => {
    if (!isYearlyMode || !selectedAnchorDate) {
      return;
    }
    const anchorDate = new Date(`${selectedAnchorDate}T00:00:00`);
    const anchorMonthName = months[anchorDate.getMonth()];
    const anchorDayNumber = anchorDate.getDate();
    if (anchorMonthName !== yearlyMonth) {
      setYearlyMonth(anchorMonthName);
    }
    if (anchorDayNumber !== yearlyDay) {
      setYearlyDay(anchorDayNumber);
    }
  }, [isYearlyMode, selectedAnchorDate, months, yearlyMonth, yearlyDay]);

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
    };
  }, []);

  const clampDayForMonth = (monthIndex: number, dayValue: number, year: number) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return Math.min(Math.max(1, dayValue), daysInMonth);
  };

  const updateYearlyAnchor = (nextMonth: string, rawDay: number) => {
    const nextMonthIndex = months.indexOf(nextMonth);
    if (nextMonthIndex < 0) {
      return;
    }
    const baseYear = new Date(`${selectedAnchorDate || DEFAULT_RECURRING_ANCHOR}T00:00:00`).getFullYear();
    const safeDay = clampDayForMonth(nextMonthIndex, rawDay, baseYear);
    setYearlyMonth(nextMonth);
    setYearlyDay(safeDay);
    const nextAnchorDate = new Date(baseYear, nextMonthIndex, safeDay);
    const nextIso = isoFromDate(nextAnchorDate);
    setRecurringStartDate(nextIso);
    setCalendarViewDate(nextIso);
  };

  const handleYearlyMonthChange = (value: string) => {
    updateYearlyAnchor(value, yearlyDay);
  };

  const handleYearlyDayChange = (value: number) => {
    updateYearlyAnchor(yearlyMonth, value);
  };

  const adjustManualCalendarViewByMonths = (delta: number) => {
    setManualCalendarViewDate((prev) => {
      const baseIso = prev || DEFAULT_RECURRING_ANCHOR;
      const viewDate = new Date(`${baseIso}T00:00:00`);
      viewDate.setDate(1);
      viewDate.setMonth(viewDate.getMonth() + delta);
      return isoFromDate(viewDate);
    });
  };

  const handleRecurringStartChange = (iso: string) => {
    if (!iso) return;
    setRecurringStartDate(iso);
    setCalendarViewDate(iso);
  };

  const adjustCalendarViewByMonths = (delta: number) => {
    setCalendarViewDate((prev) => {
      const baseIso = prev || selectedAnchorDate || DEFAULT_RECURRING_ANCHOR;
      const viewDate = new Date(`${baseIso}T00:00:00`);
      viewDate.setDate(1);
      viewDate.setMonth(viewDate.getMonth() + delta);
      return isoFromDate(viewDate);
    });
  };

  const getCustomCadenceSummary = () => {
    const anchor = recurringStartDate || DEFAULT_RECURRING_ANCHOR;
    const anchorDateObj = new Date(`${anchor}T00:00:00`);

    if (customFrequency === 'day') {
      return customInterval === 1 ? 'Daily' : `Every ${customInterval} days`;
    }

    if (customFrequency === 'week') {
      const effectiveWeekdays = customWeekDays.length
        ? customWeekDays
        : [jsWeekDayNames[anchorDateObj.getDay()]];
      const cadence = customInterval === 1 ? 'Weekly' : `Every ${customInterval} weeks`;
      return `${cadence} on ${effectiveWeekdays.join(', ')}`;
    }

    if (customFrequency === 'month') {
      const cadence = customInterval === 1 ? 'Monthly' : `Every ${customInterval} months`;
      return `${cadence} on day ${customMonthlyDay}`;
    }

    if (customFrequency === 'year') {
      const cadence = customInterval === 1 ? 'Annually' : `Every ${customInterval} years`;
      return `${cadence} on ${months[anchorDateObj.getMonth()]} ${anchorDateObj.getDate()}`;
    }

    return 'Custom cadence';
  };

  const getCustomEndSummary = () => {
    if (customEndMode === 'after') {
      return `${customOccurrences} ${customOccurrences === 1 ? 'time' : 'times'}`;
    }

    if (customEndMode === 'on' && customEndDate) {
      return `until ${formatReadableDateWithYear(customEndDate)}`;
    }

    return '';
  };

  const getRecurringSummaryLabel = () => {
    const anchor = recurringStartDate || DEFAULT_RECURRING_ANCHOR;
    const anchorDateObj = new Date(`${anchor}T00:00:00`);

    if (recurringPreset === 'daily') {
      return `Daily • ${uniformStart} - ${uniformEnd}`;
    }

    if (recurringPreset === 'weekly' || recurringPreset === 'bi-weekly') {
      const dayLabel = jsWeekDayNames[anchorDateObj.getDay()];
      const cadence = recurringPreset === 'bi-weekly' ? 'Every other week' : 'Weekly';
      return `${cadence} on ${dayLabel} • ${uniformStart} - ${uniformEnd}`;
    }

    if (recurringPreset === 'monthly') {
      const dayOfMonth = anchorDateObj.getDate();
      return `Monthly on day ${dayOfMonth} • ${uniformStart} - ${uniformEnd}`;
    }

    if (recurringPreset === 'yearly') {
      return `Annual on ${months[anchorDateObj.getMonth()]} ${anchorDateObj.getDate()} • ${uniformStart} - ${uniformEnd}`;
    }

    const cadenceSummary = getCustomCadenceSummary();
    const endingSummary = getCustomEndSummary();
    const combinedSummary = endingSummary ? `${cadenceSummary}, ${endingSummary}` : cadenceSummary;
    return `${combinedSummary} • ${uniformStart} - ${uniformEnd}`;
  };

  const getCadenceSummaryForPublish = () => {
    if (eventType === 'single') {
      if (!singleDate) {
        return 'Single shift date/time not selected yet.';
      }
      return `Single shift on ${formatReadableDateWithYear(singleDate)} • ${uniformStart} - ${uniformEnd}`;
    }

    if (recurringPattern === 'manual') {
      return buildManualDatesSummary();
    }

    const anchorLabel = formatReadableDateWithYear(selectedAnchorDate);
    const recurringLabel = getRecurringSummaryLabel();
    return anchorLabel ? `${recurringLabel}\nStarts ${anchorLabel}` : recurringLabel;
  };

  const doesDateMatchCustomPattern = (target: Date, anchor: Date) => {
    const diffDays = Math.round((target.getTime() - anchor.getTime()) / dayInMs);
    if (diffDays < 0) return false;

    if (customFrequency === 'day') {
      return diffDays % customInterval === 0;
    }

    if (customFrequency === 'week') {
      const effectiveWeekdays = customWeekDays.length ? customWeekDays : [jsWeekDayNames[anchor.getDay()]];
      const targetLabel = jsWeekDayNames[target.getDay()];
      if (!effectiveWeekdays.includes(targetLabel)) {
        return false;
      }
      const weekOffset = Math.floor(diffDays / 7);
      return weekOffset % customInterval === 0;
    }

    if (customFrequency === 'month') {
      const monthDiff = (target.getFullYear() - anchor.getFullYear()) * 12 + (target.getMonth() - anchor.getMonth());
      if (monthDiff < 0 || monthDiff % customInterval !== 0) {
        return false;
      }

      const maxDays = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      const targetDay = Math.min(customMonthlyDay, maxDays);
      return target.getDate() === targetDay;
    }

    if (customFrequency === 'year') {
      const yearDiff = target.getFullYear() - anchor.getFullYear();
      if (yearDiff < 0 || yearDiff % customInterval !== 0) {
        return false;
      }
      return target.getMonth() === anchor.getMonth() && target.getDate() === anchor.getDate();
    }

    return false;
  };

  const doesDateMatchRecurringPattern = (iso: string) => {
    if (recurringPattern !== 'recurring' || !selectedAnchorDate) {
      return false;
    }

    const anchor = new Date(`${selectedAnchorDate}T00:00:00`);
    const target = new Date(`${iso}T00:00:00`);
    const diffDays = Math.round((target.getTime() - anchor.getTime()) / dayInMs);
    if (diffDays < 0) {
      return false;
    }

    if (recurringPreset === 'daily') {
      return true;
    }

    if (recurringPreset === 'weekly') {
      return target.getDay() === anchor.getDay();
    }

    if (recurringPreset === 'bi-weekly') {
      const weekOffset = Math.floor(diffDays / 7);
      return target.getDay() === anchor.getDay() && weekOffset % 2 === 0;
    }

    if (recurringPreset === 'monthly') {
      return target.getDate() === anchor.getDate();
    }

    if (recurringPreset === 'yearly') {
      return target.getMonth() === anchor.getMonth() && target.getDate() === anchor.getDate();
    }

    if (recurringPreset === 'custom') {
      return doesDateMatchCustomPattern(target, anchor);
    }

    return false;
  };

  const highlightedRecurringDates = new Set(calendarDays.filter((day) => doesDateMatchRecurringPattern(day.iso)).map((day) => day.iso));

  const renderCancelHelper = () => {
    if (step === 'confirmation') {
      return null;
    }

    return (
      <div className="mt-36 text-center">
        <button
          onClick={() => setShowDiscardConfirm(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#E57373',
            textDecoration: 'underline',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '4px' }}>
          Progress is lost if you choose to cancel.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Progress Indicator */}
      {step !== 'confirmation' && (
        <>
          <div className="w-full bg-white border-b" style={{ borderColor: '#E0E0E0' }}>
            <div className="max-w-[1200px] mx-auto px-8 py-6">
              <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div
                  className="absolute top-5 h-1"
                  style={{
                    backgroundColor: '#E0E0E0',
                    left: '20px',
                    right: '20px',
                    zIndex: 0
                  }}
                />
                {/* Progress Line Fill */}
                <div
                  className="absolute top-5 h-1 transition-all"
                  style={{
                    backgroundColor: '#779F8D',
                    left: '20px',
                    width: `calc(${progressRatio} * (100% - 40px))`,
                    zIndex: 0
                  }}
                />
                {STEP_NAV_SEQUENCE.map((stepName, index) => {
                  const isActive = step === stepName;
                  const isCompleted = index < currentStepIndex;
                  const isClickable = index <= currentStepIndex;

                  return (
                    <button
                      key={stepName}
                      type="button"
                      onClick={() => handleStepJump(stepName, index)}
                      disabled={!isClickable}
                      className="flex flex-col items-center relative"
                      style={{
                        zIndex: 10,
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: isClickable ? 'pointer' : 'default',
                        opacity: isClickable ? 1 : 0.5
                      }}
                      aria-label={`Go to ${STEP_LABELS[stepName]} step`}
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center mb-2"
                        style={{
                          backgroundColor: isActive || isCompleted ? '#779F8D' : '#E0E0E0',
                          borderRadius: '50%',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          boxShadow: isActive ? '0 0 12px rgba(119,159,141,0.45)' : 'none'
                        }}
                      >
                        {isCompleted ? <CheckCircle2 size={20} /> : index + 1}
                      </div>
                      <span style={{ color: isActive ? '#2C3E50' : '#9E9E9E', fontSize: '12px', fontWeight: isActive ? 600 : 400 }}>
                        {STEP_LABELS[stepName]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="max-w-[1200px] mx-auto px-8"
            style={{ color: '#9E9E9E', fontSize: '12px', textAlign: 'center', fontStyle: 'italic', paddingTop: '8px' }}
          >
            Tap any completed step to return to it instantly.
          </div>
        </>
      )}

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-8 py-12">
        {step === 'title-description' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Event Details
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Provide basic information about your event
            </p>

            <div className="space-y-6">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Weekly Food Delivery"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
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
                  placeholder="Describe what volunteers will be doing..."
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
                  Location
                </label>
                <div className="relative">
                  <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#2C3E50' }} />
                  <input
                    type="text"
                    placeholder="Event location address"
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

              <Button variant="primary" onClick={() => setStep('event-type')} className="w-full mt-6">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'event-type' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Event Type & Cadence
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Decide if this is a single-day opportunity or a recurring program
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div
                onClick={() => setEventType('single')}
                className="p-6 border-2 cursor-pointer transition-all"
                style={{
                  borderColor: eventType === 'single' ? '#779F8D' : '#E0E0E0',
                  borderRadius: '8px',
                  backgroundColor: eventType === 'single' ? '#F0F7F4' : '#FFFFFF'
                }}
              >
                <Calendar size={32} style={{ color: '#779F8D', marginBottom: '16px' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                  Single Event
                </h3>
                <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>
                  One-time opportunity with a single date and shift
                </p>
                <span style={{ color: '#2C3E50', fontSize: '12px' }}>
                  Perfect for pop-up drives, one-off sessions, and seasonal events.
                </span>
              </div>

              <div
                onClick={() => setEventType('recurring')}
                className="p-6 border-2 cursor-pointer transition-all"
                style={{
                  borderColor: eventType === 'recurring' ? '#779F8D' : '#E0E0E0',
                  borderRadius: '8px',
                  backgroundColor: eventType === 'recurring' ? '#F0F7F4' : '#FFFFFF'
                }}
              >
                <Calendar size={32} style={{ color: '#779F8D', marginBottom: '16px' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                  Multi-shift
                </h3>
                <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>
                  Multiple shifts on a predictable cadence or specific dates
                </p>
                <span style={{ color: '#2C3E50', fontSize: '12px' }}>
                  Ideal for weekly routes, recurring tutoring, or standing commitments.
                </span>
              </div>
            </div>

            {eventType === 'recurring' ? (
              <div className="space-y-6">
                <div>
                  <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                    Schedule Generation Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={recurringPattern === 'recurring'}
                        onChange={() => setRecurringPattern('recurring')}
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50' }}>Recurring Pattern</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={recurringPattern === 'manual'}
                        onChange={() => setRecurringPattern('manual')}
                        style={{ accentColor: '#779F8D' }}
                      />
                      <span style={{ color: '#2C3E50' }}>Manual Selection</span>
                    </label>
                  </div>
                </div>

                {recurringPattern === 'recurring' && (
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                      Recurring Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {(['daily', 'weekly', 'bi-weekly', 'monthly', 'yearly', 'custom'] as const).map((preset) => (
                        <label
                          key={preset}
                          className="flex items-center gap-2 cursor-pointer p-3 border"
                          style={{
                            borderColor: recurringPreset === preset ? '#779F8D' : '#E0E0E0',
                            backgroundColor: recurringPreset === preset ? '#F0F7F4' : '#FFFFFF',
                            borderRadius: '8px'
                          }}
                        >
                          <input
                            type="radio"
                            checked={recurringPreset === preset}
                            onChange={() => setRecurringPreset(preset)}
                            style={{ accentColor: '#779F8D' }}
                          />
                          <span style={{ color: '#2C3E50', fontSize: '14px', textTransform: 'capitalize' }}>
                            {preset === 'bi-weekly' ? 'Bi-weekly' : preset}
                          </span>
                        </label>
                      ))}
                    </div>

                    {renderRecurringPresetDetails()}
                  </div>
                )}

                {recurringPattern === 'manual' && (
                  <div className="p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>
                      You will pick exact dates from the calendar on the next step
                    </p>
                    <div style={{ color: '#779F8D', fontSize: '14px', fontWeight: 600 }}>
                      ✓ Manual date selection mode activated
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
                <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Single events keep things simple — we will collect scheduling details on the next step.
                </p>
              </div>
            )}

            <Button
              variant="primary"
              onClick={() => setStep('schedule')}
              className="w-full mt-6"
            >
              Continue to Schedule
            </Button>
          </div>
        )}

        {step === 'schedule' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              {eventType === 'single' ? 'Select Date & Time' : (recurringPattern === 'manual' ? 'Select Specific Dates' : 'Schedule Shifts')}
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
              {getScheduleStepDescription()}
            </p>

            {scheduleError && (
              <div
                style={{
                  backgroundColor: '#FFF5F5',
                  border: '1px solid #E57373',
                  color: '#E57373',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '24px'
                }}
              >
                {scheduleError}
              </div>
            )}

            {/* Single event scheduling */}
            {eventType === 'single' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Event Date</label>
                    <input
                      type="date"
                      value={singleDate}
                      onChange={(e) => setSingleDate(e.target.value)}
                      className="w-full px-4 py-3 border"
                      style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Start Time</label>
                    <input
                      type="time"
                      value={uniformStart}
                      onChange={(e) => setUniformStart(e.target.value)}
                      className="w-full px-4 py-3 border"
                      style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>End Time</label>
                    <input
                      type="time"
                      value={uniformEnd}
                      onChange={(e) => setUniformEnd(e.target.value)}
                      className="w-full px-4 py-3 border"
                      style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                    />
                  </div>
                </div>

                <div className="p-4 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                  <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Selected Shift</div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    {singleDate ? formatReadableDateWithYear(singleDate) : 'No date selected yet'} • {uniformStart} - {uniformEnd}
                  </div>
                  <p style={{ color: '#2C3E50', fontSize: '13px', marginTop: '8px' }}>
                    Single events use one date and a uniform time range—no calendar picking required.
                  </p>
                </div>

                <Button variant="primary" onClick={handleScheduleContinue} className="w-full">
                  Continue to Roster Setup
                </Button>
              </>
            )}

            {/* Manual multi-shift scheduling */}
            {eventType === 'recurring' && recurringPattern === 'manual' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6 mb-6">
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => adjustManualCalendarViewByMonths(-1)}
                          style={{
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            cursor: 'pointer'
                          }}
                          aria-label="View previous month"
                        >
                          <ChevronLeft size={18} style={{ color: '#2C3E50' }} />
                        </button>
                        <span style={{ color: '#2C3E50', fontWeight: 700 }}>{manualCalendarMonthLabel}</span>
                        <button
                          type="button"
                          onClick={() => adjustManualCalendarViewByMonths(1)}
                          style={{
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                            cursor: 'pointer'
                          }}
                          aria-label="View next month"
                        >
                          <ChevronRight size={18} style={{ color: '#2C3E50' }} />
                        </button>
                      </div>
                      <span style={{ color: '#2C3E50', fontSize: '14px' }}>
                        Selected {manualSelectedDates.length} date{manualSelectedDates.length === 1 ? '' : 's'}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                        gap: '8px',
                        textTransform: 'uppercase',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: '#9E9E9E',
                        marginBottom: '8px'
                      }}
                    >
                      {calendarDayLabels.map((label) => (
                        <span key={label} style={{ textAlign: 'center' }}>{label}</span>
                      ))}
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                        gap: '8px'
                      }}
                    >
                      {manualCalendarDays.map((day) => {
                        const isSelected = manualSelectedDatesSet.has(day.iso);
                        const backgroundColor = isSelected ? '#779F8D' : '#FFFFFF';
                        const textColor = isSelected ? '#FFFFFF' : (day.isCurrentMonth ? '#2C3E50' : '#9E9E9E');

                        return (
                          <button
                            key={day.iso}
                            type="button"
                            onClick={() => toggleManualDate(day.iso)}
                            style={{
                              borderRadius: '10px',
                              border: `1px solid ${isSelected ? '#779F8D' : '#E0E0E0'}`,
                              backgroundColor,
                              color: textColor,
                              fontWeight: isSelected ? 700 : 500,
                              opacity: day.isCurrentMonth ? 1 : 0.5,
                              cursor: 'pointer',
                              minHeight: '56px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {day.label}
                          </button>
                        );
                      })}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        flexWrap: 'wrap',
                        marginTop: '16px',
                        color: '#2C3E50',
                        fontSize: '13px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '14px', height: '14px', backgroundColor: '#779F8D', borderRadius: '4px', display: 'inline-block' }} />
                        Selected date
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '14px', height: '14px', backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid #E0E0E0', display: 'inline-block' }} />
                        Available date
                      </div>
                    </div>
                  </div>

                  <div className="p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
                    <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Selected Dates</div>
                    {manualSelectedDates.length === 0 ? (
                      <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
                        No dates added yet. Tap calendar days to build this custom roster.
                      </p>
                    ) : (
                      <ul style={{ color: '#2C3E50', fontSize: '14px', margin: 0, paddingLeft: '16px', maxHeight: '220px', overflowY: 'auto' }}>
                        {manualSelectedDates.slice(0, 8).map((date) => (
                          <li key={date} style={{ marginBottom: '4px' }}>
                            {formatReadableDateWithYear(date)} • {uniformStart} - {uniformEnd}
                          </li>
                        ))}
                        {manualSelectedDates.length > 8 && (
                          <li style={{ marginBottom: 0 }}>+{manualSelectedDates.length - 8} more</li>
                        )}
                      </ul>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setManualSelectedDates([]);
                        setScheduleError(null);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#779F8D',
                        fontWeight: 600,
                        fontSize: '13px',
                        marginTop: '12px',
                        cursor: manualSelectedDates.length ? 'pointer' : 'not-allowed',
                        opacity: manualSelectedDates.length ? 1 : 0.5
                      }}
                      disabled={manualSelectedDates.length === 0}
                    >
                      Clear selection
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Uniform Start Time</label>
                    <input
                      type="time"
                      value={uniformStart}
                      onChange={(e) => setUniformStart(e.target.value)}
                      className="w-full px-4 py-3 border"
                      style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                    />
                  </div>
                  <div>
                    <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Uniform End Time</label>
                    <input
                      type="time"
                      value={uniformEnd}
                      onChange={(e) => setUniformEnd(e.target.value)}
                      className="w-full px-4 py-3 border"
                      style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                    />
                  </div>
                </div>

                <Button variant="primary" onClick={handleScheduleContinue} className="w-full">
                  Continue to Roster Setup
                </Button>
              </>
            )}

            {eventType === 'recurring' && recurringPattern === 'recurring' && (
              <>
                {recurringPreset === 'daily' && (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Start Date</label>
                        <input
                          type="date"
                          value={selectedAnchorDate}
                          onChange={(e) => handleRecurringStartChange(e.target.value)}
                          className="w-full px-4 py-3 border"
                          style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Start Time</label>
                        <input
                          type="time"
                          value={uniformStart}
                          onChange={(e) => setUniformStart(e.target.value)}
                          className="w-full px-4 py-3 border"
                          style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>End Time</label>
                        <input
                          type="time"
                          value={uniformEnd}
                          onChange={(e) => setUniformEnd(e.target.value)}
                          className="w-full px-4 py-3 border"
                          style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                        />
                      </div>
                    </div>
                    <div className="p-4 mb-4" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                      <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Selected:</div>
                      <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                        {(formatReadableDateWithYear(selectedAnchorDate) || 'No date selected')} • {uniformStart} - {uniformEnd}
                      </div>
                    </div>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '24px' }}>
                      This mirrors the single-shift setup but repeats automatically every day after your selected start date.
                    </p>
                  </>
                )}

                {isYearlyMode && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="md:col-span-2">
                        <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Month</label>
                        <select
                          value={yearlyMonth}
                          onChange={(e) => handleYearlyMonthChange(e.target.value)}
                          className="w-full px-4 py-3 border"
                          style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                        >
                          {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Day</label>
                        <input
                          type="number"
                          min="1"
                          max="31"
                          value={yearlyDay}
                          onChange={(e) => handleYearlyDayChange(Math.min(31, Math.max(1, parseInt(e.target.value) || 1)))}
                          className="w-full px-4 py-3 border"
                          style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                        />
                      </div>
                    </div>
                    <div className="p-4 mb-4" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                      <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Annual anchor</div>
                      <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                        {(isCustomYearly ? `Repeats every ${customInterval === 1 ? 'year' : `${customInterval} years`}` : 'Repeats every year')} on {yearlyMonth} {yearlyDay} • {uniformStart} - {uniformEnd}
                      </div>
                    </div>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '24px' }}>
                      {isCustomYearly
                        ? 'Custom yearly patterns reuse this anchor; ImpactHub manages the multi-year cadence while keeping times consistent.'
                        : 'Adjust the month/day here. Uniform shift times use the fields below, so you only set them once.'}
                    </p>
                  </>
                )}

                {recurringPreset !== 'daily' && !isYearlyMode && (
                  <>
                    <div className="mb-6">
                      <div style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '4px' }}>Pick a start date on the calendar</div>
                      <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
                        Future recurring shifts appear in a lighter sage tint. Uniform times apply to every generated shift.
                      </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[2fr,1fr] mb-6">
                      <div>
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => adjustCalendarViewByMonths(-1)}
                              style={{
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#FFFFFF',
                                cursor: 'pointer'
                              }}
                              aria-label="View previous month"
                            >
                              <ChevronLeft size={18} style={{ color: '#2C3E50' }} />
                            </button>
                            <span style={{ color: '#2C3E50', fontWeight: 700 }}>{calendarMonthLabel}</span>
                            <button
                              type="button"
                              onClick={() => adjustCalendarViewByMonths(1)}
                              style={{
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#FFFFFF',
                                cursor: 'pointer'
                              }}
                              aria-label="View next month"
                            >
                              <ChevronRight size={18} style={{ color: '#2C3E50' }} />
                            </button>
                          </div>
                          <span style={{ color: '#2C3E50', fontSize: '14px' }}>Start date: {formatReadableDateWithYear(selectedAnchorDate) || 'No date selected'}</span>
                        </div>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                            gap: '8px',
                            textTransform: 'uppercase',
                            fontSize: '11px',
                            letterSpacing: '0.08em',
                            color: '#9E9E9E',
                            marginBottom: '8px'
                          }}
                        >
                          {calendarDayLabels.map((label) => (
                            <span key={label} style={{ textAlign: 'center' }}>{label}</span>
                          ))}
                        </div>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                            gap: '8px'
                          }}
                        >
                          {calendarDays.map((day) => {
                            const isSelected = day.iso === selectedAnchorDate;
                            const isFuture = highlightedRecurringDates.has(day.iso);
                            const backgroundColor = isSelected ? '#779F8D' : (isFuture ? '#E3F0EA' : '#FFFFFF');
                            const textColor = isSelected ? '#FFFFFF' : (day.isCurrentMonth ? '#2C3E50' : '#9E9E9E');

                            return (
                              <button
                                key={day.iso}
                                type="button"
                                onClick={() => handleRecurringStartChange(day.iso)}
                                style={{
                                  borderRadius: '10px',
                                  border: `1px solid ${isSelected ? '#779F8D' : '#E0E0E0'}`,
                                  backgroundColor,
                                  color: textColor,
                                  fontWeight: isSelected ? 700 : 500,
                                  opacity: day.isCurrentMonth ? 1 : 0.5,
                                  cursor: 'pointer',
                                  minHeight: '56px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {day.label}
                              </button>
                            );
                          })}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                            alignItems: 'center',
                            marginTop: '16px',
                            color: '#2C3E50',
                            fontSize: '13px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '14px', height: '14px', backgroundColor: '#779F8D', borderRadius: '4px', display: 'inline-block' }} />
                            Anchor date
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '14px', height: '14px', backgroundColor: '#E3F0EA', borderRadius: '4px', display: 'inline-block' }} />
                            Upcoming shift
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '14px', height: '14px', backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid #E0E0E0', display: 'inline-block' }} />
                            Other dates
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {recurringPreset !== 'daily' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Uniform Start Time</label>
                      <input type="time" value={uniformStart} onChange={(e) => setUniformStart(e.target.value)} className="w-full px-4 py-3 border" style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }} />
                    </div>
                    <div>
                      <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>Uniform End Time</label>
                      <input type="time" value={uniformEnd} onChange={(e) => setUniformEnd(e.target.value)} className="w-full px-4 py-3 border" style={{ borderColor: '#E0E0E0', borderRadius: '8px', color: '#2C3E50' }} />
                    </div>
                  </div>
                )}

                <div className="p-4 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
                  <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>
                    Selected Shift:
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                    {getRecurringSummaryLabel()}
                  </div>
                  <p style={{ color: '#2C3E50', fontSize: '13px', marginTop: '8px' }}>
                    {recurringPreset === 'daily'
                      ? 'This recurring shift mirrors your single-shift setup and repeats every day once published.'
                      : 'Uniform time ranges apply to every generated occurrence—no need to fill out each shift. Roles and headcount are captured on the next step.'}
                  </p>
                </div>

                <div className="p-4 mb-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px dashed #779F8D' }}>
                  <p style={{ color: '#2C3E50', fontSize: '13px', margin: 0 }}>
                    Need to adjust this cadence later? Open Manage Events anytime to update recurrence patterns, reschedule specific dates, or pause the series.
                  </p>
                </div>

                <Button variant="primary" onClick={handleScheduleContinue} className="w-full">
                  Continue to Roster Setup
                </Button>
              </>
            )}
          </div>
        )}

        {step === 'uniform-roster' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Uniform Roster Setup
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Define roles and volunteer requirements
            </p>

            <div className="space-y-6">
              <div>
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  Role Name
                </label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
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
                  Number of Volunteers Needed
                </label>
                <input
                  type="number"
                  value={roleCapacity}
                  min="1"
                  onChange={(e) => {
                    const nextValue = parseInt(e.target.value, 10);
                    setRoleCapacity(Number.isNaN(nextValue) ? 0 : Math.max(0, nextValue));
                  }}
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
                <label style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                  Required Skills
                </label>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2" style={{ borderRadius: '8px', border: '1px solid #E0E0E0' }}>
                  {SKILL_OPTIONS.map((skill) => {
                    const isSelected = requiredSkills.includes(skill);
                    const isHighRisk = highRiskSkillSet.has(skill);
                    const borderColor = isSelected ? '#779F8D' : '#E0E0E0';
                    const backgroundColor = isSelected ? '#F0F7F4' : '#FFFFFF';
                    return (
                      <label
                        key={skill}
                        className="flex items-center gap-3 p-3 border cursor-pointer"
                        style={{
                          borderColor,
                          backgroundColor,
                          borderRadius: '8px'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSkill(skill)}
                          style={{ accentColor: '#779F8D' }}
                        />
                        <div className="flex flex-col flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>{skill}</span>
                            </div>
                            {isHighRisk && (
                              <span style={safetyCheckPillStyle}>
                                <AlertTriangle size={14} style={{ color: '#2C3E50' }} />
                                Safety check
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <div
                  className="flex items-center gap-3 mt-6"
                  style={{
                    color: '#2C3E50',
                    fontSize: '12px',
                    backgroundColor: '#F5F7FA',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                >
                  <span style={safetyCheckPillStyle}>
                    <AlertTriangle size={14} style={{ color: '#2C3E50' }} />
                    Safety check
                  </span>
                  <div>ImpactHub vets every volunteer who selects this skill before they are confirmed.</div>
                </div>
                <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
                  Marked skills prompt automatic volunteer credential reviews—coordinators just set the requirements.
                </p>
              </div>

              {rosterError && (
                <div
                  style={{
                    backgroundColor: '#FFF5F5',
                    border: '1px solid #E57373',
                    color: '#E57373',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                >
                  {rosterError}
                </div>
              )}

              <Button variant="primary" onClick={handleRosterContinue} className="w-full mt-6">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'next-action' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Choose Your Next Step
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Publish immediately or let ImpactHub find best-fit volunteers first
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                onClick={() => setNextActionChoice('publish-now')}
                className="p-6 border-2 cursor-pointer transition-all"
                style={{
                  borderColor: nextActionChoice === 'publish-now' ? '#779F8D' : '#E0E0E0',
                  backgroundColor: nextActionChoice === 'publish-now' ? '#F0F7F4' : '#FFFFFF',
                  borderRadius: '12px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: `2px solid ${nextActionChoice === 'publish-now' ? '#779F8D' : '#E0E0E0'}`,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {nextActionChoice === 'publish-now' && <Check size={14} style={{ color: '#779F8D' }} />}
                </div>
                <CheckCircle2 size={32} style={{ color: '#2C3E50', marginBottom: '16px' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                  Publish Draft Now
                </h3>
                <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>
                  Share the event with your network immediately. You can invite specific volunteers later.
                </p>
                <span style={{ color: '#2C3E50', fontSize: '12px' }}>
                  Good for events that already have confirmed rosters.
                </span>
              </div>

              <div
                onClick={() => setNextActionChoice('smart-match')}
                className="p-6 border-2 cursor-pointer transition-all"
                style={{
                  borderColor: nextActionChoice === 'smart-match' ? '#779F8D' : '#E0E0E0',
                  backgroundColor: nextActionChoice === 'smart-match' ? '#F0F7F4' : '#FFFFFF',
                  borderRadius: '12px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: `2px solid ${nextActionChoice === 'smart-match' ? '#779F8D' : '#E0E0E0'}`,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {nextActionChoice === 'smart-match' && <Check size={14} style={{ color: '#779F8D' }} />}
                </div>
                <Users size={32} style={{ color: '#779F8D', marginBottom: '16px' }} />
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  backgroundColor: '#FFFFFF',
                  color: '#779F8D',
                  fontWeight: 600,
                  fontSize: '12px',
                  marginBottom: '12px'
                }}>
                  Recommended
                </div>
                <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                  Find Matching Volunteers
                </h3>
                <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>
                  Run a smart recruitment scan to invite the highest-fit volunteers before publishing.
                </p>
                <span style={{ color: '#2C3E50', fontSize: '12px' }}>
                  Helps boost attendance and reduces manual outreach.
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={handleNextActionContinue}
                className="w-full"
              >
                {nextActionChoice === 'publish-now' ? 'Skip smart recruitment and publish' : 'Run smart matching'}
              </Button>
              <Button variant="secondary" onClick={() => setStep('uniform-roster')} className="w-full">
                Back to Roster
              </Button>
            </div>
          </div>
        )}

        {step === 'matches' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Smart Recruitment Scan
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '24px' }}>
              {highConfidenceMatches.length > 0
                ? 'We surfaced volunteers who meet every requirement for this shift.'
                : 'Whoops—no high-confidence matches met every filter. Here is what the talent pool still offers.'}
            </p>

            {highConfidenceMatches.length > 0 ? (
              <div className="p-6 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '2px solid #779F8D' }}>
                <div className="text-center mb-6">
                  <div style={{ color: '#2C3E50', fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
                    {highConfidenceCount}
                  </div>
                  <div style={{ color: '#2C3E50', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
                    high-confidence {highConfidenceLabel} found
                  </div>
                  <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
                    Every volunteer satisfies skill, interest, and availability requirements for {primarySlotLabel}.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                    <Target size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
                    <div style={{ color: '#2C3E50', fontWeight: 600 }}>Skills verified</div>
                    <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
                      Coordinators can assign roles knowing required abilities are covered.
                    </p>
                  </div>

                  <div className="p-4 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                    <Users size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
                    <div style={{ color: '#2C3E50', fontWeight: 600 }}>Interest aligned</div>
                    <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
                      Everyone carries the "{EVENT_INTEREST_TAG}" tag for mission fit.
                    </p>
                  </div>

                  <div className="p-4 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                    <Clock size={24} style={{ color: '#779F8D', margin: '0 auto 8px' }} />
                    <div style={{ color: '#2C3E50', fontWeight: 600 }}>Availability locked</div>
                    <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
                      Shift commitments already match {primarySlotLabel}.
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div className="p-6" style={{ backgroundColor: '#FFF4E1', borderRadius: '8px', border: '2px solid #FFB74D' }}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={36} style={{ color: '#FFB74D' }} />
                    <div>
                      <h2 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                        Whoops—no high-confidence matches yet
                      </h2>
                      <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: 0 }}>
                        ImpactHub couldn't find volunteers that meet every filter, but these alternative insights show where we still have traction.
                      </p>
                    </div>
                  </div>
                </div>

                {mediumConfidenceCount > 0 ? (
                  <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
                    <div style={{ color: '#2C3E50', fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
                      {mediumConfidenceCount}
                    </div>
                    <div style={{ color: '#2C3E50', fontSize: '18px', fontWeight: 600, margin: '4px 0 12px' }}>
                      medium-confidence {mediumConfidenceLabel} surfaced
                    </div>
                    <p style={{ color: '#2C3E50', fontSize: '14px', marginBottom: '12px' }}>
                      ImpactHub prioritizes volunteers who already pass every skill requirement and carry the "{EVENT_INTEREST_TAG}" interest tag—these candidates only need schedule confirmation for {primarySlotLabel}.
                    </p>
                    <p style={{ color: '#2C3E50', fontSize: '13px', margin: 0 }}>
                      Invite this cohort to validate availability, then promote broadly if more coverage is needed.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
                    <div style={{ color: '#2C3E50', fontWeight: 600 }}>No medium-confidence matches yet</div>
                    <p style={{ color: '#2C3E50', fontSize: '12px', marginTop: '8px' }}>
                      Adjust skill or schedule filters to expand ImpactHub’s recommendations.
                    </p>
                  </div>
                )}
              </div>
            )}

            {highConfidenceMatches.length > 0 && (
              <div className="p-4 mb-6" style={{ backgroundColor: '#F5F7FA', borderRadius: '8px' }}>
                <h3 style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '12px' }}>
                  Top Matches Include:
                </h3>
                <ul className="space-y-2">
                  <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                    • Required skills and certifications already validated.
                  </li>
                  <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                    • Mission alignment via the "{EVENT_INTEREST_TAG}" interest tag.
                  </li>
                  <li style={{ color: '#2C3E50', fontSize: '14px' }}>
                    • Confirmed availability for {primarySlotLabel}.
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Button variant="primary" onClick={() => setStep('publish')} className="w-full">
                {highConfidenceMatches.length > 0 ? 'Continue to Publish' : 'Send Alternative Invites'}
              </Button>
              <Button variant="secondary" onClick={() => setStep('next-action')} className="w-full">
                Back to Recruit Step
              </Button>
            </div>
          </div>
        )}

        {step === 'publish' && (
          <div className="p-8" style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '8px' }}>
              Publish Event
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              Choose how you want to publish and promote this event
            </p>

            <div className="space-y-4 mb-8">
              <div
                className="p-6 border-2 cursor-pointer"
                style={{
                  borderColor: publishMode === 'direct-invites' ? '#779F8D' : '#E0E0E0',
                  backgroundColor: publishMode === 'direct-invites' ? '#F0F7F4' : '#FFFFFF',
                  borderRadius: '8px'
                }}
                onClick={() => setPublishMode('direct-invites')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                    Publish & Send Direct Invites
                  </h3>
                  <input
                    type="radio"
                    checked={publishMode === 'direct-invites'}
                    onChange={() => setPublishMode('direct-invites')}
                    style={{ accentColor: '#779F8D' }}
                  />
                </div>
                <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Event will be published publicly and direct invitations will be sent to the high-confidence matches
                </p>
              </div>

              <div
                className="p-6 border cursor-pointer"
                style={{
                  borderColor: publishMode === 'public-only' ? '#779F8D' : '#E0E0E0',
                  backgroundColor: publishMode === 'public-only' ? '#F0F7F4' : '#FFFFFF',
                  borderRadius: '8px'
                }}
                onClick={() => setPublishMode('public-only')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '18px' }}>
                    Publish Publicly Only
                  </h3>
                  <input
                    type="radio"
                    checked={publishMode === 'public-only'}
                    onChange={() => setPublishMode('public-only')}
                    style={{ accentColor: '#779F8D' }}
                  />
                </div>
                <p style={{ color: '#2C3E50', fontSize: '14px' }}>
                  Event will be published to all volunteers without targeted invitations
                </p>
              </div>
            </div>

            <div className="p-6 mb-6" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px' }}>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={24} style={{ color: '#779F8D' }} />
                <h3 style={{ color: '#2C3E50', fontWeight: 700 }}>
                  Event Summary
                </h3>
              </div>
              <div className="space-y-2">
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Title:</strong> {eventTitle.trim() || 'Untitled Event'}
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Cadence:</strong>{' '}
                  <span style={{ whiteSpace: 'pre-line' }}>{getCadenceSummaryForPublish()}</span>
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Role:</strong> {getRoleSummary()}
                </div>
                <div style={{ color: '#2C3E50', fontSize: '14px' }}>
                  <strong>Matched Volunteers:</strong> {matchedVolunteersSummary}
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                setConfirmationContext(publishMode === 'direct-invites' ? 'publish-with-invites' : 'publish-now');
                setStep('confirmation');
              }}
            >
              {publishMode === 'direct-invites' ? 'Publish & Send Invites' : 'Publish Event Publicly'}
            </Button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="p-8 text-center" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
            <div
              className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#779F8D', borderRadius: '50%' }}
            >
              <CheckCircle2 size={48} color="#FFFFFF" />
            </div>
            <h1 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '32px', marginBottom: '12px' }}>
              {confirmationContext === 'publish-now'
                ? 'Event Published'
                : 'Invites Sent & Event Published'}
            </h1>
            <p style={{ color: '#2C3E50', marginBottom: '32px' }}>
              {confirmationContext === 'publish-now'
                ? 'Volunteers can now discover and join this opportunity.'
                : 'Smart invites are on their way to your matched volunteers, and the opportunity is now live.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Title', value: eventTitle.trim() || 'Untitled Event' },
                { label: 'Cadence', value: getCadenceSummaryForPublish() },
                { label: 'Role', value: getRoleSummary() }
              ].map((item) => (
                <div key={item.label} className="p-4 text-left" style={{ backgroundColor: '#F5F7FA', borderRadius: '10px' }}>
                  <div style={{ color: '#2C3E50', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      color: '#2C3E50',
                      fontWeight: 600,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  if (onBackToManager) onBackToManager();
                  else setStep('title-description');
                }}
              >
                Return to Event Manager
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setConfirmationContext(null);
                  setStep('title-description');
                }}
              >
                Create Another Event
              </Button>
            </div>
          </div>
        )}

        {renderCancelHelper()}
      </div>
      {/* Discard confirmation modal */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 }}>
          <div className="p-6" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: '480px' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} style={{ color: '#E57373' }} />
              <h3 style={{ color: '#2C3E50', fontWeight: 700 }}>Discard Event Draft?</h3>
            </div>
            <p style={{ color: '#2C3E50', marginBottom: '16px' }}>
              This will discard your current inputs. You will have an option to undo this action.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowDiscardConfirm(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmDiscard}
                className="flex-1"
              >
                Discard Draft
              </Button>
            </div>
          </div>
        </div>
      )}
      {showUndoBanner && (
        <div
          className="fixed bottom-6 right-6 flex items-center gap-4"
          style={{ backgroundColor: '#2C3E50', color: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(44,62,80,0.25)' }}
        >
          <span>Event draft discarded.</span>
          <button
            onClick={handleUndoDiscard}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              color: '#81C784',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
