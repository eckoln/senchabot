'use server'

import { fetcher } from '@/data-layer/utils'
import type { Account } from 'next-auth'

export async function linkEntity(account: Account, userId: string) {
  return await fetcher('/platforms/link', {
    method: 'POST',
    body: JSON.stringify({
      provider: account.provider,
      provider_account_id: account.providerAccountId,
      user_id: userId,
    }),
  })
}
