"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import type { EntityCommands } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";

import { IconSpinner } from "@/components/icons";

import { Button } from "@/ui/button";

import { deleteEntityCommand } from "@/data-layer/actions/commands";

interface Props {
  command: EntityCommands;
}

export function DeleteButton({ command }: Props) {
  let router = useRouter();
  let [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      size="icon"
      className="size-8"
      onClick={(event) => {
        event.preventDefault();
        if (isPending) return;

        if (confirm("Are you sure?")) {
          startTransition(async () => {
            let result = await deleteEntityCommand({
              platform: command.platform,
              platformEntityId: command.platform_entity_id,
              id: String(command.id),
            });

            if (!result.success) {
              toast.error(result.message);
              return;
            }

            router.refresh();
            toast.success(result.message);
          });
        }
      }}
      disabled={isPending}
    >
      {isPending ? <IconSpinner /> : <TrashIcon className="size-4" />}
    </Button>
  );
}
