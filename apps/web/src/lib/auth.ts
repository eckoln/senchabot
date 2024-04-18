import { prisma } from './db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import Twitch from 'next-auth/providers/twitch'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [Twitch, Discord],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin',
  },
})
