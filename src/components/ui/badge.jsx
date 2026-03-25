import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default:     'bg-[rgba(237,171,0,0.09)] text-ts-orange',
        success:     'bg-[rgba(34,197,94,0.12)] text-ts-green',
        destructive: 'bg-[rgba(239,68,68,0.12)] text-ts-red',
        secondary:   'bg-ts-surface text-ts-secondary',
        outline:     'border border-ts-border text-ts-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
))
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
