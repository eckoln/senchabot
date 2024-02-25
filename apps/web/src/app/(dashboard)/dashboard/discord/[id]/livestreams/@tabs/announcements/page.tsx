import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import { Switch } from "@/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

export default function Page() {
  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="flex h-9 items-center justify-between">
        <p className="text-sm text-muted-foreground">{4} items found.</p>
        <CreateButton />
      </div>
      <div className="relative w-full overflow-auto rounded-md border bg-card">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Status</TableHead>
              <TableHead>Streamer Name</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Last Sent</TableHead>
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center">
                    <Switch defaultChecked={true} />
                  </div>
                </TableCell>
                <TableCell>streamer-{index + 1}</TableCell>
                <TableCell>
                  <p className="truncate">channel-{index + 1}</p>
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en").format(new Date())}
                </TableCell>
                <TableCell className="text-end">
                  <DeleteButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DeleteButton() {
  return (
    <Button variant="destructive" size="icon" className="size-8">
      <TrashIcon className="size-4" />
    </Button>
  );
}

function CreateButton() {
  return (
    <Button>
      <PlusIcon className="size-4" />
      <span>Add New Streamer</span>
    </Button>
  );
}
