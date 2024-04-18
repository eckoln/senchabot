import { prisma } from './db'
import { linkEntity } from '@/data-layer/actions/entities'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'
import Twitch from 'next-auth/providers/twitch'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [Twitch, Discord],
  events: {
    linkAccount: ({ account, user }) => {
      linkEntity(account, String(user.id))
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
    error: '/signin',
  },
})
