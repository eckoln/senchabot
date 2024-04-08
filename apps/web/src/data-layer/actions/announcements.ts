"use server";

import { revalidateTag } from "next/cache";

import {
  createAnnouncementSchema,
  deleteAnnouncementSchema,
} from "@/data-layer/schemas";
import { action, fetcher } from "@/data-layer/utils";

/*
 * createAnnouncement
 */
export const createAnnouncement = action(
  createAnnouncementSchema,
  async ({ platformEntityId, ...values }) => {
    let params = new URLSearchParams({ platformEntityId });

    try {
      await fetcher("/livestreams/announcements?" + params, {
        method: "POST",
        body: JSON.stringify(values),
      });

      revalidateTag(`getAnnouncements-${platformEntityId}`);
    } catch (error) {
      console.log("error:createAnnouncement", error);
      return { error: "Failed." };
    }
  },
);

/*
 * deleteAnnouncement
 */
export const deleteAnnouncement = action(
  deleteAnnouncementSchema,
  async ({ id, platformEntityId }) => {
    let params = new URLSearchParams({ platformEntityId });

    try {
      await fetcher(`/livestreams/announcements/${id}?` + params, {
        method: "DELETE",
      });

      revalidateTag(`getAnnouncements-${platformEntityId}`);
    } catch (error) {
      console.log("error:deleteAnnouncement", error);
      return { error: "Failed." };
    }
  },
);
