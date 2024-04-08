"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useParams } from "next/navigation";

import type { GuildChannels } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

import { createAnnouncement } from "@/data-layer/actions/announcements";
import {
  type CreateAnnouncementSchema,
  createAnnouncementSchema,
} from "@/data-layer/schemas";

interface Props {
  guildChannels: GuildChannels[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateForm({ guildChannels, setOpen }: Props) {
  let params = useParams<{ id: string }>();
  let [isPending, startTransition] = useTransition();

  let form = useForm<CreateAnnouncementSchema>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      platformEntityId: params.id,
      twitch_username: "",
      guild_channel_id: "",
      anno_content: "",
    },
  });

  function onSubmit(values: CreateAnnouncementSchema) {
    if (isPending) return;

    startTransition(async () => {
      let { data } = await createAnnouncement(values);

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setOpen(false);
      form.reset();
      toast.success("Success.");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="twitch_username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitch Username</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="anno_content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  <FormLabel>Channel</FormLabel>
                  <FormControl>
                    <SelectTrigger>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
