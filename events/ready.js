const { giveRole } = require("../utils/memberFunctions");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const roleName = process.env.ROLE;

    if (!roleName) return;

    const guild = client.guilds.cache.first();
    const memberRole = guild.roles.cache.find((role) => role.name === roleName);

    guild.members.cache.forEach((member) => {
      const hasRole = member.roles.cache.some(
        (role) => role.id === memberRole.id
      );

      if (!hasRole) {
        giveRole(member, memberRole);
      }
    });
  },
};
