'use client'

import { useMemo } from 'react'

import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
} from 'next/navigation'

import { Nav, NavItem } from './nav'
import { DiscordIcon, TwitchIcon } from '@/components/icons'
import { UserEntities } from '@/lib/types'
import {
  GearIcon,
  HomeIcon,
  ListBulletIcon,
  SpeakerModerateIcon,
} from '@radix-ui/react-icons'

function getNavItems(platform: string | null, entityId: string) {
  if (!platform || (platform !== 'twitch' && platform !== 'discord')) {
    return null
  }

  const BASE_ROUTE = `/dashboard/${platform}/${entityId}`
  const items = [
    {
      label: 'Overview',
      path: `${BASE_ROUTE}`,
      icon: HomeIcon,
    },
    {
      label: 'Commands',
      path: `${BASE_ROUTE}/commands/custom`,
      icon: ListBulletIcon,
    },
    {
      label: 'Settings',
      path: `${BASE_ROUTE}/settings`,
      icon: GearIcon,
    },
  ]

  if (platform === 'discord') {
    items.splice(2, 0, {
      label: 'Live Streams',
      path: `${BASE_ROUTE}/livestreams`,
      icon: SpeakerModerateIcon,
    })
  }

  return items
}

interface Props {
  entities: UserEntities[]
}

export function PlatformNav({ entities }: Props) {
  let currentPlatform = useSelectedLayoutSegment()
  let params = useParams<{ id: string }>()
  let pathname = usePathname()

  let navItems = useMemo(
    () => getNavItems(currentPlatform, params.id),
    [currentPlatform, params],
  )

  let currentEntityName = useMemo(() => {
    if (Boolean(entities.length)) {
      return entities.find(i => i.platform_entity_id === params.id)?.entity_name
    }
  }, [entities, params])

  if (!navItems) {
    return null
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex select-none flex-row items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
        {currentPlatform === 'twitch' ? (
          <TwitchIcon className="size-4 shrink-0" />
        ) : (
          <DiscordIcon className="size-4 shrink-0" />
        )}
        <span>{currentEntityName}</span>
      </div>
      <Nav>
        {navItems.map(item => (
          <NavItem
            href={item.path}
            isActive={item.path === pathname}
            key={item.path}
          >
            <item.icon className="size-4" />
            <span>{item.label}</span>
          </NavItem>
        ))}
      </Nav>
    </div>
  )
}
