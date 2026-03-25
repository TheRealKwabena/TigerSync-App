import { useState } from 'react'
import {
  CheckCircle2,
  Clock,
  Circle,
  BookOpen,
  Calculator,
  FlaskConical,
  Lightbulb,
  Globe,
  Sparkles,
  ChevronDown,
  GraduationCap,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { cn } from '../lib/utils'

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'cs-core',
    label: 'Computer Science Core',
    icon: BookOpen,
    required: 45,
    color: 'text-[#60a5fa]',
    dotColor: 'bg-[#60a5fa]',
    courses: [
      { code: 'CS 101',  name: 'Introduction to Computer Science',  cr: 3, status: 'completed',   grade: 'A',   term: 'Fall 2022' },
      { code: 'CS 201',  name: 'Data Structures',                   cr: 3, status: 'completed',   grade: 'A',   term: 'Spring 2023' },
      { code: 'CS 210',  name: 'Computer Organization',             cr: 3, status: 'completed',   grade: 'A',  term: 'Fall 2023' },
      { code: 'CS 225',  name: 'Object-Oriented Programming',       cr: 3, status: 'completed',   grade: 'A',   term: 'Fall 2023' },
      { code: 'CS 310',  name: 'Algorithm Design I',                cr: 3, status: 'completed',   grade: 'A',   term: 'Spring 2024' },
      { code: 'CS 320',  name: 'Programming Languages',             cr: 3, status: 'completed',   grade: 'B',  term: 'Spring 2024' },
      { code: 'CS 330',  name: 'Computer Graphics',                 cr: 3, status: 'completed',   grade: 'B',   term: 'Fall 2024' },
      { code: 'CS 350',  name: 'Algorithm Design II',               cr: 3, status: 'completed',   grade: 'A',   term: 'Fall 2025' },
      { code: 'CS 360',  name: 'Database Systems',                  cr: 3, status: 'completed',   grade: 'A',  term: 'Fall 2025' },
      { code: 'CS 370',  name: 'Computer Networks',                 cr: 3, status: 'completed',   grade: 'B',  term: 'Fall 2025' },
      { code: 'CS 380',  name: 'Software Design Patterns',          cr: 3, status: 'in-progress', grade: null,  term: 'Spring 2026' },
      { code: 'CS 401',  name: 'Advanced Algorithms',               cr: 3, status: 'planned',     grade: null,  term: 'Fall 2026' },
      { code: 'CS 415',  name: 'Machine Learning',                  cr: 3, status: 'planned',     grade: null,  term: 'Fall 2026' },
      { code: 'CS 450',  name: 'Software Engineering',              cr: 3, status: 'planned',     grade: null,  term: 'Fall 2026' },
      { code: 'CS 490',  name: 'Senior Capstone',                   cr: 3, status: 'required',    grade: null,  term: 'Spring 2027' },
    ],
  },
  {
    id: 'mathematics',
    label: 'Mathematics',
    icon: Calculator,
    required: 21,
    color: 'text-ts-orange',
    dotColor: 'bg-ts-orange',
    courses: [
      { code: 'MATH 151', name: 'Calculus I',                     cr: 4, status: 'completed',   grade: 'B', term: 'Fall 2022' },
      { code: 'MATH 251', name: 'Calculus II',                    cr: 4, status: 'completed',   grade: 'B', term: 'Spring 2023' },
      { code: 'MATH 310', name: 'Discrete Mathematics',           cr: 3, status: 'completed',   grade: 'B', term: 'Fall 2023' },
      { code: 'MATH 315', name: 'Probability & Statistics',       cr: 3, status: 'completed',   grade: 'B',  term: 'Spring 2024' },
      { code: 'MATH 330', name: 'Linear Algebra',                 cr: 3, status: 'in-progress', grade: null, term: 'Spring 2026' },
      { code: 'MATH 420', name: 'Numerical Methods',              cr: 4, status: 'required',    grade: null, term: 'Spring 2027' },
    ],
  },
  {
    id: 'natural-sci',
    label: 'Natural Sciences',
    icon: FlaskConical,
    required: 12,
    color: 'text-ts-green',
    dotColor: 'bg-ts-green',
    courses: [
      { code: 'PHYS 201', name: 'Physics I — Mechanics',          cr: 3, status: 'completed', grade: 'B',  term: 'Spring 2023' },
      { code: 'PHYS 202', name: 'Physics II — Electromagnetism',  cr: 3, status: 'completed', grade: 'B', term: 'Fall 2023' },
      { code: 'CHEM 101', name: 'General Chemistry',              cr: 3, status: 'completed', grade: 'B',  term: 'Spring 2024' },
      { code: 'BIOL 105', name: 'Biology for Engineers',          cr: 3, status: 'completed', grade: 'A', term: 'Fall 2024' },
    ],
  },
  {
    id: 'tech-electives',
    label: 'Technical Electives',
    icon: Lightbulb,
    required: 12,
    color: 'text-[#a78bfa]',
    dotColor: 'bg-[#a78bfa]',
    courses: [
      { code: 'CS 355',  name: 'Software Testing & QA',           cr: 3, status: 'completed',   grade: 'B', term: 'Spring 2025' },
      { code: 'CS 385',  name: 'Web Development',                 cr: 3, status: 'in-progress', grade: null, term: 'Spring 2026' },
      { code: 'CS 420',  name: 'Operating Systems',               cr: 3, status: 'planned',     grade: null, term: 'Fall 2026' },
      { code: 'CS 460',  name: 'Cloud Computing & DevOps',        cr: 3, status: 'required',    grade: null, term: 'Spring 2027' },
    ],
  },
  {
    id: 'gen-ed',
    label: 'General Education',
    icon: Globe,
    required: 18,
    color: 'text-[#f472b6]',
    dotColor: 'bg-[#f472b6]',
    courses: [
      { code: 'ENGL 101', name: 'English Composition',            cr: 3, status: 'completed', grade: 'A', term: 'Fall 2022' },
      { code: 'PSYC 101', name: 'Introduction to Psychology',     cr: 3, status: 'completed', grade: 'A',  term: 'Fall 2022' },
      { code: 'ENGL 201', name: 'American Literature',            cr: 3, status: 'completed', grade: 'B', term: 'Spring 2024' },
      { code: 'HIST 201', name: 'US History',                     cr: 3, status: 'completed', grade: 'A',  term: 'Fall 2025' },
      { code: 'ENGL 305', name: 'Technical Writing',              cr: 3, status: 'planned',   grade: null, term: 'Fall 2026' },
      { code: 'PHIL 220', name: 'Ethics in Technology',           cr: 3, status: 'planned',   grade: null, term: 'Fall 2026' },
    ],
  },
  {
    id: 'free-electives',
    label: 'Free Electives',
    icon: Sparkles,
    required: 12,
    color: 'text-ts-secondary',
    dotColor: 'bg-ts-secondary',
    courses: [
      { code: 'MATH 320', name: 'Applied Statistics',             cr: 3, status: 'completed', grade: 'A', term: 'Spring 2025' },
      { code: 'MGMT 201', name: 'Introduction to Management',     cr: 3, status: 'completed', grade: 'B', term: 'Fall 2024' },
      { code: 'ART 105',  name: 'Digital Media Design',           cr: 3, status: 'planned',   grade: null, term: 'Fall 2026' },
      { code: 'COMM 210', name: 'Public Speaking',                cr: 3, status: 'required',  grade: null, term: 'Spring 2027' },
    ],
  },
]

