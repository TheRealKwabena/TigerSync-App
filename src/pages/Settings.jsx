import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  Palette,
  Link,
  GraduationCap,
  Globe,
  Apple,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Save,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { cn } from '../lib/utils'

/* ─────────────────────────────────────────────
   Toggle switch
   ───────────────────────────────────────────── */
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200',
        checked ? 'orange-gradient' : 'bg-ts-border-el'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  )
}

/* ─────────────────────────────────────────────
   Section wrapper
   ───────────────────────────────────────────── */
function SettingsSection({ icon: Icon, title, badge, children }) {
  return (
    <Card>
      <CardHeader className="p-5">
        <div className="flex items-center gap-2.5">
          <Icon size={16} className="text-ts-orange" />
          <CardTitle>{title}</CardTitle>
        </div>
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-4">
        {children}
      </CardContent>
    </Card>
  )
}

/* Row with label + toggle */
function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ts-primary">{label}</p>
        {description && <p className="text-xs text-ts-tertiary mt-0.5">{description}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

/* Row with label + select */
function SelectRow({ label, description, value, options, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ts-primary">{label}</p>
        {description && <p className="text-xs text-ts-tertiary mt-0.5">{description}</p>}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-ts-surface border border-ts-border rounded-lg px-3 py-1.5 text-sm text-ts-primary outline-none focus:border-ts-orange transition-colors cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

/* Text field row */
function FieldRow({ label, value, onChange, type = 'text', disabled }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-ts-muted uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          'w-full bg-ts-surface border border-ts-border rounded-lg px-3.5 py-2.5 text-sm text-ts-primary outline-none transition-colors',
          disabled ? 'opacity-50 cursor-not-allowed' : 'focus:border-ts-orange'
        )}
      />
    </div>
  )
}

