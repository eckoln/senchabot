import { AuthErrorMessage } from '@/components/signin/error-message'
import { SigninButton } from '@/components/signin/signin-button'
import { auth, signOut } from '@/lib/auth'
import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter } from '@/ui/card'
import { Link } from '@/ui/link'
import { ExitIcon } from '@radix-ui/react-icons'

export default async function Page() {
  let session = await auth()

  return (
    <div className="flex h-screen grow flex-col items-center justify-center px-6 py-4">
      <div className="w-full max-w-xs flex-col space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            This is sign in page description.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <SigninButton platform="twitch" />
          <SigninButton platform="discord" />
        </div>
        <AuthErrorMessage />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link href="/">Terms of Service</Link> and{' '}
          <Link href="/">Privacy Policy</Link>.
        </p>
      </div>
      {/* 
        // FOR TESTS -- REMOVE
      */}
      {session?.user && (
        <Card className="m-auto flex w-fit flex-col space-y-8 p-8">
          <CardContent>
            <pre>{JSON.stringify(session?.user, null, 2)}</pre>
          </CardContent>
          <CardFooter>
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <Button type="submit" variant="destructive">
                <ExitIcon className="size-4" />
                <span>Signout</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
