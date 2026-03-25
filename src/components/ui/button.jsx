import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:     'orange-gradient text-white hover:opacity-90',
        outline:     'border border-ts-border bg-transparent text-ts-secondary hover:bg-ts-surface hover:text-ts-primary',
        ghost:       'text-ts-secondary hover:bg-ts-surface hover:text-ts-primary',
        destructive: 'bg-ts-red text-white hover:opacity-90',
        success:     'bg-[rgba(34,197,94,0.12)] text-ts-green hover:bg-[rgba(34,197,94,0.18)]',
      },
      size: {
        sm:   'h-8 px-3 text-xs',
        md:   'h-9 px-4',
        lg:   'h-10 px-5',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
