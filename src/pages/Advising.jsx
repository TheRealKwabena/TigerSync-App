import { useState, useEffect } from 'react'
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  FileText,
  ExternalLink,
  BookOpen,
  ChevronDown,
  Plus,
  X,
  AlertTriangle,
  Sparkles,
  GraduationCap,
  Users,
  Star,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { cn } from '../lib/utils'

/* ─────────────────────────────────────────────
   Student context (drives recommendations)
   ───────────────────────────────────────────── */
const STUDENT = {
  name: 'Jordan',
  major: 'Computer Science',
  gpa: 3.67,
  credits: 72,
  totalRequired: 120,
  year: 'Junior',
  completedCodes: [
    'CS101','CS201','CS210','CS225','CS310',
    'MATH151','MATH251','ENGL101','PHYS201',
  ],
}

/* ─────────────────────────────────────────────
   Course catalogue for Fall 2026
   Each course has non-overlapping time blocks
   ───────────────────────────────────────────── */
const COURSES = [
  /* ── Required ─────────────────────────────── */
  {
    code: 'CS 401',
    name: 'Advanced Algorithms',
    credits: 3,
    days: ['Mon','Wed','Fri'],
    startTime: '09:00',
    endTime: '09:50',
    displayTime: 'MWF 9:00 – 9:50 AM',
    professor: 'Dr. Alan Marcus',
    seats: 18,
    category: 'Required',
    gpaReq: 3.0,
    prereqs: ['CS310'],
    reason: 'Core requirement — prerequisites met (CS 310)',
    stars: 4.8,
    enrolled: 22,
    cap: 40,
  },
  {
    code: 'CS 415',
    name: 'Machine Learning',
    credits: 3,
    days: ['Mon','Wed','Fri'],
    startTime: '11:00',
    endTime: '11:50',
    displayTime: 'MWF 11:00 – 11:50 AM',
    professor: 'Dr. Priya Nair',
    seats: 7,
    category: 'Required',
    gpaReq: 3.0,
    prereqs: ['MATH251','CS310'],
    reason: 'Required for CS — aligns with your 3.67 GPA track',
    stars: 4.9,
    enrolled: 33,
    cap: 40,
  },
  {
    code: 'CS 450',
    name: 'Software Engineering',
    credits: 3,
    days: ['Tue','Thu'],
    startTime: '15:00',
    endTime: '16:15',
    displayTime: 'TTh 3:00 – 4:15 PM',
    professor: 'Dr. Kevin Osei',
    seats: 14,
    category: 'Required',
    gpaReq: 2.8,
    prereqs: ['CS225'],
    reason: 'Required capstone prep — fits your graduation plan',
    stars: 4.7,
    enrolled: 26,
    cap: 40,
  },
  {
    code: 'MATH 301',
    name: 'Linear Algebra',
    credits: 3,
    days: ['Mon','Wed','Fri'],
    startTime: '14:00',
    endTime: '14:50',
    displayTime: 'MWF 2:00 – 2:50 PM',
    professor: 'Dr. Sofia Rivera',
    seats: 21,
    category: 'Required',
    gpaReq: 3.0,
    prereqs: ['MATH251'],
    reason: 'Math requirement — ready to enroll (MATH 251 complete)',
    stars: 4.5,
    enrolled: 19,
    cap: 40,
  },
  /* ── Electives ─────────────────────────────── */
  {
    code: 'CS 420',
    name: 'Operating Systems',
    credits: 3,
    days: ['Tue','Thu'],
    startTime: '10:00',
    endTime: '11:15',
    displayTime: 'TTh 10:00 – 11:15 AM',
    professor: 'Dr. James Carter',
    seats: 11,
    category: 'Elective',
    gpaReq: 2.5,
    prereqs: ['CS210'],
    reason: 'High-value elective for systems track — 3.67 GPA qualifies',
    stars: 4.6,
    enrolled: 29,
    cap: 40,
  },
  {
    code: 'CS 460',
    name: 'Cloud Computing & DevOps',
    credits: 3,
    days: ['Tue','Thu'],
    startTime: '13:00',
    endTime: '14:15',
    displayTime: 'TTh 1:00 – 2:15 PM',
    professor: 'Dr. Amara Diallo',
    seats: 19,
    category: 'Elective',
    gpaReq: 2.5,
    prereqs: ['CS201'],
    reason: 'Top-rated elective — high job market demand in 2026',
    stars: 4.9,
    enrolled: 21,
    cap: 40,
  },
  {
    code: 'CS 480',
    name: 'Cybersecurity Fundamentals',
    credits: 3,
    days: ['Mon','Wed'],
    startTime: '16:00',
    endTime: '17:15',
    displayTime: 'MW 4:00 – 5:15 PM',
    professor: 'Dr. Rachel Kim',
    seats: 9,
    category: 'Elective',
    gpaReq: 2.5,
    prereqs: ['CS210'],
    reason: 'Fast-growing field — pairs well with your CS track',
    stars: 4.7,
    enrolled: 31,
    cap: 40,
  },
  /* ── Gen Ed ─────────────────────────────────── */
  {
    code: 'ENGL 305',
    name: 'Technical Writing',
    credits: 3,
    days: ['Tue','Thu'],
    startTime: '08:00',
    endTime: '09:15',
    displayTime: 'TTh 8:00 – 9:15 AM',
    professor: 'Prof. Diana Walsh',
    seats: 24,
    category: 'Gen Ed',
    gpaReq: 2.0,
    prereqs: ['ENGL101'],
    reason: 'Satisfies communication requirement for graduation',
    stars: 4.3,
    enrolled: 16,
    cap: 40,
  },
  {
    code: 'PHIL 220',
    name: 'Ethics in Technology',
    credits: 3,
    days: ['Mon','Wed','Fri'],
    startTime: '13:00',
    endTime: '13:50',
    displayTime: 'MWF 1:00 – 1:50 PM',
    professor: 'Prof. Samuel Green',
    seats: 30,
    category: 'Gen Ed',
    gpaReq: 2.0,
    prereqs: [],
    reason: 'Satisfies humanities requirement — no prereqs needed',
    stars: 4.4,
    enrolled: 10,
    cap: 40,
  },
]

