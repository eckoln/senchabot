"use client";

import {
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

import { DiscordIcon, TwitchIcon } from "@/components/icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

interface Props {
  entities: {
    id: string;
    label: string;
    platform: string;
  }[];
}

function getCurrentEntity() {
  let platform = useSelectedLayoutSegment();
  let params = useParams<{ id: string }>();

  if (platform === "twitch" || platform === "discord") {
    return undefined;
  }

  return params.id;
}

export function EntitySwitcherClient({ entities }: Props) {
  let router = useRouter();
  let currentEntity = getCurrentEntity();

  function pushHandler(value: string) {
    let foundEntity = entities.find((i) => value === i.id);
    if (foundEntity) {
      return router.push(`/dashboard/${foundEntity.platform}/${value}`);
    }
  }

  return (
    <Select
      defaultValue={currentEntity}
      key={currentEntity}
      onValueChange={pushHandler}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a Entity" />
      </SelectTrigger>
      <SelectContent>
        {entities?.map((item, index) => (
          <SelectItem value={item.id} key={index}>
            <div className="flex items-center space-x-2">
              {item.platform.toLowerCase() === "twitch" ? (
                <TwitchIcon className="size-4" />
              ) : (
                <DiscordIcon className="size-4" />
              )}
              <span>{item.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
