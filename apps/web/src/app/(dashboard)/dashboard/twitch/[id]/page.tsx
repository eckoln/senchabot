import { AuditLogs } from "@/components/overview/audit-logs";
import { BotControls } from "@/components/overview/bot-controls";
import { PageHeader, PageHeaderTitle } from "@/components/page-header";

import { getEntityLogs } from "@/data-layer/queries";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  let logs = await getEntityLogs("twitch", params.id);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Overview</PageHeaderTitle>
      </PageHeader>
      <div className="grid grid-cols-3 gap-6 px-6">
        <AuditLogs logs={logs} />
        <BotControls />
      </div>
    </>
  );
}
