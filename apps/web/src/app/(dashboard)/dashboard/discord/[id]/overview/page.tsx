import { AuditLogs } from "@/components/overview/audit-logs";
import { BotControls } from "@/components/overview/bot-controls";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/page-header";

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Overview</PageHeaderTitle>
        <PageHeaderDescription>
          This is overview page description.
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-3 gap-6">
        <AuditLogs />
        <BotControls />
      </div>
    </>
  );
}
