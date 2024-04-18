import { ProgressBar } from '@/components/progressbar'
import { Sidebar } from '@/components/sidebar/sidebar'
import { Toaster } from 'react-hot-toast'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <Sidebar />
      <main className="grow overflow-auto">{children}</main>
      <Toaster />
      <ProgressBar />
    </div>
  )
}
