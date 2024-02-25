import { EntitySwitcherClient } from "./entity-switcher-client";

export async function EntitySwitcher() {
  // transform to api call
  let entities = [
    //{ id: "twitch-1", label: "twitch-1", platform: "twitch" },
    { id: "discord-1", label: "discord-1", platform: "discord" },
    { id: "discord-2", label: "discord-2", platform: "discord" },
    { id: "discord-3", label: "discord-3", platform: "discord" },
  ];

  return <EntitySwitcherClient entities={entities} />;
}
