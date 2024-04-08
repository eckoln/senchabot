"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";

import type { EventChannels } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";

import { deleteEventChannel } from "@/data-layer/actions/eventChannels";

interface Props {
  channel: EventChannels;
}

export function DeleteButton({ channel }: Props) {
  let [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (isPending) return;

    startTransition(async () => {
      let { data } = await deleteEventChannel({
        platformEntityId: channel.server_id,
        id: channel.id,
      });

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Success.");
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
