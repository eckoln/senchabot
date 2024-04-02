import type { UserEntities } from "@/types";

import { fetcher } from "./utils";

/*
 * getUserEntities
 */
export async function getUserEntities(): Promise<UserEntities[]> {
  return fetcher("/platforms");
}
