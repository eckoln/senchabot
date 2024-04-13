"use server";

import {
  type DeleteAnnouncementSchema,
  createAnnouncementSchema,
  deleteAnnouncementSchema,
} from "@/data-layer/schemas";
import { fetcher } from "@/data-layer/utils";

/*
 * createAnnouncement
 */
export async function createAnnouncement(
  _prevState: { success: boolean; message: string } | undefined,
  formData: FormData,
) {
  let entries = Object.fromEntries(formData);
  console.log({ entries });

  let parsed = createAnnouncementSchema.safeParse(entries);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid submission!",
    };
  }
  console.log({ parsed: parsed.data });

  let { platformEntityId, ...input } = parsed.data;

  try {
    let params = new URLSearchParams({ platformEntityId });
    await fetcher("/livestreams/announcements?" + params, {
      method: "POST",
      body: JSON.stringify(input),
    });

    return {
      success: true,
      message: "Successfully added.",
    };
  } catch (error) {
    console.log("createAnnouncement =>", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}

/*
 * deleteAnnouncement
 */
export async function deleteAnnouncement(input: DeleteAnnouncementSchema) {
  let parsed = deleteAnnouncementSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid submission!",
    };
  }

  let { id, platformEntityId } = parsed.data;

  try {
    let params = new URLSearchParams({ platformEntityId });
    await fetcher(`/livestreams/announcements/${id}?` + params, {
      method: "DELETE",
    });

    return {
      success: true,
      message: "Successfully deleted.",
    };
  } catch (error) {
    console.log("deleteAnnouncement =>", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}
