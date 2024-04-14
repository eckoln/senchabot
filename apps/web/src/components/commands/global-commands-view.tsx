import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

import type { EntityCommands } from "@/lib/types";

interface Props {
  commands: EntityCommands[];
}

export default async function GlobalCommandsView({ commands }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex h-9 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {commands?.length} items found.
        </p>
      </div>
      <div className="relative w-full overflow-auto rounded-md border bg-card">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands?.map((item, index) => (
              <TableRow key={index}>
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
    </div>
  );
}
