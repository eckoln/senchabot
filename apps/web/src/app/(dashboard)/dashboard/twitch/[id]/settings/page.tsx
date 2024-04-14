import { PageHeader, PageHeaderTitle } from "@/components/page-header";
import { TwitchSettingsForm } from "@/components/settings/twitch-settings-form";

import { getEntitySettings } from "@/data-layer/queries";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  let defaultSettings = await getEntitySettings("twitch", params.id);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Settings</PageHeaderTitle>
      </PageHeader>
      <div className="w-full max-w-xl px-6">
        <TwitchSettingsForm defaultSettings={defaultSettings} />
      </div>
    </>
  );
}
