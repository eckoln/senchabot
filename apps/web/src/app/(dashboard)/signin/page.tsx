import { DiscordIcon, TwitchIcon } from '@/components/icons'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { Link } from '@/ui/link'

export default function Page() {
  return (
    <Card className="m-auto flex w-full max-w-sm flex-col space-y-8 p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          This is sign in page description.
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        <Button variant="outline">
          <TwitchIcon className="size-4" />
          <span>Twitch</span>
        </Button>
        <Button variant="outline">
          <DiscordIcon className="size-4" />
          <span>Discord</span>
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link href="/">Terms of Service</Link> and{' '}
        <Link href="/">Privacy Policy</Link>.
      </p>
    </Card>
  )
}
