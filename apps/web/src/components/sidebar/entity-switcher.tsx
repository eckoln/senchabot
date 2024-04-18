'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { DiscordIcon, TwitchIcon } from '@/components/icons'
import type { UserEntities } from '@/lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button } from '@/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { PlusIcon } from '@radix-ui/react-icons'

interface Props {
  entities: UserEntities[]
}

export function EntitySwitcher({ entities }: Props) {
  let params = useParams<{ id: string }>()

  return (
    <div className="relative flex w-full max-w-fit shrink-0 flex-col space-y-4 overflow-y-auto px-3 py-4">
      {entities?.map(item => (
        <div
          className="group flex flex-col items-center justify-center"
          data-active={params.id === item.platform_entity_id}
          key={item.platform_entity_id}
        >
          <span className="invisible absolute left-0 h-4 w-1 rounded-r-full bg-foreground transition-all group-hover:visible group-data-[active=true]:visible" />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="relative inline-flex size-9 shrink-0 items-center justify-center transition-all"
                  href={`/dashboard/${item.platform}/${item.platform_entity_id}`}
                >
                  <Avatar>
                    <AvatarImage src={item.icon_url} />
                    <AvatarFallback>
                      {item.entity_name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-background">
                    {item.platform === 'twitch' ? (
                      <TwitchIcon className="size-4" />
                    ) : (
                      <DiscordIcon className="size-4" />
                    )}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={14}>
                <span>{item.entity_name}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" asChild>
              <Link href="/dashboard/account/connections">
                <PlusIcon className="size-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={14}>
            <span>Add New Connection</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
