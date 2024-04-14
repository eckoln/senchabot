import { PageHeader, PageHeaderTitle } from "@/components/page-header";

export default function Layout({
  tabs,
}: Readonly<{
  tabs: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Commands</PageHeaderTitle>
      </PageHeader>
      <div className="px-6">{tabs}</div>
    </>
  );
}
