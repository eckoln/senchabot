import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));
 
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // global
      {
        source: "/docs",
        destination: "https://docs.senchabot.app",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://discord.gg/inviteId",
        permanent: true,
      },
      // dashboard/account
      {
        source: "/dashboard/account",
        destination: "/dashboard/account/profile",
        permanent: true,
      },
      // dashboard/twitch
      {
        source: "/dashboard/twitch/:id/commands",
        destination: "/dashboard/twitch/:id/commands/custom",
        permanent: true,
      },
      // dashboard/discord
      {
        source: "/dashboard/discord/:id/commands",
        destination: "/dashboard/discord/:id/commands/custom",
        permanent: true,
      },
      {
        source: "/dashboard/discord/:id/livestreams",
        destination: "/dashboard/discord/:id/livestreams/announcements",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
