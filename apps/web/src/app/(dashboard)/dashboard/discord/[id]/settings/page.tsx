import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/page-header";
import { SwitchItem } from "@/components/settings/switch-item";

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Settings</PageHeaderTitle>
        <PageHeaderDescription>
          This is settings page description.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-3 gap-6">
        <SwitchItem
          id="activity_logs"
          label="Activity Logs"
          description="Keep logs about to your channel activity."
          defaultChecked={true}
        />
        <SwitchItem
          id="allow_moderators"
          label="Allow Moderators"
          description="Your moderators manage bot commands."
          defaultChecked={false}
        />
      </div>
    </>
  );
}
