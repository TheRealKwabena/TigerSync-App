import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  User,
  BookOpen,
  AlertTriangle,
  Timer,
  TrendingDown,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Globe,
  Apple,
  Import,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Progress } from '../components/ui/progress'
import { Separator } from '../components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../components/ui/dropdown-menu'

/* ── data ── */
const stats = [
  {
    icon: BookOpen,
    label: 'Credits Taken',
    value: '77/120',
    badge: '64%',
    badgeVariant: 'secondary',
  },
  {
    icon: AlertTriangle,
    label: 'Account Holds',
    value: '2',
    badge: 'Action Needed',
    badgeVariant: 'destructive',
    iconColor: 'text-ts-red',
  },
  {
    icon: Timer,
    label: 'Registration Deadline',
    value: 'Apr 15',
    badge: '23 Days Left',
    badgeBadgeIcon: AlertTriangle,
    badgeVariant: 'default',
  },
  {
    icon: TrendingDown,
    label: 'Average GPA',
    value: '3.67',
    badge: '-0.3%',
    badgeVariant: 'destructive',
  },
]

const actionItems = [
  {
    title: 'Clear financial hold',
    desc: '$245 balance remaining',
    tag: 'Urgent',
    tagVariant: 'destructive',
    done: false,
  },
  {
    title: 'Submit immunization records',
    desc: 'Required for enrollment verification',
    tag: 'Due Soon',
    tagVariant: 'default',
    done: false,
  },
  {
    title: 'Schedule advising appointment',
    desc: 'Dr. Bharat Rawal — available slots open',
    tag: 'Recommended',
    tagVariant: 'secondary',
    done: false,
  },
  {
    title: 'Register for MATH 301',
    desc: 'Prerequisite met — ready to enroll',
    tag: 'Ready',
    tagVariant: 'success',
    done: true,
  },
]

const aidStatus = [
  { label: 'FAFSA Status',    value: 'Verified',       valueStyle: 'text-ts-green' },
  { label: 'Pell Grant',      value: '$3,298 Awarded', valueStyle: 'text-ts-green' },
  { label: 'LA TOPS',         value: 'Pending Review', valueStyle: 'text-ts-orange' },
  { label: 'Tuition Balance', value: '$245 Remaining', valueStyle: 'text-ts-red' },
]

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const upcomingEvents = [
  { date: 26, label: 'FAFSA Review',        color: 'bg-ts-orange' },
  { date: 28, label: 'Advising Appt.',      color: 'bg-ts-green' },
  { date: 31, label: 'Immunization Due',    color: 'bg-ts-red' },
]

/* ── mini calendar ── */
function MiniCalendar() {
  const today = new Date()
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const firstDay = new Date(cursor.year, cursor.month, 1).getDay()
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  )

  const isToday = (d) =>
    d === today.getDate() &&
    cursor.month === today.getMonth() &&
    cursor.year === today.getFullYear()

  const eventDates = new Set(upcomingEvents.map((e) => e.date))

  const prev = () =>
    setCursor(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    )
  const next = () =>
    setCursor(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    )

  return (
    <div className="space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ts-primary">
          {MONTHS[cursor.month]} {cursor.year}
        </span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prev}>
            <ChevronLeft size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={next}>
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 text-center">
        {DAYS.map((d) => (
          <span key={d} className="text-[10px] font-semibold text-ts-muted uppercase py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 text-center gap-y-1">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`relative flex flex-col items-center justify-center h-8 rounded-lg text-xs font-medium cursor-default
              ${!d ? '' : isToday(d)
                ? 'orange-gradient text-white font-bold'
                : 'text-ts-secondary hover:bg-ts-surface hover:text-ts-primary transition-colors'}`}
          >
            {d ?? ''}
            {d && eventDates.has(d) && !isToday(d) && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-ts-orange" />
            )}
          </div>
        ))}
      </div>

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-ts-muted uppercase tracking-wider">Upcoming</p>
            {upcomingEvents.map(({ date, label, color }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                <span className="text-xs text-ts-secondary flex-1">{label}</span>
                <span className="text-xs text-ts-muted">Mar {date}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── page ── */
export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen overflow-hidden bg-ts-page">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Dashboard" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">

          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-ts-primary mb-2">
                Welcome back, Jordan
              </h2>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-sm text-ts-secondary">
                  <GraduationCap size={14} className="text-ts-tertiary" /> Junior
                </span>
                <span className="flex items-center gap-1.5 text-sm text-ts-secondary">
                  <User size={14} className="text-ts-tertiary" /> Advisor: Dr. Bharat Rawal
                </span>
              </div>
            </div>

            <Card className="flex flex-col items-start gap-1 px-5 py-3 border-ts-border-el">
              <span className="text-xs text-ts-muted uppercase tracking-widest">Today</span>
              <span className="text-base font-semibold text-ts-primary">March 24, 2026</span>
              <Badge variant="default">Spring 2026</Badge>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, label, value, badge, badgeVariant, iconColor }) => (
              <Card key={label}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-ts-muted uppercase tracking-wider">{label}</span>
                    <Icon size={15} className={iconColor || 'text-ts-tertiary'} />
                  </div>
                  <p className="font-serif text-3xl text-ts-primary mb-2">{value}</p>
                  <Badge variant={badgeVariant}>{badge}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Row: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {/* Action Items */}
            <Card>
              <CardHeader className="p-5">
                <CardTitle>Action Items</CardTitle>
                <Badge variant="default">4 Pending</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                <ul className="space-y-3">
                  {actionItems.map(({ title, desc, tag, tagVariant, done }) => (
                    <li key={title} className="flex items-start gap-3">
                      {done
                        ? <CheckCircle2 size={16} className="text-ts-green mt-0.5 shrink-0" />
                        : <Circle size={16} className="text-ts-border-el mt-0.5 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${done ? 'line-through text-ts-muted' : 'text-ts-primary'}`}>
                          {title}
                        </p>
                        <p className="text-xs text-ts-tertiary mt-0.5">{desc}</p>
                      </div>
                      <Badge variant={tagVariant} className="shrink-0">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Financial Aid */}
            <Card
              className="cursor-pointer hover:border-ts-border-el transition-colors"
              onClick={() => navigate('/financial-aid')}
            >
              <CardHeader className="p-5">
                <CardTitle>Financial Aid Status</CardTitle>
                <Badge variant="success">Updated</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                <ul className="space-y-3">
                  {aidStatus.map(({ label, value, valueStyle }) => (
                    <li key={label} className="flex items-center justify-between">
                      <span className="text-sm text-ts-secondary">{label}</span>
                      <span className={`text-sm font-semibold ${valueStyle}`}>{value}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-ts-muted mt-5 text-right">
                  Click to view full Financial Aid →
                </p>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card>
              <CardHeader className="p-5">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-ts-orange" />
                  <CardTitle>Calendar</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Import size={13} />
                      Import
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Import Calendar</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Globe size={15} className="text-ts-orange" />
                      Google Calendar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Apple size={15} className="text-ts-secondary" />
                      Apple Calendar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                <MiniCalendar />
              </CardContent>
            </Card>

          </div>

          {/* Degree Progress */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <CardTitle className="text-base">Degree Completion</CardTitle>
                <span className="text-sm font-bold text-ts-green">64%</span>
              </div>
              <Progress
                value={64}
                indicatorClassName="bg-gradient-to-r from-ts-green to-[#4ade80]"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-ts-tertiary">77 of 120 credits completed</span>
                <span className="text-xs text-ts-tertiary">43 credits remaining</span>
              </div>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  )
}
