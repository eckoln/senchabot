import { Suspense } from 'react'

import { Commands } from '@/components/pages/commands/commands'
import { LoaderIcon } from '@/components/ui/icons'

interface Props {
  platform: Platform
  id: string
  type: CommandType
}

export default function CommandsWrapper({ platform, id, type }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <LoaderIcon />
        </div>
      }
      key={Math.random()}
    >
      <Commands platform={platform} id={id} type={type} />
    </Suspense>
  )
}
