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
        <PageHeaderTitle>Commands</PageHeaderTitle>
        <PageHeaderDescription>
          This is commands page description.
        </PageHeaderDescription>
      </PageHeader>
      {tabs}
    </>
  );
}
