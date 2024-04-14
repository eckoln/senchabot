import type { EntityCommands } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'

interface Props {
  commands: EntityCommands[]
}

export default async function GlobalCommandsView({ commands }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex h-9 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {commands.length} items found.
        </p>
      </div>
      {Boolean(commands.length) ? (
        <div className="relative w-full overflow-auto rounded-md border bg-card">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Content</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commands?.map(item => (
                <TableRow key={item.id}>
                  <TableCell>!{item.name}</TableCell>
                  <TableCell>
                    <p className="truncate" title={item.content}>
                      {item.content}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center">
          <p>You not have any command.</p>
        </div>
      )}
    </div>
  )
}
