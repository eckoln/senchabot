import Link, { type LinkProps } from 'next/link'

import { cn } from '@/lib/utils'

function Nav({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
  return <nav className={cn('flex flex-col space-y-2', className)} {...props} />
}

function NavItem({
  className,
  isActive = false,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & LinkProps & { isActive?: boolean }) {
  return (
    <Link
      className={cn(
        'inline-flex h-9 w-full items-center space-x-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        className,
        isActive && 'bg-accent',
      )}
      {...props}
    />
  )
}

export { Nav, NavItem }
