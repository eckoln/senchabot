import { z } from "zod";

const platforms = z.enum(["twitch", "discord"]);

/*
 * COMMANDS
 */
export const createCommandSchema = z.object({
  platform: platforms,
  platformEntityId: z.string().min(1),
  command_name: z.string().min(1),
  command_content: z.string().min(1),
  status: z.coerce.boolean(),
});

export const updateCommandSchema = z.object({
  platform: platforms,
  platformEntityId: z.string().min(1),
  id: z.string().min(1),
  command_content: z.string().min(1),
  status: z.coerce.boolean(),
});

export const deleteCommandSchema = z.object({
  platform: platforms,
  platformEntityId: z.string().min(1),
  id: z.string().min(1),
});

/*
 * LIVESTREAMS
 */
export const createAnnouncementSchema = z.object({
  platformEntityId: z.string().min(1),
  twitch_username: z.string().min(1),
  guild_channel_id: z.string().min(1),
  announcement_content: z.string().optional(),
});

export const deleteAnnouncementSchema = z.object({
  platformEntityId: z.string().min(1),
  id: z.number().min(1),
});

export const createEventChannelSchema = z.object({
  platformEntityId: z.string().min(1),
  guild_channel_id: z.string().min(1),
});

export const deleteEventChannelSchema = z.object({
  platformEntityId: z.string().min(1),
  id: z.number().min(1),
});

/*
 * TYPES
 */
export type CreateCommandSchema = z.infer<typeof createCommandSchema>;
export type UpdateCommandSchema = z.infer<typeof updateCommandSchema>;
export type DeleteCommandSchema = z.infer<typeof deleteCommandSchema>;
export type CreateAnnouncementSchema = z.infer<typeof createAnnouncementSchema>;
export type DeleteAnnouncementSchema = z.infer<typeof deleteAnnouncementSchema>;
export type CreateEventChannelSchema = z.infer<typeof createEventChannelSchema>;
export type DeleteEventChannelSchema = z.infer<typeof deleteEventChannelSchema>;
