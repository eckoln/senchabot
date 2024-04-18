import { cookies } from 'next/headers'

import { env } from '@/env'

let BASE_URL = 'https://api.senchabot.dev/v1'

function getUserAccessToken() {
  const cookieStore = cookies()
  const token = cookieStore.get('authjs.session-token')
  if (!token) {
    return ''
  }
  return token.value
}

export async function fetcher<JSON = any>(
  endpoint: RequestInfo,
  options?: RequestInit,
): Promise<JSON> {
  const res = await fetch(BASE_URL + endpoint, {
    headers: {
      ...options?.headers,
      Authorization: env.API_AUTHORIZATION_PREFIX + ' ' + getUserAccessToken(),
      'Content-Type': 'application/json',
    },
    ...options,
    cache: 'no-store',
  })

  if (!res.ok) {
    const json = await res.json()
    if (json.message) {
      const error = new Error(json.message) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}
