import { Footer } from '@/components/footer'
import { ProgressBar } from '@/components/progressbar'
import { Sidebar } from '@/components/sidebar/sidebar'
import { Toaster } from 'react-hot-toast'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="relative flex flex-1 flex-row">
        <Sidebar />
        <div className="ml-80 flex flex-grow flex-col overflow-x-hidden">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </div>
      <Toaster />
      <ProgressBar />
    </>
  )
}
