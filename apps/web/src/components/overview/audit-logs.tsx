import { Badge } from "@/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

export async function AuditLogs() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              className="flex flex-row items-center justify-between space-x-3 py-3 first:pt-0 last:pb-0"
              key={index}
            >
              <div className="space-x-3">
                <Badge variant="secondary" className="w-fit">
                  @username
                </Badge>
                <span className="text-sm">!command-{index + 1}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("en").format(new Date())}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
