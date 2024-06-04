import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy',
}

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger zone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Deleting your account is a permanent action that cannot be undone. All
          your data, settings, and any content you have created will be deleted.
          If you have any concerns, please contact our support team for
          assistance.
        </p>
        <form>
          <Button type="submit" variant="destructive" disabled>
            Delete My Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
