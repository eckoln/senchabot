import { cn } from '@/lib/utils'

function PageHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'sticky top-0 z-20 mb-8 flex h-16 select-none flex-row items-center border-b bg-background px-6',
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h1'>) {
  return <h1 className={cn('font-semibold', className)} {...props} />
}

export { PageHeader, PageHeaderTitle }
