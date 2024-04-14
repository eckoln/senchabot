import { Button } from '@/ui/button'

export default function Page() {
  return (
    <div className="max-w-lg space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Delete Account</h3>
        <p className="text-sm text-muted-foreground">
          Deleting your account will remove all your personal data and account
          information. This action cannot be undone, so please think carefully
          before proceeding.
        </p>
        <Button variant="destructive">Delete My Account</Button>
      </div>
    </div>
  )
}
