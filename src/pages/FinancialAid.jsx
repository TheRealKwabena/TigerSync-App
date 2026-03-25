import {
  DollarSign,
  CreditCard,
  Home,
  Award,
  CheckCircle2,
  ExternalLink,
  CalendarDays,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'

const aidStats = [
  {
    icon: DollarSign,
    label: 'Total Aid Awarded',
    value: '$12,548',
    badge: 'Verified',
    badgeVariant: 'success',
  },
  {
    icon: CreditCard,
    label: 'Tuition Balance',
    value: '$245',
    badge: 'Overdue',
    badgeVariant: 'destructive',
    iconColor: 'text-ts-red',
  },
  {
    icon: Home,
    label: 'Room & Board',
    value: '$4,200',
    badge: 'Paid',
    badgeVariant: 'success',
  },
  {
    icon: Award,
    label: 'Scholarships Applied',
    value: '3',
    badge: '1 Pending',
    badgeVariant: 'default',
  },
]

const scholarships = [
  {
    name: 'Thurgood Marshall College Fund',
    amount: '$5,000',
    desc: 'For students at HBCUs maintaining a 3.0+ GPA with demonstrated leadership.',
    qualified: true,
    qualLabel: 'Qualified — 3.67 GPA',
  },
  {
    name: 'UNCF Scholarships',
    amount: '$2,500',
    desc: 'Supporting students with financial need at historically Black colleges and universities.',
    qualified: true,
    qualLabel: 'Qualified — 72 Credits',
  },
  {
    name: 'National STEM Scholarship',
    amount: '$3,000',
    desc: 'For juniors and seniors pursuing degrees in science, technology, engineering, or mathematics.',
    qualified: false,
    qualLabel: 'Review Needed',
  },
  {
    name: 'Louisiana State Merit Award',
    amount: '$1,500',
    desc: 'Merit-based award for Louisiana residents with outstanding academic achievement.',
    qualified: true,
    qualLabel: 'Qualified — LA Resident',
  },
]

const balanceItems = [
  { label: 'Tuition',              amount: '$8,500', status: 'Paid',    statusStyle: 'text-ts-green' },
  { label: 'Room & Board',         amount: '$4,200', status: 'Paid',    statusStyle: 'text-ts-green' },
  { label: 'Student Fees',         amount: '$1,850', status: 'Paid',    statusStyle: 'text-ts-green' },
  { label: 'Lab & Technology Fee', amount: '$245',   status: 'Overdue', statusStyle: 'text-ts-red'   },
  { label: 'Meal Plan',            amount: '$2,100', status: 'Pending', statusStyle: 'text-ts-orange' },
]

export default function FinancialAid() {
  return (
    <div className="flex h-screen overflow-hidden bg-ts-page">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Financial Aid" />

        <main className="flex-1 overflow-y-auto p-8 space-y-6">

          {/* Welcome Row */}
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-3xl text-ts-primary">
              Financial Aid Overview
            </h2>
            <Badge variant="success">Aid Package Active</Badge>
            <Badge variant="default">2025–2026 Academic Year</Badge>
          </div>

          {/* Aid Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {aidStats.map(({ icon: Icon, label, value, badge, badgeVariant, iconColor }) => (
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

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Available Scholarships */}
            <Card>
              <CardHeader className="p-5">
                <CardTitle>Available Scholarships</CardTitle>
                <Badge variant="default">You Qualify for 4</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                <ul className="space-y-4">
                  {scholarships.map(({ name, amount, desc, qualified, qualLabel }) => (
                    <li key={name} className="pb-4 border-b border-ts-border last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-ts-primary">{name}</p>
                          <p className="text-xs text-ts-tertiary mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                        <span className="font-serif text-lg text-ts-primary shrink-0">{amount}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant={qualified ? 'success' : 'default'}>
                          {qualified && <CheckCircle2 size={11} />}
                          {qualLabel}
                        </Badge>
                        <Button size="sm" className="gap-1.5 text-xs">
                          Apply Now
                          <ExternalLink size={11} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Account Balance */}
            <Card>
              <CardHeader className="p-5">
                <CardTitle>Account Balance</CardTitle>
                <Badge variant="destructive">$245 Due</Badge>
              </CardHeader>
              <CardContent className="p-5 pt-4">
                <ul className="space-y-3 mb-4">
                  {balanceItems.map(({ label, amount, status, statusStyle }) => (
                    <li key={label} className="flex items-center justify-between">
                      <span className="text-sm text-ts-secondary">{label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-ts-primary font-medium">{amount}</span>
                        <span className={`text-xs font-semibold w-16 text-right ${statusStyle}`}>{status}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator className="my-4" />

                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-lg text-ts-primary">Total Due</span>
                  <span className="font-serif text-2xl text-ts-red">$245.00</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <CreditCard size={15} />
                    Pay Balance
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <CalendarDays size={15} />
                    Set Up Payment Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  )
}
