import { CreateForm } from "@/components/event-channels/create-form";
import { DeleteButton } from "@/components/event-channels/delete-button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

import { getEventChannels, getGuildChannels } from "@/data-layer/queries";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  let [eventChannels, guildChannels] = await Promise.all([
    getEventChannels(params.id),
    getGuildChannels(params.id),
  ]);

  function getChannelName(id: string) {
    return guildChannels.find((i) => i.id === id)?.name;
  }

  function getUsableChannels() {
    const channelIds = new Set(eventChannels.map((i) => i.channel_id));
    return guildChannels.filter((i) => !channelIds.has(i.id));
  }
  let usableChannels = getUsableChannels();

  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="flex h-9 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {eventChannels?.length} items found.
        </p>
        <CreateForm guildChannels={usableChannels} />
      </div>
      <div className="relative w-full overflow-auto rounded-md border bg-card">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>Channel</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventChannels?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{getChannelName(item.channel_id)}</TableCell>
                <TableCell className="text-end">
                  <DeleteButton channel={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
