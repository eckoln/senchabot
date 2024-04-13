"use client";

import { useCallback, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

import type { EntitySettings, GuildChannels } from "@/types";

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
import { Switch } from "@/ui/switch";

import { updateDiscordSettings } from "@/data-layer/actions/settings";

interface Props {
  defaultSettings: EntitySettings[];
  guildChannels: GuildChannels[];
}

export function DiscordSettingsForm({ defaultSettings, guildChannels }: Props) {
  let router = useRouter();
  let params = useParams<{ id: string }>();

  let [result, dispatch] = useFormState(updateDiscordSettings, undefined);

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

  let init = useCallback(
    (key: string) => {
      return defaultSettings.find((item) => item.key === key)?.value;
    },
    [defaultSettings],
  );

  return (
    <form
      className="space-y-8 divide-y divide-border *:pt-6 first:*:pt-0 last:*:border-none last:*:pt-0"
      action={(formData) => {
        formData.append("platform", "discord");
        formData.append("platformEntityId", params.id);
        dispatch(formData);
      }}
    >
      <div className="grid grid-cols-2 items-center">
        <div className="space-y-0.5">
          <Label htmlFor="bot_activity_enabled">Activity Logs</Label>
          <p className="text-sm text-muted-foreground">
            Keep logs about to your channel activity.
          </p>
        </div>
        <div className="flex justify-end">
          <Switch
            id="bot_activity_enabled"
            name="bot_activity_enabled"
            defaultChecked={init("bot_activity_enabled") === "true"}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <div className="space-y-0.5">
          <Label htmlFor="mods_manage_cmds_enabled">Allow Moderators</Label>
          <p className="text-sm text-muted-foreground">
            Your moderators manage bot commands.
          </p>
        </div>
        <div className="flex justify-end">
          <Switch
            id="mods_manage_cmds_enabled"
            name="mods_manage_cmds_enabled"
            defaultChecked={init("mods_manage_cmds_enabled") === "true"}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <div className="space-y-0.5">
          <Label htmlFor="stream_anno_default_channel">
            Announcement Default Channel
          </Label>
          <p className="text-sm text-muted-foreground"></p>
        </div>
        <div className="flex justify-end">
          <Select
            name="stream_anno_default_channel"
            defaultValue={init("stream_anno_default_channel")}
          >
            <SelectTrigger id="stream_anno_default_channel">
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
      </div>
      <div className="grid grid-cols-2 items-center">
        <div className="space-y-0.5">
          <Label htmlFor="stream_anno_default_content">
            Announcement Default Content
          </Label>
          <p className="text-sm text-muted-foreground"></p>
        </div>
        <div className="flex justify-end">
          <Input
            type="string"
            id="stream_anno_default_content"
            name="stream_anno_default_content"
            defaultValue={init("stream_anno_default_content")}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <div className="space-y-0.5">
          <Label htmlFor="stream_anno_cooldown">Announcement Cooldown</Label>
          <p className="text-sm text-muted-foreground"></p>
        </div>
        <div className="flex justify-end">
          <Input
            type="string"
            id="stream_anno_cooldown"
            name="stream_anno_cooldown"
            defaultValue={init("stream_anno_cooldown")}
            required
          />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  let { pending } = useFormStatus();

  return (
    <div>
      <Button type="submit" disabled={pending}>
        {pending && <IconSpinner />}
        <span>Save Changes</span>
      </Button>
    </div>
  );
}
