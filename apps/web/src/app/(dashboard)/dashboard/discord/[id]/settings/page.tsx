import { PageHeader, PageHeaderTitle } from "@/components/page-header";
import { DiscordSettingsForm } from "@/components/settings/discord-settings-form";

import { getEntitySettings, getGuildChannels } from "@/data-layer/queries";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  let [defaultSettings, guildChannels] = await Promise.all([
    getEntitySettings("discord", params.id),
    getGuildChannels(params.id),
  ]);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Settings</PageHeaderTitle>
      </PageHeader>
      <div className="max-w-xl">
        <DiscordSettingsForm
          defaultSettings={defaultSettings}
          guildChannels={guildChannels}
        />
      </div>
    </>
  );
}
