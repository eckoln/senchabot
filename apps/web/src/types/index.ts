export type Platforms = "twitch" | "discord";

export interface UserEntities {
  id: string;
  entity_name: string;
  entity_owner_id: string;
  platform: Platforms;
  platform_entity_id: string;
}
