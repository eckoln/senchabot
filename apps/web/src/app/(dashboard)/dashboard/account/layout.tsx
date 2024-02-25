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
        <PageHeaderTitle>Settings</PageHeaderTitle>
        <PageHeaderDescription>
          This is account settings page description.
        </PageHeaderDescription>
      </PageHeader>
      {tabs}
    </>
  );
}