/* Integration card */
function IntegrationCard({ icon: Icon, name, description, connected, onToggle }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-ts-border bg-ts-surface hover:border-ts-border-el transition-colors">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-ts-card border border-ts-border shrink-0">
        <Icon size={18} className="text-ts-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ts-primary">{name}</p>
        <p className="text-xs text-ts-tertiary mt-0.5">{description}</p>
      </div>
      {connected
        ? <div className="flex items-center gap-2">
            <Badge variant="success"><CheckCircle2 size={11} /> Connected</Badge>
            <Button variant="ghost" size="sm" className="text-xs text-ts-muted" onClick={onToggle}>
              Disconnect
            </Button>
          </div>
        : <Button size="sm" className="gap-1.5 text-xs" onClick={onToggle}>
            Connect
            <ChevronRight size={12} />
          </Button>
      }
    </div>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */
export default function Settings() {
  /* Profile */
  const [profile, setProfile] = useState({
    firstName: 'Jordan',
    lastName: 'Davis',
    email: 'jdavis@gsumail.gram.edu',
    phone: '(225) 555-0194',
    studentId: 'G00455000',
    major: 'Computer Science',
    minor: 'Mathematics',
    year: 'Junior',
    advisor: 'Dr. Bharat Rawal',
  })
  const updateProfile = (key) => (val) => setProfile((p) => ({ ...p, [key]: val }))

  /* Notifications */
  const [notif, setNotif] = useState({
    emailGrades: true,
    emailDeadlines: true,
    emailAdvisor: true,
    emailAid: false,
    pushAll: true,
    pushAnnouncements: true,
    pushHolds: true,
    smsUrgent: false,
  })
  const toggleNotif = (key) => (v) => setNotif((n) => ({ ...n, [key]: v }))

  /* Privacy */
  const [privacy, setPrivacy] = useState({
    shareProgress: true,
    shareGPA: false,
    analyticsOpt: true,
    researchUse: false,
  })
  const togglePrivacy = (key) => (v) => setPrivacy((p) => ({ ...p, [key]: v }))

  /* Academic */
  const [academic, setAcademic] = useState({
    creditLoad: 'full-time',
    gpaGoal: '3.8',
    gradSemester: 'Spring 2027',
    showCredits: true,
  })

  /* Integrations */
  const [integrations, setIntegrations] = useState({
    google: false,
    apple: false,
    canvas: true,
  })
  const toggleInteg = (key) => () => setIntegrations((i) => ({ ...i, [key]: !i[key] }))

  const [saved, setSaved] = useState(false)
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-ts-page">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Settings" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">

          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-ts-primary">Account Settings</h2>
              <p className="text-sm text-ts-secondary mt-1">Manage your profile, notifications, and preferences.</p>
            </div>
            <Button className="gap-2 self-start sm:self-auto" onClick={handleSave}>
              <Save size={15} />
              {saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Profile ── */}
            <SettingsSection icon={User} title="Profile" badge={{ variant: 'secondary', label: 'TSU-2024-7843' }}>
              {/* Avatar */}
              <div className="flex items-center gap-4 pb-2">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl orange-gradient text-white font-bold text-xl font-serif shrink-0">
                  JD
                </div>
                <div>
                  <p className="font-serif text-lg text-ts-primary">Jordan Davis</p>
                  <p className="text-xs text-ts-muted">{profile.major} · {profile.year}</p>
                  <Button variant="outline" size="sm" className="mt-2 text-xs">Change Photo</Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldRow label="First Name"  value={profile.firstName}  onChange={() => {}} disabled />
                <FieldRow label="Last Name"   value={profile.lastName}   onChange={() => {}} disabled />
                <FieldRow label="Email"       value={profile.email}      onChange={updateProfile('email')} type="email" />
                <FieldRow label="Phone"       value={profile.phone}      onChange={updateProfile('phone')} type="tel" />
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldRow label="Student ID"   value={profile.studentId}  onChange={() => {}} disabled />
                <FieldRow label="Major"        value={profile.major}      onChange={() => {}} disabled  />
                <FieldRow label="Minor"        value={profile.minor}      onChange={() => {}} disabled />
                <FieldRow label="Advisor"      value={profile.advisor}    onChange={() => {}} disabled />
              </div>
            </SettingsSection>

            {/* ── Notifications ── */}
            <SettingsSection icon={Bell} title="Notifications">
              <p className="text-xs font-semibold text-ts-muted uppercase tracking-wider">Email</p>
              <div className="space-y-3">
                <ToggleRow label="Grade updates"      description="Receive an email when grades are posted"       checked={notif.emailGrades}    onChange={toggleNotif('emailGrades')} />
                <ToggleRow label="Registration deadlines" description="Reminders before critical deadlines"       checked={notif.emailDeadlines} onChange={toggleNotif('emailDeadlines')} />
                <ToggleRow label="Advisor messages"   description="New messages from Dr. Torres"                  checked={notif.emailAdvisor}   onChange={toggleNotif('emailAdvisor')} />
                <ToggleRow label="Financial aid updates" description="Aid award changes and disbursements"        checked={notif.emailAid}       onChange={toggleNotif('emailAid')} />
              </div>

              <Separator />

              <p className="text-xs font-semibold text-ts-muted uppercase tracking-wider">Push & SMS</p>
              <div className="space-y-3">
                <ToggleRow label="Push notifications"  description="Browser and mobile push alerts"               checked={notif.pushAll}          onChange={toggleNotif('pushAll')} />
                <ToggleRow label="Announcements"       description="Campus-wide announcements"                    checked={notif.pushAnnouncements} onChange={toggleNotif('pushAnnouncements')} />
                <ToggleRow label="Account hold alerts" description="Instant alert when a hold is placed"          checked={notif.pushHolds}        onChange={toggleNotif('pushHolds')} />
                <ToggleRow label="SMS for urgent items" description="Text message for urgent action required"     checked={notif.smsUrgent}        onChange={toggleNotif('smsUrgent')} />
              </div>
            </SettingsSection>

            {/* ── Academic Preferences ── */}
            <SettingsSection icon={GraduationCap} title="Academic Preferences">
              <div className="space-y-4">
                <SelectRow
                  label="Credit load preference"
                  description="Used to calculate graduation timeline"
                  value={academic.creditLoad}
                  onChange={(v) => setAcademic((a) => ({ ...a, creditLoad: v }))}
                  options={[
                    { value: 'full-time', label: 'Full-time (12–18 credits)' },
                    { value: 'part-time', label: 'Part-time (6–11 credits)' },
                    { value: 'overload',  label: 'Overload (19+ credits)' },
                  ]}
                />
                <SelectRow
                  label="GPA goal"
                  description="TigerAI will suggest courses to hit this target"
                  value={academic.gpaGoal}
                  onChange={(v) => setAcademic((a) => ({ ...a, gpaGoal: v }))}
                  options={[
                    { value: '3.5', label: '3.5 — Honor Roll' },
                    { value: '3.8', label: '3.8 — Magna Cum Laude' },
                    { value: '4.0', label: '4.0 — Summa Cum Laude' },
                  ]}
                />
                <SelectRow
                  label="Target graduation"
                  value={academic.gradSemester}
                  onChange={(v) => setAcademic((a) => ({ ...a, gradSemester: v }))}
                  options={[
                    { value: 'Spring 2027', label: 'Spring 2027' },
                    { value: 'Fall 2027',   label: 'Fall 2027' },
                    { value: 'Spring 2028', label: 'Spring 2028' },
                  ]}
                />

                <Separator />

                <ToggleRow
                  label="Show credit count on sidebar"
                  description="Display credit progress in the navigation"
                  checked={academic.showCredits}
                  onChange={(v) => setAcademic((a) => ({ ...a, showCredits: v }))}
                />
              </div>
            </SettingsSection>

            {/* ── Privacy ── */}
            <SettingsSection icon={Shield} title="Privacy & Data">
              <div className="space-y-3">
                <ToggleRow
                  label="Share degree progress with advisor"
                  description="Dr. Torres can view your audit in real time"
                  checked={privacy.shareProgress}
                  onChange={togglePrivacy('shareProgress')}
                />
                <ToggleRow
                  label="Share GPA with scholarship office"
                  description="Required for some merit awards"
                  checked={privacy.shareGPA}
                  onChange={togglePrivacy('shareGPA')}
                />
                <ToggleRow
                  label="Anonymous usage analytics"
                  description="Help improve TigerSync for all students"
                  checked={privacy.analyticsOpt}
                  onChange={togglePrivacy('analyticsOpt')}
                />
                <ToggleRow
                  label="Allow data use for university research"
                  description="De-identified academic data only"
                  checked={privacy.researchUse}
                  onChange={togglePrivacy('researchUse')}
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="justify-start gap-2 text-xs">
                  <Shield size={13} />
                  Download my data
                </Button>
                <Button variant="ghost" size="sm" className="justify-start gap-2 text-xs text-ts-red hover:text-ts-red hover:bg-[rgba(239,68,68,0.08)]">
                  Delete account
                </Button>
              </div>
            </SettingsSection>

            {/* ── Integrations ── */}
            <SettingsSection icon={Link} title="Integrations" badge={{ variant: 'secondary', label: `${Object.values(integrations).filter(Boolean).length} connected` }}>
              <div className="space-y-3">
                <IntegrationCard
                  icon={Globe}
                  name="Google Calendar"
                  description="Sync classes, deadlines, and advising appointments"
                  connected={integrations.google}
                  onToggle={toggleInteg('google')}
                />
                <IntegrationCard
                  icon={Apple}
                  name="Apple Calendar"
                  description="Sync your academic schedule to iCal"
                  connected={integrations.apple}
                  onToggle={toggleInteg('apple')}
                />
                <IntegrationCard
                  icon={BookOpen}
                  name="Canvas LMS"
                  description="Pull grades and assignments from Canvas automatically"
                  connected={integrations.canvas}
                  onToggle={toggleInteg('canvas')}
                />
              </div>
            </SettingsSection>

            {/* ── Appearance ── */}
            <SettingsSection icon={Palette} title="Appearance">
              <p className="text-xs font-semibold text-ts-muted uppercase tracking-wider mb-1">Theme</p>
              <div className="flex gap-3">
                {[
                  { id: 'dark', label: 'Dark', preview: '#0A0A0B' },
                  { id: 'deeper', label: 'Midnight', preview: '#07070A' },
                ].map(({ id, label, preview }) => (
                  <button
                    key={id}
                    className={cn(
                      'flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors',
                      id === 'dark' ? 'border-ts-orange' : 'border-ts-border hover:border-ts-border-el'
                    )}
                  >
                    <div
                      className="w-16 h-10 rounded-lg border border-ts-border-el"
                      style={{ background: preview }}
                    />
                    <span className="text-xs font-medium text-ts-secondary">{label}</span>
                    {id === 'dark' && <Badge variant="default" className="text-[10px]">Active</Badge>}
                  </button>
                ))}
              </div>

              <Separator />

              <p className="text-xs font-semibold text-ts-muted uppercase tracking-wider mb-2">Accent Color</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { color: '#edab00', label: 'Gold' },
                  { color: '#60a5fa', label: 'Blue' },
                  { color: '#a78bfa', label: 'Purple' },
                  { color: '#22C55E', label: 'Green' },
                  { color: '#f472b6', label: 'Pink' },
                ].map(({ color, label }) => (
                  <button
                    key={color}
                    title={label}
                    className={cn(
                      'w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
                      color === '#edab00' ? 'border-white scale-110' : 'border-transparent'
                    )}
                    style={{ background: color }}
                  />
                ))}
              </div>

              <Separator />

              <SelectRow
                label="Font size"
                value="medium"
                onChange={() => {}}
                options={[
                  { value: 'small',  label: 'Small' },
                  { value: 'medium', label: 'Medium (default)' },
                  { value: 'large',  label: 'Large' },
                ]}
              />
            </SettingsSection>

          </div>

          {/* Save row */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-ts-border bg-ts-card">
            <p className="text-sm text-ts-secondary">
              {saved
                ? <span className="flex items-center gap-2 text-ts-green"><CheckCircle2 size={15} /> Changes saved successfully</span>
                : 'Remember to save your changes before leaving.'}
            </p>
            <Button className="gap-2" onClick={handleSave}>
              <Save size={15} />
              {saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>

        </main>
      </div>
    </div>
  )
}
