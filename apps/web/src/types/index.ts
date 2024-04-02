export type Platforms = "twitch" | "discord";

export interface UserEntities {
  id: string;
  entity_name: string;
  entity_owner_id: string;
  platform: Platforms;
  platform_entity_id: string;
}

export interface EntityCommands {
  id: number;
  name: string;
  content: string;
  status: boolean;
  platform: Platforms;
  platform_entity_id: string;
  created_at: Date;
  created_by: string;
  updated_by: string;
  type: number;
}

export interface EntityLogs {
  id: string;
  author: string;
  author_id: string;
  activity: string;
  activity_date: Date;
  platform: Platforms;
  platform_entity_id: string;
}

export interface EntitySettings {
  platform: Platforms;
  platform_entity_id: string;
  key: string;
  value: string;
}
