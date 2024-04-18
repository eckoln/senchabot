import { fetcher } from './utils'
import type {
  Announcements,
  EntityCommands,
  EntityLogs,
  EntitySettings,
  EventChannels,
  GuildChannels,
  Platforms,
  UserAccounts,
  UserEntities,
} from '@/lib/types'

/*
 * getUserAccounts
 */
export async function getUserAccounts(): Promise<UserAccounts[]> {
  return fetcher('/me/accounts')
}

/*
 * getUserEntities
 */
export async function getUserEntities(): Promise<UserEntities[]> {
  return fetcher('/platforms')
}

/*
 * getEntityCommands
 */
export async function getEntityCommands(
  platform: Platforms,
  type: 'custom' | 'global',
  platformEntityId: string,
): Promise<EntityCommands[]> {
  let params = new URLSearchParams({
    type,
    platform,
    platformEntityId,
    noCache: 'true',
  })
  return fetcher('/commands?' + params, {
    next: {
      tags: [`getEntityCommands-${platformEntityId}-${type}`],
    },
  })
}

/*
 * getEntityLogs
 */
export async function getEntityLogs(
  platform: Platforms,
  platformEntityId: string,
): Promise<EntityLogs[]> {
  let params = new URLSearchParams({ platform, platformEntityId })
  return fetcher('/platforms/logs?' + params)
}

/*
 * getEntitySettings
 */
export async function getEntitySettings(
  platform: Platforms,
  platformEntityId: string,
): Promise<EntitySettings[]> {
  let params = new URLSearchParams({ platform, platformEntityId })
  return fetcher('/platforms/settings?' + params)
}

/*
 * getGuildChannels
 */
export async function getGuildChannels(
  platformEntityId: string,
): Promise<GuildChannels[]> {
  let params = new URLSearchParams({ platformEntityId, noCache: 'true' })
  return fetcher('/discord/guild-channels?' + params)
}

/*
 * getAnnouncements
 */
export async function getAnnouncements(
  platformEntityId: string,
): Promise<Announcements[]> {
  let params = new URLSearchParams({ platformEntityId, noCache: 'true' })
  return fetcher('/livestreams/announcements?' + params, {
    next: { tags: [`getAnnouncements-${platformEntityId}`] },
  })
}

/*
 * getEventChannels
 */
export async function getEventChannels(
  platformEntityId: string,
): Promise<EventChannels[]> {
  let params = new URLSearchParams({ platformEntityId, noCache: 'true' })
  return fetcher('/livestreams/event-channels?' + params, {
    next: { tags: [`getEventChannels-${platformEntityId}`] },
  })
}
