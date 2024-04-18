import { redirect } from 'next/navigation'

import { DiscordIcon, TwitchIcon } from '@/components/icons'
import { getUserAccounts } from '@/data-layer/queries'
import { auth } from '@/lib/auth'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'

export default async function Page() {
  let [session, accounts] = await Promise.all([auth(), getUserAccounts()])

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {accounts?.map(item => (
        <div
          className="group flex select-none items-center justify-between space-x-6 rounded-md border bg-card px-6 py-4"
          key={item.provider_account_id}
        >
          <div className="flex flex-row items-center space-x-6">
            {item.provider === 'twitch' ? (
              <TwitchIcon className="size-9 text-muted" />
            ) : (
              <DiscordIcon className="size-9 text-muted" />
            )}
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{item.provider_account_id}</p>
            </div>
          </div>
          <button className="hidden shrink-0 items-center justify-center text-muted-foreground group-hover:inline-flex">
            <Cross1Icon className="size-4" />
          </button>
        </div>
      ))}
      <AddConnectionButton />
    </div>
  )
}

function AddConnectionButton() {
  return (
    <button className="flex select-none items-center justify-center gap-2 rounded-md border border-dashed px-6 py-4 text-sm font-medium leading-9 text-muted-foreground hover:bg-accent">
      <PlusIcon className="size-4" />
      <span>Link a Discord Server</span>
    </button>
  )
}
