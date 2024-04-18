'use client'

import { useTransition } from 'react'

import { DiscordIcon, IconSpinner, TwitchIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import type { Platforms } from '@/lib/types'
import { signIn } from 'next-auth/react'

let platforms = {
  twitch: {
    label: 'Twitch',
    icon: TwitchIcon,
  },
  discord: {
    label: 'Discord',
    icon: DiscordIcon,
  },
}

interface Props {
  platform: Platforms
}

export function SigninButton({ platform }: Props) {
  let [pending, startTransition] = useTransition()
  let provider = platforms[platform]

  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await signIn(
            platform,
            { callbackUrl: '/signin' },
            platform === 'discord' &&
              new URLSearchParams({
                scope: ['identify', 'email', 'guilds'].join(' '),
              }),
          )
        })
      }}
    >
      {pending ? <IconSpinner /> : <provider.icon className="size-4" />}
      <span>{`Continue with ${provider.label}`}</span>
    </Button>
  )
}
