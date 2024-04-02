import { createSafeActionClient } from "next-safe-action";

import { env } from "@/env";

let BASE_URL = "https://api.senchabot.dev/v1/me";

function getUserAccessToken() {
  // transform to cookie call
  return env.TEST_BEARER_TOKEN;
}

export async function fetcher(endpoint: string, options?: RequestInit) {
  let res = await fetch(BASE_URL + endpoint, {
    headers: {
      Authorization: getUserAccessToken(),
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error while fetching. Status: ${res.status}`);
  }

  return res.json();
}

export const action = createSafeActionClient();
