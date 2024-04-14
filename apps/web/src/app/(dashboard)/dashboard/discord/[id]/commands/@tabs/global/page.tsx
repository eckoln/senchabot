import GlobalCommandsView from '@/components/commands/global-commands-view'
import { getEntityCommands } from '@/data-layer/queries'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  let commands = await getEntityCommands('discord', 'global', params.id)
  return <GlobalCommandsView commands={commands} />
}
