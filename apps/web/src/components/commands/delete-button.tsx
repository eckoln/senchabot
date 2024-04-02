"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";

import type { EntityCommands } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";

import { deleteEntityCommand } from "@/data-layer/actions/commands";

interface Props {
  command: EntityCommands;
}

export function DeleteButton({ command }: Props) {
  let [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (isPending) return;

    startTransition(async () => {
      let res = await deleteEntityCommand({
        platform: command.platform,
        platformEntityId: command.platform_entity_id,
        id: command.id,
      });

      if (res.data?.error) {
        toast.error(res.data.error);
        return;
      }

      toast.success("Command successfully deleted.");
    });
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      className="size-8"
      onClick={handleSubmit}
      disabled={isPending}
    >
      <TrashIcon className="size-4" />
    </Button>
  );
}
