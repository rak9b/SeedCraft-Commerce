import * as React from 'react'
import { cn } from '../lib/utils'

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(
        'py-12 sm:py-16 lg:py-20',
        className
      )}
      {...props}
    />
  )
)
Section.displayName = 'Section'

export { Section }