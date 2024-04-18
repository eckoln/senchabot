import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    AUTH_TWITCH_ID: z.string(),
    AUTH_TWITCH_SECRET: z.string(),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    API_AUTHORIZATION_PREFIX: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_TWITCH_ID: process.env.AUTH_TWITCH_ID,
    AUTH_TWITCH_SECRET: process.env.AUTH_TWITCH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    API_AUTHORIZATION_PREFIX: process.env.API_AUTHORIZATION_PREFIX,
  },
})
