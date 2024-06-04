import { type NextRequest } from 'next/server'

/**
 *
 * @param request
 * @returns
 */
export async function isAuthenticated(request: NextRequest) {
  const cookies = request.cookies

  const getSecureToken = cookies.get(`__Secure-authjs.session-token`)
  const getNotSecureToken = cookies.get('authjs.session-token')
  const token = getSecureToken || getNotSecureToken

  // 1. check cookie
  if (!token) {
    return false
  }

  // 2. validate session
  const response = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
    headers: {
      cookie: request.cookies.toString(),
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    return false
  }

  const data = await response.json()

  if (!data) {
    return false
  }

  // 3. if session is validated
  return true
}
