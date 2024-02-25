import { TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
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
        <p className="text-sm text-muted-foreground">{3} items found.</p>
        <CreateButton />
      </div>
      <div className="relative w-full overflow-auto rounded-md border bg-card">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>Channel</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>channel-{index + 1}</TableCell>
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
    <form className="flex flex-row space-x-2">
      <Select>
        <SelectTrigger className="w-full min-w-48">
          <SelectValue placeholder="Select Channel" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <SelectItem value={`channel-${index + 4}`} key={index}>
              channel-{index + 4}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" variant="default">
        Add
      </Button>
    </form>
  );
}
