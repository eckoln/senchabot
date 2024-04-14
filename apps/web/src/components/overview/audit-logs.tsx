import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import type { EntityLogs } from '@/lib/types'
import { toDate } from '@/lib/utils'
import { Badge } from '@/ui/badge'

interface Props {
  logs: EntityLogs[]
}

export async function AuditLogs({ logs }: Props) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {logs
            ?.map((item, index) => (
              <li
                className="flex flex-row items-center justify-between space-x-3 py-3 first:pt-0 last:pb-0"
                key={index}
              >
                <div className="space-x-3">
                  <Badge variant="secondary" className="w-fit">
                    @{item.author}
                  </Badge>
                  <span className="text-sm">{item.activity}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {toDate(item.activity_date)}
                </span>
              </li>
            ))
            .slice(0, 10)}
        </ul>
      </CardContent>
    </Card>
  )
}
