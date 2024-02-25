import Link from "next/link";

import {
  Pencil2Icon,
  PlusIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

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

export default function CustomCommandsView() {
  return (
    <div className="space-y-4">
      <div className="flex h-9 items-center justify-between">
        <p className="text-sm text-muted-foreground">{5} items found.</p>
        <div className="flex flex-row space-x-3">
          <ShareButton />
          <CreateButton />
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
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center">
                    <Switch defaultChecked={true} />
                  </div>
                </TableCell>
                <TableCell>!command-{index + 1}</TableCell>
                <TableCell>
                  <p className="truncate">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-1.5">
                    <EditButton />
                    <DeleteButton />
                  </div>
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

function EditButton() {
  return (
    <Button variant="secondary" size="icon" className="size-8">
      <Pencil2Icon className="size-4" />
    </Button>
  );
}

function CreateButton() {
  return (
    <Button asChild>
      <Link href="/discord/discord-1/commands/custom/new">
        <PlusIcon className="size-4" />
        <span>Add New Command</span>
      </Link>
    </Button>
  );
}

function ShareButton() {
  return (
    <Button variant="secondary">
      <Share1Icon className="size-4" />
      <span>Share</span>
    </Button>
  );
}
