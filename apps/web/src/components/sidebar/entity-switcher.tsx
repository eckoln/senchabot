"use client";

import { useMemo } from "react";

import {
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

import { GetUserEntities } from "@/types";

import { DiscordIcon, TwitchIcon } from "@/components/icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

interface Props {
  entities: GetUserEntities[];
}

export function EntitySwitcher({ entities }: Props) {
  let currentPlatform = useSelectedLayoutSegment();
  let params = useParams<{ id: string }>();
  let router = useRouter();

  let currentEntity = useMemo(() => {
    if (currentPlatform !== "twitch" && currentPlatform !== "discord") {
      return undefined;
    }
    return params.id;
  }, [currentPlatform, params]);

  function pushHandler(value: string) {
    let foundEntity = entities.find((i) => value === i.platform_entity_id);
    if (foundEntity) {
      return router.push(`/dashboard/${foundEntity.platform}/${value}`);
    }
  }

  return (
    <Select
      defaultValue={currentEntity}
      onValueChange={pushHandler}
      key={currentEntity}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a Entity" />
      </SelectTrigger>
      <SelectContent>
        {entities?.map((item, index) => (
          <SelectItem value={item.platform_entity_id} key={index}>
            <div className="flex items-center space-x-2">
              {item.platform === "twitch" ? (
                <TwitchIcon className="size-4" />
              ) : (
                <DiscordIcon className="size-4" />
              )}
              <span className="max-w-48 truncate">{item.entity_name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
