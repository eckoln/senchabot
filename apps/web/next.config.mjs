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
      // remove
      {
        source: "/",
        destination: "/dashboard/discord/discord-1/overview",
        permanent: false,
      },
      // dashboard/account
      {
        source: "/dashboard/account",
        destination: "/dashboard/account/profile",
        permanent: true,
      },
      // dashboard/twitch
      {
        source: "/dashboard/twitch/:id",
        destination: "/dashboard/twitch/:id/overview",
        permanent: true,
      },
      {
        source: "/dashboard/discord/:id",
        destination: "/dashboard/discord/:id/overview",
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
