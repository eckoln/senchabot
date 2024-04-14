'use client'

import { useTransition } from 'react'

import { useRouter } from 'next/navigation'

import { IconSpinner } from '@/components/icons'
import { deleteEntityCommand } from '@/data-layer/actions/commands'
import type { EntityCommands } from '@/lib/types'
import { Button } from '@/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

interface Props {
  command: EntityCommands
}

export function DeleteButton({ command }: Props) {
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
            let result = await deleteEntityCommand({
              platform: command.platform,
              platformEntityId: command.platform_entity_id,
              id: String(command.id),
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
