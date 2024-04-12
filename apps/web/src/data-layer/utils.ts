import { createSafeActionClient } from "next-safe-action";

import { env } from "@/env";

let BASE_URL = "https://api.senchabot.dev/v1/me";

function getUserAccessToken() {
  // transform to cookie call
  return env.TEST_BEARER_TOKEN;
}

export async function fetcher<JSON = any>(
  endpoint: RequestInfo,
  options?: RequestInit,
): Promise<JSON> {
  const res = await fetch(BASE_URL + endpoint, {
    headers: {
      ...options?.headers,
      Authorization: getUserAccessToken(),
      "Content-Type": "application/json",
    },
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    const json = await res.json();
    if (json.message) {
      const error = new Error(json.message) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export const action = createSafeActionClient();
