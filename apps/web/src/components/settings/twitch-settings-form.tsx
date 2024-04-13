"use client";

import { useCallback, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

import type { EntitySettings } from "@/types";

import { IconSpinner } from "@/components/icons";

import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";

import { updateTwitchSettings } from "@/data-layer/actions/settings";

interface Props {
  defaultSettings: EntitySettings[];
}

export function TwitchSettingsForm({ defaultSettings }: Props) {
  let router = useRouter();
  let params = useParams<{ id: string }>();

  let [result, dispatch] = useFormState(updateTwitchSettings, undefined);

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
        formData.append("platform", "twitch");
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
