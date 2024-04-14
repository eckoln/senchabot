'use client'

import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { IconSpinner } from '@/components/icons'
import { createEntityCommand } from '@/data-layer/actions/commands'
import type { Platforms } from '@/lib/types'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Link } from '@/ui/link'
import { Switch } from '@/ui/switch'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

interface Props {
  platform: Platforms
  afterSubmission: () => void
}

export function CreateForm({ platform, afterSubmission }: Props) {
  let router = useRouter()
  let params = useParams<{ id: string }>()

  let [result, dispatch] = useFormState(createEntityCommand, undefined)

  useEffect(() => {
    if (result) {
      if (!result.success) {
        toast.error(result.message)
      } else {
        afterSubmission()
        router.refresh()
        toast.success(result.message)
      }
    }
  }, [result, router, afterSubmission])

  return (
    <form
      className="space-y-8"
      action={formData => {
        formData.append('platform', platform)
        formData.append('platformEntityId', params.id)
        dispatch(formData)
      }}
    >
      <div className="space-y-1">
        <Label htmlFor="command_name">Name</Label>
        <Input
          type="text"
          id="command_name"
          name="command_name"
          placeholder="lurk"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="command_content">Content</Label>
          <Input
            type="text"
            id="command_content"
            name="command_content"
            placeholder="thx @{username}"
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
        <Switch id="status" name="status" defaultChecked />
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
        {pending ? <IconSpinner /> : 'Submit'}
      </Button>
    </div>
  )
}
