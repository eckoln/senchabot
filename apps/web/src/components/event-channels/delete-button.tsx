'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { IconSpinner } from '@/components/icons'
import { deleteEventChannel } from '@/data-layer/actions/eventChannels'
import type { EventChannels } from '@/lib/types'
import { Button } from '@/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

interface Props {
  channel: EventChannels
}

export function DeleteButton({ channel }: Props) {
  let router = useRouter()
  let [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="destructive"
      size="icon"
      className="size-8"
      onClick={event => {
        event.preventDefault()
        if (isPending) return

        if (confirm('Are you sure?')) {
          startTransition(async () => {
            let result = await deleteEventChannel({
              platformEntityId: channel.server_id,
              id: channel.id,
            })

            if (!result.success) {
              toast.error(result.message)
              return
            }

            router.refresh()
            toast.success(result.message)
          })
        }
      }}
      disabled={isPending}
    >
      {isPending ? <IconSpinner /> : <TrashIcon className="size-4" />}
    </Button>
  )
}
