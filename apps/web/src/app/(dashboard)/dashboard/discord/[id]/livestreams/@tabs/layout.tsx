'use client'

import Link from 'next/link'
import { useParams, useSelectedLayoutSegment } from 'next/navigation'

import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let currentTab = useSelectedLayoutSegment()
  let params = useParams<{ id: string }>()

  return (
    <Tabs className="space-y-6" value={currentTab!}>
      <TabsList>
        {[
          { label: 'Announcements', value: 'announcements' },
          { label: 'Event Channels', value: 'event-channels' },
        ].map((item, index) => (
          <TabsTrigger value={item.value} key={index} asChild>
            <Link
              href={`/dashboard/discord/${params.id}/livestreams/${item.value}`}
            >
              {item.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}