/* Computed totals */
const completedTotal = SECTIONS.reduce((acc, s) =>
  acc + s.courses.filter((c) => c.status === 'completed').reduce((a, c) => a + c.cr, 0), 0)
const inProgressTotal = SECTIONS.reduce((acc, s) =>
  acc + s.courses.filter((c) => c.status === 'in-progress').reduce((a, c) => a + c.cr, 0), 0)
const totalRequired = SECTIONS.reduce((acc, s) => acc + s.required, 0)

/* ─────────────────────────────────────────────
   Status helpers
   ───────────────────────────────────────────── */
const STATUS_META = {
  completed:   { icon: CheckCircle2, color: 'text-ts-green',    badge: 'success',     label: 'Completed' },
  'in-progress': { icon: Clock,      color: 'text-ts-orange',   badge: 'default',     label: 'In Progress' },
  planned:     { icon: Circle,       color: 'text-[#60a5fa]',   badge: 'outline',     label: 'Planned' },
  required:    { icon: Circle,       color: 'text-ts-disabled', badge: 'secondary',   label: 'Required' },
}

const FILTER_OPTIONS = ['All', 'Completed', 'In Progress', 'Planned', 'Required']

/* ─────────────────────────────────────────────
   Section accordion panel
   ───────────────────────────────────────────── */
