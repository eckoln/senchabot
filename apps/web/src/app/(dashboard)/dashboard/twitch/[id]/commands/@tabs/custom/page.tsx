import { CustomCommandsView } from "@/components/commands/custom-commands-view";

import { getEntityCommands } from "@/data-layer/queries";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  let commands = await getEntityCommands("twitch", "custom", params.id);
  return <CustomCommandsView platform="twitch" commands={commands} />;
}
