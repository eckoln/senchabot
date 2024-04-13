"use server";

import {
  updateDiscordSettingsSchema,
  updateTwitchSettingsSchema,
} from "@/data-layer/schemas";
import { fetcher } from "@/data-layer/utils";

/*
 * updateTwitchSettings
 */
export async function updateTwitchSettings(
  _prevState: { success: boolean; message: string } | undefined,
  formData: FormData,
) {
  let entries = Object.fromEntries(formData);
  let parsed = updateTwitchSettingsSchema.safeParse(entries);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid submission!",
    };
  }

  let { platform, platformEntityId, ...input } = parsed.data;

  const keysArray = Object.entries(input).map(([key, value]) => ({
    key,
    value: String(value),
  }));

  try {
    let params = new URLSearchParams({ platform, platformEntityId });
    await fetcher("/platforms/settings?" + params, {
      method: "PUT",
      body: JSON.stringify(keysArray),
    });

    return {
      success: true,
      message: "Successfully updated.",
    };
  } catch (error) {
    console.log("updateTwitchSettings =>", error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}
