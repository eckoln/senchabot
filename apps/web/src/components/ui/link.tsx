import * as React from 'react'

import NextLink, { type LinkProps as NextLinkProps } from 'next/link'

import { cn } from '@/lib/utils'

export function Link({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & NextLinkProps) {
  return (
    <NextLink
      className={cn(
        'underline underline-offset-4 hover:text-primary',
        className,
      )}
      {...props}
    />
  )
}
