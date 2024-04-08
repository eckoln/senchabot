"use server";

import { revalidateTag } from "next/cache";

import {
  createEventChannelSchema,
  deleteEventChannelSchema,
} from "@/data-layer/schemas";
import { action, fetcher } from "@/data-layer/utils";

/*
 * createEventChannel
 */
export const createEventChannel = action(
  createEventChannelSchema,
  async ({ platformEntityId, ...values }) => {
    let params = new URLSearchParams({ platformEntityId });

    try {
      await fetcher("/livestreams/event-channels?" + params, {
        method: "POST",
        body: JSON.stringify(values),
      });

      revalidateTag(`getEventChannels-${platformEntityId}`);
    } catch (error) {
      console.log("error:createEventChannel", error);
      return { error: "Failed." };
    }
  },
);

/*
 * deleteEventChannel
 */
export const deleteEventChannel = action(
  deleteEventChannelSchema,
  async ({ id, platformEntityId }) => {
    let params = new URLSearchParams({ platformEntityId });

    try {
      await fetcher(`/livestreams/event-channels/${id}?` + params, {
        method: "DELETE",
      });

      revalidateTag(`getEventChannels-${platformEntityId}`);
    } catch (error) {
      console.log("error:deleteEventChannel", error);
      return { error: "Failed." };
    }
  },
);
