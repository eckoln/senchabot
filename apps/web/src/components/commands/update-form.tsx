'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { IconSpinner } from '@/components/icons'
import { updateEntityCommand } from '@/data-layer/actions/commands'
import type { EntityCommands } from '@/lib/types'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Link } from '@/ui/link'
import { Switch } from '@/ui/switch'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

interface Props {
  command: EntityCommands
}

export function UpdateForm({ command }: Props) {
  let router = useRouter()

  let [result, dispatch] = useFormState(updateEntityCommand, undefined)

  useEffect(() => {
    if (result) {
      if (!result.success) {
        toast.error(result.message)
      } else {
        router.refresh()
        toast.success(result.message)
      }
    }
  }, [result, router])

  return (
    <form
      className="space-y-8"
      action={formData => {
        formData.append('platform', command.platform)
        formData.append('platformEntityId', command.platform_entity_id)
        formData.append('id', String(command.id))
        dispatch(formData)
      }}
    >
      <div className="space-y-1">
        <Label htmlFor="command_name">Name</Label>
        <Input
          type="text"
          id="command_name"
          name="command_name"
          defaultValue={command.name}
          disabled
        />
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="command_content">Content</Label>
          <Input
            type="text"
            id="command_content"
            name="command_content"
            placeholder=""
            defaultValue={command.content}
            required
          />
        </div>
        <p className="text-xs">
          See our{' '}
          <Link
            href="https://docs.senchabot.app/twitch-bot/variables"
            target="_blank"
            rel="noreferrer"
          >
            docs page
          </Link>{' '}
          for more variables.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="status" name="status" defaultChecked={command.status} />
        <Label htmlFor="status">Enabled</Label>
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  let { pending } = useFormStatus()

  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={pending}>
        {pending ? <IconSpinner /> : 'Save'}
      </Button>
    </div>
  )
}
