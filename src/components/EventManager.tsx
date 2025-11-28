import { useState } from 'react';
import {
  Clock,
  Users,
  MapPin,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  Repeat,
  ListChecks
} from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { CreateEventFlow } from './CreateEventFlow';

const WEEK_ANCHOR = '2025-11-24';

const parseDateKey = (value: string) => new Date(`${value}T00:00:00`);

interface Shift {
  id: number;
  eventName: string;
  date: string;
  time: string;
  location: string;
  volunteers: number;
  capacity: number;
  status: 'confirmed' | 'pending' | 'full';
  recurrence: 'Weekly' | 'Bi-weekly' | 'Monthly' | 'One-time';
  seriesId: string;
}

export function EventManager() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(WEEK_ANCHOR);
  const [mode, setMode] = useState<'manage' | 'create'>('manage');
  const [undoVisible, setUndoVisible] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [managementNote, setManagementNote] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'workweek' | 'fullweek'>('workweek');

  const startHour = 8;
  const endHour = 18;
  const rowHeight = 64;
  const hourMarks = Array.from({ length: endHour - startHour + 1 }, (_, idx) => startHour + idx);
  const calendarHeight = (endHour - startHour) * rowHeight;

  const shifts: Shift[] = [
    {
      id: 1,
      eventName: 'Weekend Food Bank',
      date: '2025-11-24',
      time: '09:00 AM - 1:00 PM',
      location: 'Community Center',
      volunteers: 8,
      capacity: 12,
      status: 'confirmed',
      recurrence: 'Weekly',
      seriesId: 'FB-SAT-AM'
    },
    {
      id: 2,
      eventName: 'Park Cleanup',
      date: '2025-11-24',
      time: '2:00 PM - 5:00 PM',
      location: 'Central Park',
      volunteers: 15,
      capacity: 15,
      status: 'full',
      recurrence: 'Bi-weekly',
      seriesId: 'PC-BI-SAT'
    },
    {
      id: 3,
      eventName: 'Meals on Wheels',
      date: '2025-11-25',
      time: '10:00 AM - 2:00 PM',
      location: 'Senior Center',
      volunteers: 4,
      capacity: 6,
      status: 'confirmed',
      recurrence: 'Weekly',
      seriesId: 'MOW-SUN'
    },
    {
      id: 4,
      eventName: 'After School Tutoring',
      date: '2025-11-26',
      time: '3:00 PM - 5:00 PM',
      location: 'Lincoln Elementary',
      volunteers: 6,
      capacity: 10,
      status: 'confirmed',
      recurrence: 'Weekly',
      seriesId: 'AST-MON'
    },
    {
      id: 5,
      eventName: 'Safety Officer',
      date: '2025-11-27',
      time: '8:00 AM - 12:00 PM',
      location: 'Various',
      volunteers: 2,
      capacity: 5,
      status: 'confirmed',
      recurrence: 'One-time',
      seriesId: 'SO-ADHOC'
    },
    {
      id: 6,
      eventName: 'Community Garden',
      date: '2025-11-28',
      time: '9:00 AM - 1:00 PM',
      location: 'Community Garden',
      volunteers: 12,
      capacity: 15,
      status: 'confirmed',
      recurrence: 'Monthly',
      seriesId: 'CG-MONTHLY'
    },
    {
      id: 7,
      eventName: 'Animal Shelter',
      date: '2025-11-29',
      time: '10:00 AM - 3:00 PM',
      location: 'Happy Paws Shelter',
      volunteers: 7,
      capacity: 8,
      status: 'confirmed',
      recurrence: 'Weekly',
      seriesId: 'AS-THU'
    }
  ];

  const rosterLookups: Record<number, string[]> = {
    1: ['Priya Desai', 'Marco Silva', 'Daniel Ortiz', 'Lena Holmes'],
    2: ['Chris Allen', 'Amanda Lee', 'Jordan Brooks'],
    3: ['Luis Ramirez', 'Anita Flores', 'Selena Wong'],
    4: ['Harper Quinn', 'Owen Diaz', 'Sara Malik'],
    5: ['Security Pool'],
    6: ['Gardening Crew A', 'Gardening Crew B'],
    7: ['Animal Care Team']
  };

  const getWeekDates = () => {
    const baseWeek = parseDateKey(WEEK_ANCHOR);
    const startOfWeek = new Date(baseWeek);
    const dayOfWeek = startOfWeek.getDay();
    const offsetToMonday = (dayOfWeek + 6) % 7;
    startOfWeek.setDate(startOfWeek.getDate() - offsetToMonday);

    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseTimeString = (timeRange: string) => {
    const [startStr, endStr] = timeRange.split(' - ');
    const toMinutes = (value: string) => {
      const [time, period] = value.trim().split(' ');
      const [rawHour, rawMinute] = time.split(':').map(Number);
      let hour = rawHour;
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      return hour * 60 + (rawMinute || 0);
    };
    return { start: toMinutes(startStr), end: toMinutes(endStr) };
  };

  const computeEventPosition = (timeRange: string) => {
    const { start, end } = parseTimeString(timeRange);
    const clampedStart = Math.max(start, startHour * 60);
    const clampedEnd = Math.max(clampedStart + 15, Math.min(end, endHour * 60));
    const top = ((clampedStart - startHour * 60) / 60) * rowHeight;
    const height = ((clampedEnd - clampedStart) / 60) * rowHeight;
    return { top, height };
  };

  const formatHourLabel = (hour: number) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const converted = ((hour + 11) % 12) + 1;
    return `${converted} ${suffix}`;
  };

  const statusBackgrounds: Record<Shift['status'], string> = {
    confirmed: '#E5F4EA',
    pending: '#FFF4E5',
    full: '#E8ECF3'
  };

  const statusBorders: Record<Shift['status'], string> = {
    confirmed: '#81C784',
    pending: '#FFB74D',
    full: '#2C3E50'
  };

  const getShiftsForDate = (date: string) => shifts.filter((shift) => shift.date === date);

  const getStatusColor = (status: Shift['status']) => {
    switch (status) {
      case 'confirmed':
        return '#81C784';
      case 'pending':
        return '#FFB74D';
      case 'full':
        return '#2C3E50';
      default:
        return '#E0E0E0';
    }
  };

  const weekDates = getWeekDates();
  const displayedDates = viewMode === 'workweek' ? weekDates.slice(0, 5) : weekDates;
  const isFullWeek = viewMode === 'fullweek';
  const timelineBadgeSize = isFullWeek ? 'small' : 'medium';
  const timelineCardPadding = isFullWeek ? '10px' : '12px';
  const timelineCardGap = isFullWeek ? '6px' : '8px';
  const timelineTitleSize = isFullWeek ? '13px' : '14px';
  const timelineMetaFont = isFullWeek ? '11px' : '12px';
  const weekRangeLabel = `${weekDates[0].toLocaleString('en-US', { month: 'long', day: 'numeric' })} – ${weekDates[weekDates.length - 1].toLocaleString('en-US', { day: 'numeric' })}`;

  const selectedShift = selectedShiftId ? shifts.find((shift) => shift.id === selectedShiftId) : null;

  const handleShiftSelect = (shift: Shift, dateValue: string) => {
    setSelectedDate(dateValue);
    setSelectedShiftId(shift.id);
    setDeleteTarget(null);
    setManagementNote(null);
  };

  const handleDiscardedEvent = () => {
    setMode('manage');
    setUndoVisible(true);
    setSelectedShiftId(null);
    setDeleteTarget(null);
  };

  const handleUndoRestore = () => {
    setUndoVisible(false);
    setMode('create');
  };

  const handleRecurrenceUpdate = (pattern: Shift['recurrence']) => {
    if (!selectedShift) return;
    setManagementNote(`${selectedShift.eventName} recurrence updated to ${pattern}.`);
  };

  const handleReschedulePreview = () => {
    if (!selectedShift) return;
    setManagementNote(`${selectedShift.eventName} reschedule drafted for coordinator review.`);
  };

  const handleDeleteVariant = (option: string, shift: Shift) => {
    setManagementNote(`${option} selected for ${shift.eventName} (${shift.seriesId}).`);
    setDeleteTarget(null);
  };

  const deleteOptions = ['This event', 'This and following events', 'All events'];
  const recurrenceOptions: Shift['recurrence'][] = ['Weekly', 'Bi-weekly', 'Monthly', 'One-time'];

  if (mode === 'create') {
    return (
      <div className="p-8">
        <div className="max-w-[1440px] mx-auto">
          <CreateEventFlow
            onBackToManager={() => setMode('manage')}
            onDiscarded={handleDiscardedEvent}
          />
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
              Manage Events
            </h1>
            <p style={{ color: '#2C3E50', fontSize: '16px', opacity: 0.8 }}>
              Manage events, volunteer shifts and assignments
            </p>
          </div>
          <Button variant="primary" onClick={() => setMode('create')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={16} />
              <span>Create New Event</span>
            </div>
          </Button>
        </div>

        {undoVisible && (
          <div className="mb-6 p-4" style={{ backgroundColor: '#F0F7F4', border: '1px solid #779F8D', borderRadius: '12px' }}>
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundImage: 'conic-gradient(#779F8D 300deg, #E0E0E0 0deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ color: '#2C3E50', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Draft discarded</div>
                <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
                  Successfully discarded! Didn't mean to discard? Click the undo button.
                </p>
              </div>
              <Button variant="secondary" onClick={handleUndoRestore}>
                Undo discard
              </Button>
            </div>
          </div>
        )}

        <div>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 25px 50px rgba(44,62,80,0.08)'
            }}
          >
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <p style={{ color: '#2C3E50', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>{weekRangeLabel}</p>
                <span style={{ color: '#2C3E50', opacity: 0.65 }}>Work week timeline</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentWeek(currentWeek - 1)}
                  style={{
                    border: '1px solid #E0E0E0',
                    borderRadius: '12px',
                    padding: '8px',
                    backgroundColor: '#F5F7FA',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronLeft size={18} color="#2C3E50" />
                </button>
                <button
                  onClick={() => setCurrentWeek(currentWeek + 1)}
                  style={{
                    border: '1px solid #E0E0E0',
                    borderRadius: '12px',
                    padding: '8px',
                    backgroundColor: '#F5F7FA',
                    cursor: 'pointer'
                  }}
                >
                  <ChevronRight size={18} color="#2C3E50" />
                </button>
                <button
                  onClick={() => {
                    setCurrentWeek(0);
                    setSelectedDate(WEEK_ANCHOR);
                  }}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '8px 16px',
                    backgroundColor: '#779F8D',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Today
                </button>
              </div>
              <div className="flex items-center gap-2" style={{ backgroundColor: '#F5F7FA', borderRadius: '999px', padding: '4px' }}>
                <button
                  onClick={() => setViewMode('workweek')}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '6px 14px',
                    backgroundColor: viewMode === 'workweek' ? '#ffffff' : 'transparent',
                    fontWeight: 600,
                    color: '#2C3E50',
                    cursor: 'pointer'
                  }}
                >
                  Work Week
                </button>
                <button
                  onClick={() => setViewMode('fullweek')}
                  style={{
                    border: 'none',
                    borderRadius: '999px',
                    padding: '6px 14px',
                    backgroundColor: viewMode === 'fullweek' ? '#ffffff' : 'transparent',
                    fontWeight: 600,
                    color: '#2C3E50',
                    cursor: 'pointer'
                  }}
                >
                  Full Week
                </button>
              </div>
            </div>

            <div className="mt-6" style={{ overflowX: 'auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `80px repeat(${displayedDates.length}, minmax(160px, 1fr))`,
                  gap: '12px'
                }}
              >
                <div style={{ paddingTop: '56px' }}>
                  {hourMarks.map((hour, idx) => (
                    <div key={hour} style={{ height: `${rowHeight}px`, color: '#2C3E50', fontSize: '12px', display: 'flex', alignItems: 'flex-start' }}>
                      {idx < hourMarks.length - 1 && <span>{formatHourLabel(hour)}</span>}
                    </div>
                  ))}
                </div>

                {displayedDates.map((date) => {
                  const dateKey = formatDate(date);
                  const dayShifts = getShiftsForDate(dateKey);
                  const isActiveDay = selectedDate === dateKey;
                  return (
                    <div key={dateKey} style={{ paddingTop: '8px' }}>
                      <button
                        onClick={() => setSelectedDate(dateKey)}
                        style={{
                          width: '100%',
                          borderRadius: '16px',
                          border: 'none',
                          backgroundColor: isActiveDay ? '#F0F7F4' : '#F5F7FA',
                          padding: '12px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600 }}>
                          {date.toLocaleDateString('en-US', { weekday: 'long' })}
                        </span>
                        <span style={{ color: '#2C3E50', fontSize: '22px', fontWeight: 700 }}>
                          {date.toLocaleDateString('en-US', { day: 'numeric' })}
                        </span>
                      </button>
                      <div style={{ position: 'relative', height: `${calendarHeight}px`, marginTop: '12px', backgroundColor: '#FBFBFD', borderRadius: '16px', border: '1px solid #EEF1F5' }}>
                        {hourMarks.slice(0, -1).map((hour, idx) => (
                          <div
                            key={`${dateKey}-line-${hour}`}
                            style={{
                              position: 'absolute',
                              top: `${idx * rowHeight}px`,
                              left: '12px',
                              right: '12px',
                              borderTop: '1px solid #E0E0E0',
                              opacity: 0.4
                            }}
                          />
                        ))}
                        {dayShifts.map((shift) => {
                          const { top, height } = computeEventPosition(shift.time);
                          const badgeVariant = shift.status === 'full' ? 'full' : 'success';
                          const badgeLabel = shift.status === 'full' ? 'Full' : 'Confirmed';
                          return (
                            <div
                              key={shift.id}
                              onClick={() => handleShiftSelect(shift, dateKey)}
                              style={{
                                position: 'absolute',
                                left: '16px',
                                right: '16px',
                                top: `${top}px`,
                                height: `${height}px`,
                                borderRadius: '18px',
                                padding: timelineCardPadding,
                                backgroundColor: statusBackgrounds[shift.status],
                                border: selectedShiftId === shift.id ? '2px solid #779F8D' : `1px solid ${statusBorders[shift.status]}`,
                                boxShadow: '0 12px 24px rgba(44,62,80,0.12)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: timelineCardGap,
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{ color: '#2C3E50', fontWeight: 700, fontSize: timelineTitleSize }}>{shift.eventName}</div>
                              <div className="flex items-center gap-2" style={{ fontSize: timelineMetaFont, color: '#2C3E50' }}>
                                <Clock size={14} color="#779F8D" />
                                {shift.time}
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: isFullWeek ? 'column' : 'row',
                                  alignItems: isFullWeek ? 'flex-start' : 'center',
                                  justifyContent: isFullWeek ? 'flex-start' : 'space-between',
                                  gap: isFullWeek ? '6px' : '0px'
                                }}
                              >
                                <div className="flex items-center gap-2" style={{ color: '#2C3E50', fontSize: timelineMetaFont }}>
                                  <Users size={14} color="#779F8D" />
                                  {shift.volunteers}/{shift.capacity}
                                </div>
                                <div style={{ alignSelf: isFullWeek ? 'flex-start' : 'auto' }}>
                                  <Badge variant={badgeVariant} size={timelineBadgeSize}>
                                    {badgeLabel}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="mt-8 p-8" style={{ backgroundColor: '#ffffff', borderRadius: '12px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '24px' }}>
                Shifts for {parseDateKey(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              {selectedShift && (
                <span style={{ color: '#2C3E50', fontSize: '14px', fontWeight: 600 }}>
                  Series ID: {selectedShift.seriesId}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {getShiftsForDate(selectedDate).map((shift) => {
                const isActiveCard = selectedShiftId === shift.id;
                const badgeVariant = shift.status === 'full' ? 'full' : 'success';
                const badgeLabel = shift.status === 'full' ? 'Full' : 'Confirmed';
                return (
                  <div
                    key={shift.id}
                    className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                    style={{
                      backgroundColor: isActiveCard ? '#FFFFFF' : '#F5F7FA',
                      borderRadius: '12px',
                      border: `1px solid ${isActiveCard ? '#779F8D' : getStatusColor(shift.status)}`,
                      boxShadow: isActiveCard ? '0 12px 32px rgba(44,62,80,0.12)' : 'none',
                      minHeight: '240px'
                    }}
                    onClick={() => handleShiftSelect(shift, selectedDate)}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 style={{ color: '#2C3E50', fontWeight: 700, fontSize: '16px' }}>{shift.eventName}</h4>
                        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock size={14} color="#779F8D" />
                          <span style={{ color: '#2C3E50', fontSize: '12px' }}>{shift.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} color="#779F8D" />
                          <span style={{ color: '#2C3E50', fontSize: '12px' }}>{shift.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={14} color="#779F8D" />
                          <span style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600 }}>{shift.volunteers}/{shift.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Repeat size={14} color="#779F8D" />
                          <span style={{ color: '#2C3E50', fontSize: '12px' }}>{shift.recurrence}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="secondary" onClick={() => { setManagementNote(`${shift.eventName} opened in Create Event Flow for edits.`); setMode('create'); }}>
                        <Edit size={14} />
                        Edit
                      </Button>
                      <Button variant="secondary" onClick={() => { setSelectedShiftId(shift.id); setManagementNote(`${shift.eventName} roster surfaced below.`); }}>
                        <ListChecks size={14} />
                        View roster
                      </Button>
                      <Button variant="secondary" onClick={() => { setSelectedShiftId(shift.id); setDeleteTarget(shift.id); }}>
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                    {deleteTarget === shift.id && (
                      <div className="mt-3 p-3" style={{ backgroundColor: '#FFF4E1', borderRadius: '10px', border: '1px solid #FFB74D' }}>
                        <div style={{ color: '#2C3E50', fontWeight: 600, marginBottom: '8px' }}>Delete recurring event</div>
                        <div className="space-y-2">
                          {deleteOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleDeleteVariant(option, shift)}
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                border: 'none',
                                borderRadius: '999px',
                                padding: '8px 12px',
                                backgroundColor: '#FFFFFF',
                                color: '#2C3E50',
                                cursor: 'pointer'
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedShift ? (
              <>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '28px' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Repeat size={18} style={{ color: '#2C3E50' }} />
                      <span style={{ color: '#2C3E50', fontWeight: 700 }}>Recurrence pattern</span>
                    </div>
                    <p style={{ color: '#2C3E50', fontSize: '13px', marginBottom: '12px' }}>
                      Currently {selectedShift.recurrence}. Update cadence to keep logistics accurate.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recurrenceOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleRecurrenceUpdate(option)}
                          style={{
                            border: option === selectedShift.recurrence ? '2px solid #779F8D' : '1px solid #E0E0E0',
                            backgroundColor: option === selectedShift.recurrence ? '#F0F7F4' : '#FFFFFF',
                            borderRadius: '999px',
                            padding: '8px 14px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            color: '#2C3E50'
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '28px' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarClock size={18} style={{ color: '#2C3E50' }} />
                      <span style={{ color: '#2C3E50', fontWeight: 700 }}>Reschedule shift</span>
                    </div>
                    <label style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>New date</label>
                    <input
                      type="date"
                      defaultValue={selectedShift.date}
                      className="w-full px-3 py-2 mb-3"
                      style={{ border: '1px solid #E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                    />
                    <label style={{ color: '#2C3E50', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Shift window</label>
                    <input
                      type="text"
                      defaultValue={selectedShift.time}
                      className="w-full px-3 py-2 mb-4"
                      style={{ border: '1px solid #E0E0E0', borderRadius: '8px', color: '#2C3E50' }}
                    />
                    <Button variant="secondary" onClick={handleReschedulePreview} className="w-full">
                      Preview reschedule
                    </Button>
                  </div>
                </div>

                <div className="mt-6" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', padding: '28px' }}>
                  <h4 style={{ color: '#2C3E50', fontWeight: 700, marginBottom: '8px' }}>Roster snapshot</h4>
                  <p style={{ color: '#2C3E50', fontSize: '13px', marginBottom: '8px' }}>
                    Volunteers already committed to this shift.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(rosterLookups[selectedShift.id] || ['Roster synced from Volunteer Database']).map((name) => (
                      <span
                        key={name}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '999px',
                          padding: '6px 12px',
                          border: '1px solid #E0E0E0',
                          color: '#2C3E50',
                          fontSize: '12px'
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-6 p-4" style={{ backgroundColor: '#F5F7FA', borderRadius: '12px', border: '1px dashed #E0E0E0' }}>
                <p style={{ color: '#2C3E50', fontSize: '14px', margin: 0 }}>
                  Select a shift above to adjust recurrence, reschedule times, or review roster assignments.
                </p>
              </div>
            )}

            {managementNote && (
              <div className="mt-6 p-4" style={{ backgroundColor: '#F0F7F4', borderRadius: '8px', border: '1px solid #779F8D' }}>
                <strong style={{ color: '#2C3E50' }}>Update logged:</strong>{' '}
                <span style={{ color: '#2C3E50' }}>{managementNote}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
