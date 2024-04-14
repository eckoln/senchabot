import { Pencil2Icon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import type { EntityCommands } from "@/lib/types";

import { UpdateForm } from "./update-form";

interface Props {
  command: EntityCommands;
}

export function UpdateButton({ command }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="size-8">
          <Pencil2Icon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Command</DialogTitle>
          <div className="py-4">
            <UpdateForm command={command} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
