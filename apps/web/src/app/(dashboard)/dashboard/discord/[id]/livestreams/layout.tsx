import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/page-header";

export default function Layout({
  tabs,
}: Readonly<{
  tabs: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Live Streams</PageHeaderTitle>
        <PageHeaderDescription>
          This is live-streams page description.
        </PageHeaderDescription>
      </PageHeader>
      {tabs}
    </>
  );
}
