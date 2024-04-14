'use client'

import { useState } from 'react'

import { CreateForm } from './create-form'
import type { GuildChannels } from '@/lib/types'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { PlusIcon } from '@radix-ui/react-icons'

interface Props {
  guildChannels: GuildChannels[]
}

export function CreateButton({ guildChannels }: Props) {
  let [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          <span>Add New Announcement</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Announcement</DialogTitle>
          <div className="py-4">
            <CreateForm
              guildChannels={guildChannels}
              afterSubmission={() => setOpen(false)}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
