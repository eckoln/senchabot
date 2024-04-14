import { DiscordIcon, TwitchIcon } from '@/components/icons'
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons'

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {[
        { label: 'twitch-1', provider: 'twitch' },
        { label: 'discord-1', provider: 'discord' },
        { label: 'discord-2', provider: 'discord' },
        { label: 'discord-3', provider: 'discord' },
      ].map((item, index) => (
        <div
          className="group flex select-none items-center justify-between space-x-6 rounded-md border bg-card px-6 py-4"
          key={index}
        >
          <div className="flex flex-row items-center space-x-6">
            {item.provider === 'twitch' ? (
              <TwitchIcon className="size-9 text-muted" />
            ) : (
              <DiscordIcon className="size-9 text-muted" />
            )}
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-sm text-muted-foreground">
                Linked at {new Intl.DateTimeFormat('en').format(new Date())}
              </p>
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
