"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useParams } from "next/navigation";

import { GuildChannels } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

import { createEventChannel } from "@/data-layer/actions/eventChannels";
import {
  type CreateEventChannelSchema,
  createEventChannelSchema,
} from "@/data-layer/schemas";

interface Props {
  guildChannels: GuildChannels[];
}

export function CreateForm({ guildChannels }: Props) {
  let params = useParams<{ id: string }>();
  let [isPending, startTransition] = useTransition();

  let form = useForm<CreateEventChannelSchema>({
    resolver: zodResolver(createEventChannelSchema),
    defaultValues: {
      platformEntityId: params.id,
      guild_channel_id: "",
    },
  });

  function onSubmit(values: CreateEventChannelSchema) {
    if (isPending) return;

    startTransition(async () => {
      let { data } = await createEventChannel(values);

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      form.reset();
      toast.success("Success.");
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-row space-x-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="guild_channel_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full min-w-48">
                      <SelectValue placeholder="Select Channel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {guildChannels?.map((item) => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Add"}
        </Button>
      </form>
    </Form>
  );
}