function SectionPanel({ section, filter, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  const { icon: Icon, label, required, color, dotColor, courses } = section

  const filtered = courses.filter((c) => {
    if (filter === 'All') return true
    if (filter === 'In Progress') return c.status === 'in-progress'
    return c.status === filter.toLowerCase()
  })

  const completedCr = courses.filter((c) => c.status === 'completed').reduce((a, c) => a + c.cr, 0)
  const pct = Math.round((completedCr / required) * 100)
  const done = completedCr >= required

  if (filtered.length === 0) return null

  return (
    <div className="rounded-xl border border-ts-border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-ts-card hover:bg-ts-surface transition-colors"
      >
        <Icon size={16} className={color} />
        <span className="font-serif text-base text-ts-primary flex-1 text-left">{label}</span>

        <div className="hidden sm:flex items-center gap-3 mr-2">
          <div className="w-24 h-1.5 rounded-full bg-ts-surface overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', done ? 'bg-ts-green' : dotColor)}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <span className="text-xs text-ts-muted w-16 text-right whitespace-nowrap">
            {completedCr}/{required} cr
          </span>
        </div>

        {done
          ? <Badge variant="success" className="hidden sm:inline-flex">Complete</Badge>
          : <Badge variant="secondary" className="hidden sm:inline-flex">{pct}%</Badge>}

        <ChevronDown
          size={16}
          className={cn('text-ts-muted transition-transform duration-200 ml-1', open && 'rotate-180')}
        />
      </button>

      {/* Course list */}
      {open && (
        <div className="bg-ts-deeper divide-y divide-ts-border">
          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-ts-muted">
            <span>Course</span>
            <span className="w-16 text-center">Credits</span>
            <span className="w-14 text-center">Grade</span>
            <span className="w-28 text-right">Term</span>
          </div>

          {filtered.map((course) => {
            const meta = STATUS_META[course.status]
            const StatusIcon = meta.icon
            return (
              <div
                key={course.code}
                className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto] gap-2 sm:gap-4 px-5 py-3 items-start sm:items-center hover:bg-ts-surface/50 transition-colors"
              >
                {/* Course info */}
                <div className="flex items-center gap-3">
                  <StatusIcon size={15} className={cn('shrink-0', meta.color)} />
                  <div>
                    <span className="text-xs font-mono text-ts-muted mr-2">{course.code}</span>
                    <span className="text-sm text-ts-primary">{course.name}</span>
                  </div>
                </div>

                {/* Credits */}
                <span className="sm:w-16 sm:text-center text-xs font-semibold text-ts-secondary ml-6 sm:ml-0">
                  {course.cr} cr
                </span>

                {/* Grade */}
                <span className="sm:w-14 sm:text-center text-xs font-bold w-8 ml-6 sm:ml-0">
                  {course.grade
                    ? <span className="text-ts-green">{course.grade}</span>
                    : <Badge variant={meta.badge} className="text-[10px] px-1.5">{meta.label}</Badge>
                  }
                </span>

                {/* Term */}
                <span className="sm:w-28 sm:text-right text-xs text-ts-muted ml-6 sm:ml-0">
                  {course.term ?? '—'}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
export default function DegreeAudit() {
  const [filter, setFilter] = useState('All')

  const overallPct = Math.round((completedTotal / totalRequired) * 100)

  /* GPA breakdown per section */
  const sectionStats = SECTIONS.map((s) => {
    const comp = s.courses.filter((c) => c.status === 'completed').reduce((a, c) => a + c.cr, 0)
    return { ...s, completed: comp, pct: Math.round((comp / s.required) * 100) }
  })

  return (
    <div className="flex h-screen overflow-hidden bg-ts-page">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Degree Audit" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">

          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-ts-primary">Degree Progress</h2>
              <p className="text-sm text-ts-secondary mt-1">
                Computer Science — B.S. · Expected Graduation: <span className="text-ts-orange font-medium">Spring 2027</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success"><GraduationCap size={11} /> On Track</Badge>
              <Badge variant="default">{totalRequired - completedTotal} cr remaining</Badge>
            </div>
          </div>

          {/* Summary stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Credits',      value: `${completedTotal}/${totalRequired}`, sub: 'completed',       color: 'text-ts-primary' },
              { label: 'Current GPA',        value: '3.67',                               sub: 'cumulative',      color: 'text-ts-orange' },
              { label: 'In Progress',        value: `${inProgressTotal} cr`,              sub: 'this semester',   color: 'text-[#60a5fa]' },
              { label: 'Expected Grad',      value: 'May 2027',                           sub: 'Spring semester', color: 'text-ts-green' },
            ].map(({ label, value, sub, color }) => (
              <Card key={label}>
                <CardContent className="p-4 sm:p-5">
                  <p className="text-xs text-ts-muted uppercase tracking-wider mb-2">{label}</p>
                  <p className={cn('font-serif text-2xl sm:text-3xl mb-1', color)}>{value}</p>
                  <p className="text-xs text-ts-tertiary">{sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall progress bar */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-serif text-lg text-ts-primary">Overall Completion</p>
                <span className="font-serif text-2xl text-ts-green">{overallPct}%</span>
              </div>
              <Progress value={overallPct} indicatorClassName="bg-gradient-to-r from-ts-green to-[#4ade80]" />
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                {sectionStats.map(({ id, label, completed, required: req, dotColor }) => (
                  <div key={id} className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full shrink-0', dotColor)} />
                    <span className="text-xs text-ts-secondary">{label}</span>
                    <span className="text-xs font-semibold text-ts-muted">{completed}/{req}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
                  filter === f
                    ? 'border-ts-orange bg-[rgba(237,171,0,0.09)] text-ts-orange'
                    : 'border-ts-border text-ts-secondary hover:border-ts-border-el hover:text-ts-primary'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Section accordions */}
          <div className="space-y-3">
            {SECTIONS.map((section, i) => (
              <SectionPanel
                key={section.id}
                section={section}
                filter={filter}
                defaultOpen={i === 0}
              />
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}
