import { CreateButton } from '@/components/announcements/create-button'
import { DeleteButton } from '@/components/announcements/delete-button'
import { getAnnouncements, getGuildChannels } from '@/data-layer/queries'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  let [announcements, guildChannels] = await Promise.all([
    getAnnouncements(params.id),
    getGuildChannels(params.id),
  ])

  function getChannelName(id: string) {
    return guildChannels.find(i => i.id === id)?.name
  }

  return (
    <>
      <div className="flex h-9 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {announcements.length} items found.
        </p>
        <CreateButton guildChannels={guildChannels} />
      </div>
      {Boolean(announcements.length) ? (
        <div className="relative w-full overflow-auto rounded-md border bg-card">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead>Streamer Name</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Last Sent</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.twitch_username}</TableCell>
                  <TableCell>
                    <p className="truncate">
                      {getChannelName(item.anno_channel_id)}
                    </p>
                  </TableCell>
                  <TableCell>{null}</TableCell>
                  <TableCell className="text-end">
                    <DeleteButton anno={item} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center">
          <p>You not have any announcement.</p>
        </div>
      )}
    </>
  )
}
