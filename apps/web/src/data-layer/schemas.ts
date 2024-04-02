import { z } from "zod";

const platforms = z.enum(["twitch", "discord"]);

export const createCommandSchema = z.object({
  platform: platforms,
  platformEntityId: z.string().min(1),
  command_name: z.string().min(1),
  command_content: z.string().min(1),
  status: z.boolean(),
});

export const updateCommandSchema = z.object({
  platform: platforms,
  platformEntityId: z.string().min(1),
  id: z.number().min(1),
  command_name: z.string().min(1),
  command_content: z.string().min(1),
  status: z.boolean(),
});

export type CreateCommandSchema = z.infer<typeof createCommandSchema>;
export type UpdateCommandSchema = z.infer<typeof updateCommandSchema>;
