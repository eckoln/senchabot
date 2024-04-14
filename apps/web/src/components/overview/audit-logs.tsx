import type { EntityLogs } from '@/lib/types'
import { toDate } from '@/lib/utils'
import { Badge } from '@/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'

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
        {Boolean(logs.length) ? (
          <ul className="divide-y">
            {logs
              .map(item => (
                <li
                  className="flex flex-row items-center justify-between space-x-3 py-3 first:pt-0 last:pb-0"
                  key={item.id}
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
        ) : null}
      </CardContent>
    </Card>
  )
}
