import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/page-header";
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
        <PageHeaderDescription>
          This is settings page description.
        </PageHeaderDescription>
      </PageHeader>
      <div className="max-w-xl">
        <TwitchSettingsForm defaultSettings={defaultSettings} />
      </div>
    </>
  );
}
