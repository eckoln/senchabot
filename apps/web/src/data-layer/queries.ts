import type { EntityCommands, Platforms, UserEntities } from "@/types";

import { fetcher } from "./utils";

/*
 * getUserEntities
 */
export async function getUserEntities(): Promise<UserEntities[]> {
  return fetcher("/platforms");
}

/*
 * getEntityCommands
 */
export async function getEntityCommands(
  platform: Platforms,
  type: "custom" | "global",
  platformEntityId: string,
): Promise<EntityCommands[]> {
  let params = new URLSearchParams({
    type,
    platform,
    platformEntityId,
    noCache: "true",
  });
  return fetcher("/commands?" + params, {
    next: {
      tags: [`getEntityCommands-${platformEntityId}-${type}`],
    },
  });
}
