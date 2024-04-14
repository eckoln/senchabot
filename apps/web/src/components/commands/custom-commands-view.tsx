import { CreateButton } from './create-button'
import { DeleteButton } from './delete-button'
import { UpdateButton } from './update-button'
import type { EntityCommands, Platforms } from '@/lib/types'
import { Button } from '@/ui/button'
import { Switch } from '@/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'
import { Share1Icon } from '@radix-ui/react-icons'

interface Props {
  platform: Platforms
  commands: EntityCommands[]
}

export function CustomCommandsView({ platform, commands }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex h-9 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {commands?.length} items found.
        </p>
        <div className="flex flex-row space-x-3">
          <ShareButton />
          <CreateButton platform={platform} />
        </div>
      </div>
      <div className="relative w-full overflow-auto rounded-md border bg-card">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Content</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands?.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Switch defaultChecked={item.status} />
                  </div>
                </TableCell>
                <TableCell>!{item.name}</TableCell>
                <TableCell>
                  <p className="truncate" title={item.content}>
                    {item.content}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-1.5">
                    <UpdateButton command={item} />
                    <DeleteButton command={item} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function ShareButton() {
  return (
    <Button variant="secondary">
      <Share1Icon className="size-4" />
      <span>Share</span>
    </Button>
  )
}
