"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

import { IconSpinner } from "@/components/icons";

import { Button } from "@/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

import { createEventChannel } from "@/data-layer/actions/eventChannels";

import type { GuildChannels } from "@/lib/types";

interface Props {
  guildChannels: GuildChannels[];
}

export function CreateForm({ guildChannels }: Props) {
  let router = useRouter();
  let params = useParams<{ id: string }>();

  let [result, dispatch] = useFormState(createEventChannel, undefined);

  useEffect(() => {
    if (result) {
      if (!result.success) {
        toast.error(result.message);
      } else {
        router.refresh();
        toast.success(result.message);
      }
    }
  }, [result, router]);

  return (
    <form
      className="flex flex-row space-x-2"
      action={(formData) => {
        formData.append("platformEntityId", params.id);
        dispatch(formData);
      }}
    >
      <Select name="guild_channel_id">
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Channel" />
        </SelectTrigger>
        <SelectContent>
          {guildChannels?.map((item) => (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  let { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <IconSpinner /> : "Add"}
    </Button>
  );
}
