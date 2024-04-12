"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import type { GuildChannels } from "@/types";

import { IconSpinner } from "@/components/icons";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

import { createAnnouncement } from "@/data-layer/actions/announcements";

interface Props {
  guildChannels: GuildChannels[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateForm({ guildChannels, setOpen }: Props) {
  let router = useRouter();
  let params = useParams<{ id: string }>();

  let [result, dispatch] = useFormState(createAnnouncement, undefined);

  useEffect(() => {
    if (result) {
      if (!result.success) {
        toast.error(result.message);
      } else {
        setOpen(false);
        router.refresh();
        toast.success(result.message);
      }
    }
  }, [result, router]);

  return (
    <form
      className="space-y-8"
      action={(formData) => {
        formData.append("platformEntityId", params.id);
        dispatch(formData);
      }}
    >
      <div className="space-y-1">
        <Label htmlFor="twitch_username">Twitch Username</Label>
        <Input
          type="text"
          id="twitch_username"
          name="twitch_username"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="guild_channel_id">Channel</Label>
        <Select name="guild_channel_id" required>
          <SelectTrigger id="guild_channel_id">
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
      </div>
      <div className="space-y-1">
        <Label htmlFor="announcement_content">Content</Label>
        <Input
          type="text"
          id="announcement_content"
          name="announcement_content"
        />
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  let { pending } = useFormStatus();

  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={pending}>
        {pending ? <IconSpinner /> : "Submit"}
      </Button>
    </div>
  );
}
