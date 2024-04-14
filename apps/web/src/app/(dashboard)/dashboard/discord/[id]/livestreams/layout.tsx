import { PageHeader, PageHeaderTitle } from '@/components/page-header'

export default function Layout({
  tabs,
}: Readonly<{
  tabs: React.ReactNode
}>) {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Live Streams</PageHeaderTitle>
      </PageHeader>
      <div className="w-full max-w-xl px-6">{tabs}</div>
    </>
  )
}
