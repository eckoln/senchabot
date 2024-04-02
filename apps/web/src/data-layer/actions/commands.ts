"use server";

import { revalidateTag } from "next/cache";

import {
  createCommandSchema,
  deleteCommandSchema,
  updateCommandSchema,
} from "@/data-layer/schemas";
import { action, fetcher } from "@/data-layer/utils";

/*
 * createEntityCommand
 */
export const createEntityCommand = action(
  createCommandSchema,
  async ({ platform, platformEntityId, ...values }) => {
    let params = new URLSearchParams({ platform, platformEntityId });

    try {
      await fetcher("/commands?" + params, {
        method: "POST",
        body: JSON.stringify(values),
      });

      revalidateTag(`getEntityCommands-${platformEntityId}-custom`);
    } catch (error) {
      console.log("error:createEntityCommand", error);
      return { error: "Error while creating command." };
    }
  },
);

/*
 * updateEntityCommand
 */
export const updateEntityCommand = action(
  updateCommandSchema,
  async ({ id, platform, platformEntityId, ...values }) => {
    let params = new URLSearchParams({
      platform,
      platformEntityId,
      id: id.toString(),
    });

    try {
      await fetcher("/commands?" + params, {
        method: "PATCH",
        body: JSON.stringify(values),
      });

      revalidateTag(`getEntityCommands-${platformEntityId}-custom`);
    } catch (error) {
      console.log("error:updateEntityCommand", error);
      return { error: "Error while updating command." };
    }
  },
);

/*
 * deleteEntityCommand
 */
export const deleteEntityCommand = action(
  deleteCommandSchema,
  async ({ id, platform, platformEntityId }) => {
    let params = new URLSearchParams({
      platform,
      platformEntityId,
      id: id.toString(),
    });

    try {
      await fetcher("/commands?" + params, { method: "DELETE" });
      revalidateTag(`getEntityCommands-${platformEntityId}-custom`);
    } catch (error) {
      console.log("error:deleteEntityCommand", error);
      return { error: "Error while deleting command." };
    }
  },
);
