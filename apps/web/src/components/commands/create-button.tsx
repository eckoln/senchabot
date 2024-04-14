"use client";

import { useState } from "react";

import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import type { Platforms } from "@/lib/types";

import { CreateForm } from "./create-form";

interface Props {
  platform: Platforms;
}

export function CreateButton({ platform }: Props) {
  let [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          <span>Add New Command</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Command</DialogTitle>
          <div className="py-4">
            <CreateForm
              platform={platform}
              afterSubmission={() => setOpen(false)}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
