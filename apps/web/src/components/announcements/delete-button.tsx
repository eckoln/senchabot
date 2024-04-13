"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import type { Announcements } from "@/types";
import { TrashIcon } from "@radix-ui/react-icons";

import { IconSpinner } from "@/components/icons";

import { Button } from "@/ui/button";

import { deleteAnnouncement } from "@/data-layer/actions/announcements";

interface Props {
  anno: Announcements;
}

export function DeleteButton({ anno }: Props) {
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

        startTransition(async () => {
          let result = await deleteAnnouncement({
            platformEntityId: anno.anno_server_id,
            id: anno.id,
          });

          if (!result.success) {
            toast.error(result.message);
            return;
          }

          router.refresh();
          toast.success(result.message);
        });
      }}
      disabled={isPending}
    >
      {isPending ? <IconSpinner /> : <TrashIcon className="size-4" />}
    </Button>
  );
}
