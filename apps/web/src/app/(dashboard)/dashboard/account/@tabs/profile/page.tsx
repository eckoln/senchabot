import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

export default async function Page() {
  let session = await auth()

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="max-w-md space-y-8">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input value={session.user?.name!} disabled />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={session.user?.email!} disabled />
      </div>
    </div>
  )
}
