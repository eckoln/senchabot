import { Suspense } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoaderIcon } from '@/components/ui/icons'

import { EntityLogs } from './entity-logs'

interface Props {
  platform: Platform
  id: string
}

export function OverviewView({ platform, id }: Props) {
  return (
    <div className="max-w-screen-lg space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your server or channel.
        </p>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Audit Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoaderIcon />}>
              <EntityLogs platform={platform} platformEntityId={id} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