/* ─────────────────────────────────────────────
   Overlap detection
   ───────────────────────────────────────────── */
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function overlaps(a, b) {
  const sharedDays = a.days.filter((d) => b.days.includes(d))
  if (!sharedDays.length) return false
  const aStart = toMinutes(a.startTime), aEnd = toMinutes(a.endTime)
  const bStart = toMinutes(b.startTime), bEnd = toMinutes(b.endTime)
  return aStart < bEnd && bStart < aEnd
}

/* ─────────────────────────────────────────────
   Skeleton loader
   ───────────────────────────────────────────── */
function CourseSkeleton() {
  return (
    <div className="rounded-xl border border-ts-border bg-ts-surface p-4 space-y-3 animate-pulse">
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-ts-border rounded" />
        <div className="h-4 w-14 bg-ts-border rounded" />
      </div>
      <div className="h-5 w-48 bg-ts-border-el rounded" />
      <div className="h-3 w-36 bg-ts-border rounded" />
      <div className="h-3 w-full bg-ts-border rounded" />
      <div className="flex justify-between items-center pt-1">
        <div className="h-5 w-24 bg-ts-border rounded-full" />
        <div className="h-7 w-20 bg-ts-border rounded-lg" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Collapsible category panel
   ───────────────────────────────────────────── */
function CategoryPanel({ title, courses, selectedIds, onToggle, conflictId, icon: Icon, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl border border-ts-border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-ts-card hover:bg-ts-surface transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Icon size={15} className="text-ts-orange" />
          <span className="font-serif text-base text-ts-primary">{title}</span>
          <Badge variant="secondary">{courses.length} courses</Badge>
        </div>
        <ChevronDown
          size={16}
          className={cn('text-ts-muted transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {/* Collapsible body */}
      {open && (
        <div className="bg-ts-deeper p-4">
          {/* Horizontal scroll carousel */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {courses.map((course) => {
              const selected = selectedIds.includes(course.code)
              const isConflict = conflictId === course.code
              const fillPct = Math.round((course.enrolled / course.cap) * 100)
              const seatColor = course.seats <= 5 ? 'text-ts-red' : course.seats <= 12 ? 'text-ts-orange' : 'text-ts-green'

              return (
                <div
                  key={course.code}
                  className={cn(
                    'flex-shrink-0 w-64 rounded-xl border p-4 space-y-2.5 transition-all duration-200',
                    selected
                      ? 'border-ts-orange bg-[rgba(237,171,0,0.06)]'
                      : isConflict
                        ? 'border-ts-red bg-[rgba(239,68,68,0.06)]'
                        : 'border-ts-border bg-ts-card hover:border-ts-border-el'
                  )}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-[10px] font-mono">{course.code}</Badge>
                    <div className="flex items-center gap-1 text-[10px] text-ts-muted">
                      <Star size={10} className="fill-ts-orange text-ts-orange" />
                      {course.stars}
                    </div>
                  </div>

                  {/* Name */}
                  <p className="font-serif text-base text-ts-primary leading-tight">{course.name}</p>

                  {/* Time + professor */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-ts-secondary">
                      <Clock size={11} className="text-ts-orange shrink-0" />
                      {course.displayTime}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-ts-tertiary">
                      <Users size={11} className="shrink-0" />
                      {course.professor}
                    </div>
                  </div>

                  {/* Reason tag */}
                  <p className="text-[11px] text-ts-muted leading-relaxed border-l-2 border-ts-orange pl-2">
                    {course.reason}
                  </p>

                  {/* Seats bar */}
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-ts-muted">{course.enrolled}/{course.cap} enrolled</span>
                      <span className={cn('font-semibold', seatColor)}>{course.seats} seats left</span>
                    </div>
                    <div className="h-1 rounded-full bg-ts-surface overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          fillPct >= 85 ? 'bg-ts-red' : fillPct >= 60 ? 'bg-ts-orange' : 'bg-ts-green'
                        )}
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Conflict warning */}
                  {isConflict && (
                    <div className="flex items-center gap-1.5 text-xs text-ts-red">
                      <AlertTriangle size={11} />
                      Schedule conflict
                    </div>
                  )}

                  {/* Action */}
                  <Button
                    variant={selected ? 'outline' : 'default'}
                    size="sm"
                    className={cn('w-full gap-1.5 text-xs', selected && 'border-ts-orange text-ts-orange hover:bg-[rgba(237,171,0,0.09)]')}
                    onClick={() => onToggle(course)}
                  >
                    {selected ? <><X size={12} /> Remove</> : <><Plus size={12} /> Add to Schedule</>}
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Course Recommendations section
   ───────────────────────────────────────────── */
function CourseRecommendations() {
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState([])
  const [conflictId, setConflictId] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(t)
  }, [])

  const totalCredits = selected.reduce((sum, c) => sum + c.credits, 0)

  const handleToggle = (course) => {
    if (selected.find((c) => c.code === course.code)) {
      setSelected((prev) => prev.filter((c) => c.code !== course.code))
      setConflictId(null)
      return
    }
    // Check overlap
    const clash = selected.find((s) => overlaps(s, course))
    if (clash) {
      setConflictId(course.code)
      setTimeout(() => setConflictId(null), 2500)
      return
    }
    setSelected((prev) => [...prev, course])
    setConflictId(null)
  }

  const selectedIds = selected.map((c) => c.code)

  const byCategory = (cat) => COURSES.filter((c) => c.category === cat)

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg orange-gradient">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-ts-primary">Recommended for Fall 2026</h3>
            <p className="text-xs text-ts-muted mt-0.5">
              Based on your {STUDENT.major} major · {STUDENT.gpa} GPA · {STUDENT.credits} credits completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">
            <GraduationCap size={11} />
            {120 - STUDENT.credits - totalCredits} credits to graduation
          </Badge>
          <Badge variant={totalCredits > 18 ? 'destructive' : totalCredits >= 12 ? 'success' : 'secondary'}>
            {totalCredits} cr selected
          </Badge>
        </div>
      </div>

      {/* Loading skeletons */}
      {loading ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-ts-border overflow-hidden">
            <div className="px-5 py-3.5 bg-ts-card flex items-center gap-3">
              <div className="h-4 w-4 bg-ts-border rounded animate-pulse" />
              <div className="h-4 w-32 bg-ts-border rounded animate-pulse" />
            </div>
            <div className="bg-ts-deeper p-4 flex gap-3">
              {[1, 2, 3].map((i) => <CourseSkeleton key={i} />)}
            </div>
          </div>
          <div className="rounded-xl border border-ts-border overflow-hidden">
            <div className="px-5 py-3.5 bg-ts-card flex items-center gap-3">
              <div className="h-4 w-4 bg-ts-border rounded animate-pulse" />
              <div className="h-4 w-24 bg-ts-border rounded animate-pulse" />
            </div>
            <div className="bg-ts-deeper p-4 flex gap-3">
              {[1, 2].map((i) => <CourseSkeleton key={i} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <CategoryPanel
            title="Required Courses"
            courses={byCategory('Required')}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            conflictId={conflictId}
            icon={BookOpen}
            defaultOpen={true}
          />
          <CategoryPanel
            title="Recommended Electives"
            courses={byCategory('Elective')}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            conflictId={conflictId}
            icon={Star}
            defaultOpen={false}
          />
          <CategoryPanel
            title="General Education"
            courses={byCategory('Gen Ed')}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            conflictId={conflictId}
            icon={GraduationCap}
            defaultOpen={false}
          />
        </div>
      )}

      {/* Selected schedule panel */}
      {selected.length > 0 && (
        <Card className="border-ts-orange">
          <CardHeader className="p-5">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-ts-orange" />
              <CardTitle>My Fall 2026 Schedule</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">{selected.length} courses</Badge>
              <Badge variant={totalCredits > 18 ? 'destructive' : 'success'}>{totalCredits} credits</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="space-y-2 mb-4">
              {selected.map((course) => (
                <div
                  key={course.code}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-ts-surface border border-ts-border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-ts-orange font-semibold">{course.code}</span>
                      <span className="text-sm font-medium text-ts-primary truncate">{course.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-ts-tertiary">
                      <span className="flex items-center gap-1"><Clock size={10} />{course.displayTime}</span>
                      <span>{course.credits} credits</span>
                      <span className="text-ts-muted">{course.professor}</span>
                    </div>
                  </div>
                  <Badge variant="default">Pending</Badge>
                  <button
                    onClick={() => handleToggle(course)}
                    className="text-ts-muted hover:text-ts-red transition-colors ml-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />

            <div className="flex items-center justify-between">
              <div className="text-sm text-ts-secondary">
                <span className="font-serif text-lg text-ts-primary">{totalCredits}</span>
                <span className="text-ts-muted"> / 18 max credits · </span>
                <span className={totalCredits >= 12 ? 'text-ts-green' : 'text-ts-orange'}>
                  {totalCredits >= 12 ? 'Full-time' : 'Part-time'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelected([])}>
                  Clear All
                </Button>
                <Button size="sm" className="gap-1.5">
                  <CheckCircle2 size={13} />
                  Submit to Advisor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Advisor card data
   ───────────────────────────────────────────── */
const appointments = [
  {
    id: 1,
    title: 'Spring Registration Review',
    date: 'Thu, Mar 28',
    time: '2:00 PM – 2:30 PM',
    type: 'In-Person',
    typeVariant: 'success',
    location: 'Foster Hall 204',
    status: 'Confirmed',
  },
  {
    id: 2,
    title: 'Degree Audit & Graduation Check',
    date: 'Tue, Apr 8',
    time: '11:00 AM – 11:45 AM',
    type: 'Virtual',
    typeVariant: 'default',
    location: 'Zoom (link sent to email)',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Academic Probation Follow-up',
    date: 'Mon, Apr 21',
    time: '3:30 PM – 4:00 PM',
    type: 'In-Person',
    typeVariant: 'success',
    location: 'Foster Hall 204',
    status: 'Confirmed',
  },
]

const pastMeetings = [
  { title: 'Course Selection — Spring 2026', date: 'Nov 14, 2025', note: 'Approved 5-course load including MATH 301.' },
  { title: 'GPA Recovery Planning',          date: 'Sep 3, 2025',  note: 'Identified tutoring resources and study plan.' },
  { title: 'Financial Hold Discussion',      date: 'Aug 19, 2025', note: 'Referred to Financial Aid for TOPS review.' },
]

const resources = [
  { label: 'Degree Audit Report',    icon: FileText,     href: '#' },
  { label: 'Course Catalog 2025–26', icon: BookOpen,     href: '#' },
  { label: 'Tutoring Center Portal', icon: ExternalLink, href: '#' },
  { label: 'Academic Calendar',      icon: CalendarDays, href: '#' },
]

/* ─────────────────────────────────────────────
   Appointment scheduler
   ───────────────────────────────────────────── */
const DAYS_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const timeSlots = [
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM',
  '11:00 AM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
]

function AppointmentScheduler() {
  const today = new Date()
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booked, setBooked] = useState(false)

  const firstDay = new Date(cursor.year, cursor.month, 1).getDay()
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  )
  const isToday = (d) =>
    d === today.getDate() && cursor.month === today.getMonth() && cursor.year === today.getFullYear()
  const isPast = (d) => {
    const cellDate = new Date(cursor.year, cursor.month, d)
    cellDate.setHours(0, 0, 0, 0)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return cellDate < t
  }
  const prev = () => setCursor(({ year, month }) => month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 })
  const next = () => setCursor(({ year, month }) => month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 })

  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(34,197,94,0.12)]">
          <CheckCircle2 size={28} className="text-ts-green" />
        </div>
        <div>
          <p className="font-serif text-xl text-ts-primary">Appointment Requested!</p>
          <p className="text-sm text-ts-secondary mt-1">{MONTHS[cursor.month]} {selectedDay} at {selectedSlot}</p>
          <p className="text-xs text-ts-muted mt-1">Dr. Torres will confirm within 24 hours.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { setBooked(false); setSelectedDay(null); setSelectedSlot(null) }}>
          Schedule Another
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ts-primary">{MONTHS[cursor.month]} {cursor.year}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prev}><ChevronLeft size={14} /></Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={next}><ChevronRight size={14} /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center">
        {DAYS_LABELS.map((d) => (
          <span key={d} className="text-[10px] font-semibold text-ts-muted uppercase py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center gap-y-1">
        {cells.map((d, i) => {
          const past = d ? isPast(d) : false
          const sel = d === selectedDay
          return (
            <button
              key={i}
              disabled={!d || past}
              onClick={() => { setSelectedDay(d); setSelectedSlot(null) }}
              className={cn(
                'relative flex items-center justify-center h-8 rounded-lg text-xs font-medium transition-colors',
                !d && 'invisible',
                past && 'text-ts-disabled cursor-not-allowed',
                sel && 'orange-gradient text-white font-bold',
                isToday(d) && !sel && 'ring-1 ring-ts-orange text-ts-orange',
                !past && !sel && 'text-ts-secondary hover:bg-ts-surface hover:text-ts-primary'
              )}
            >
              {d ?? ''}
            </button>
          )
        })}
      </div>
      {selectedDay && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-semibold text-ts-muted uppercase tracking-wider mb-2">
              Available Times — {MONTHS[cursor.month]} {selectedDay}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    'px-2 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                    selectedSlot === slot
                      ? 'border-ts-orange bg-[rgba(237,171,0,0.09)] text-ts-orange'
                      : 'border-ts-border text-ts-secondary hover:border-ts-border-el hover:text-ts-primary'
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {selectedSlot && (
        <Button className="w-full gap-2" onClick={() => setBooked(true)}>
          <CalendarDays size={15} />
          Confirm — {MONTHS[cursor.month]} {selectedDay} at {selectedSlot}
        </Button>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
export default function Advising() {
  return (
    <div className="flex h-screen overflow-hidden bg-ts-page">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Advising" />
        <main className="flex-1 overflow-y-auto p-8 space-y-6">

          {/* Heading */}
          <div>
            <h2 className="font-serif text-3xl text-ts-primary mb-1">Academic Advising</h2>
            <p className="text-sm text-ts-secondary">
              Schedule appointments, review past meetings, and connect with your advisor.
            </p>
          </div>

          {/* Advisor card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl orange-gradient text-white font-bold text-xl shrink-0 font-serif">
                  RT
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl text-ts-primary">Dr. Rebecca Torres</h3>
                      <p className="text-sm text-ts-secondary mt-0.5">Academic Advisor — College of Science &amp; Engineering</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Badge variant="success">Available Today</Badge>
                      <Badge variant="secondary">Foster Hall 204</Badge>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2.5">
                      <Mail size={14} className="text-ts-orange shrink-0" />
                      <div>
                        <p className="text-[10px] text-ts-muted uppercase tracking-wider">Email</p>
                        <p className="text-sm text-ts-primary">rtorres@tigersync.edu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={14} className="text-ts-orange shrink-0" />
                      <div>
                        <p className="text-[10px] text-ts-muted uppercase tracking-wider">Phone</p>
                        <p className="text-sm text-ts-primary">(225) 555-0183</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={14} className="text-ts-orange shrink-0" />
                      <div>
                        <p className="text-[10px] text-ts-muted uppercase tracking-wider">Office Hours</p>
                        <p className="text-sm text-ts-primary">Mon–Thu, 9 AM – 4 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3-column: Upcoming | Scheduler | Past + Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {/* Upcoming */}
            <Card>
              <CardHeader className="p-5">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Badge variant="default">{appointments.length} Scheduled</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-4 space-y-3">
                {appointments.map(({ id, title, date, time, type, typeVariant, location, status }) => (
                  <div key={id} className="p-3 rounded-xl border border-ts-border bg-ts-surface space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-ts-primary leading-tight">{title}</p>
                      <Badge variant={typeVariant} className="shrink-0">{type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ts-secondary">
                      <CalendarDays size={11} className="text-ts-orange shrink-0" />
                      {date} · {time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ts-tertiary">
                      <MapPin size={11} className="shrink-0" />{location}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className={cn('text-xs font-medium', status === 'Confirmed' ? 'text-ts-green' : 'text-ts-orange')}>
                        {status === 'Confirmed'
                          ? <span className="flex items-center gap-1"><CheckCircle2 size={11} /> Confirmed</span>
                          : 'Awaiting Confirmation'}
                      </span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-ts-muted hover:text-ts-red">Cancel</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scheduler */}
            <Card>
              <CardHeader className="p-5">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-ts-orange" />
                  <CardTitle>Schedule Appointment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                <AppointmentScheduler />
              </CardContent>
            </Card>

            {/* Past + Resources */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-5">
                  <CardTitle>Past Meetings</CardTitle>
                  <Badge variant="secondary">{pastMeetings.length} Total</Badge>
                </CardHeader>
                <CardContent className="p-5 pt-4 space-y-3">
                  {pastMeetings.map(({ title, date, note }) => (
                    <div key={title} className="border-b border-ts-border last:border-0 pb-3 last:pb-0">
                      <p className="text-sm font-semibold text-ts-primary leading-tight">{title}</p>
                      <p className="text-xs text-ts-muted mb-1">{date}</p>
                      <p className="text-xs text-ts-tertiary leading-relaxed">{note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-5">
                  <CardTitle>Quick Resources</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-4 space-y-2">
                  {resources.map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-ts-border hover:border-ts-border-el hover:bg-ts-surface transition-colors group"
                    >
                      <Icon size={14} className="text-ts-orange shrink-0" />
                      <span className="text-sm text-ts-secondary group-hover:text-ts-primary transition-colors flex-1">{label}</span>
                      <ExternalLink size={12} className="text-ts-muted group-hover:text-ts-tertiary" />
                    </a>
                  ))}
                  <Button variant="outline" className="w-full mt-1 gap-2">
                    <MessageSquare size={14} />
                    Message Dr. Torres
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ── Course Recommendations ── */}
          <CourseRecommendations />

        </main>
      </div>
    </div>
  )
}
