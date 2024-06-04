import { type NextRequest, NextResponse } from 'next/server'

import { isAuthenticated } from '@/lib/hooks/isAuthenticated'

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl

  const isLoggedIn = await isAuthenticated(request)
  const isOnSignInPage = nextUrl.pathname.startsWith('/signin')
  const isOnDashboardPage = nextUrl.pathname.startsWith('/dashboard')

  if (isLoggedIn) {
    if (isOnSignInPage) {
      if (nextUrl.searchParams.get('error')) {
        return NextResponse.next()
      }
      return Response.redirect(new URL('/dashboard', request.url))
    }
  } else {
    if (isOnDashboardPage) {
      return Response.redirect(new URL('/signin', request.url))
    }
  }
}

export const config = {
  matcher: ['/signin', '/dashboard/:path*'],
}
