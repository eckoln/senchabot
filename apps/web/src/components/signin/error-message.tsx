'use client'

import { useMemo } from 'react'

import { useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

type Error = 'OAuthAccountNotLinked'

export function AuthErrorMessage() {
  const search = useSearchParams()
  const error = search.get('error') as Error

  let errorMessage = useMemo(() => {
    if (error) {
      switch (error) {
        case 'OAuthAccountNotLinked':
          return 'The account is already associated with another user.'
        default:
          return 'Something went wrong!'
      }
    }
  }, [error])

  if (!errorMessage) {
    return null
  }

  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  )
}
