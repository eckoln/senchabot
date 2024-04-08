"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";

import type { Announcements } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/ui/button";

import { deleteAnnouncement } from "@/data-layer/actions/announcements";

interface Props {
  anno: Announcements;
}

export function DeleteButton({ anno }: Props) {
  let [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (isPending) return;

    startTransition(async () => {
      let { data } = await deleteAnnouncement({
        platformEntityId: anno.anno_server_id,
        id: anno.id,
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
