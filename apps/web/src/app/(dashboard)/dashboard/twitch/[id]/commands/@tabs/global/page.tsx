import GlobalCommandsView from "@/components/commands/global-commands-view";

import { getEntityCommands } from "@/data-layer/queries";

export default async function Page({ params }: { params: { id: string } }) {
  let commands = await getEntityCommands("twitch", "global", params.id);
  return <GlobalCommandsView commands={commands} />;
}
