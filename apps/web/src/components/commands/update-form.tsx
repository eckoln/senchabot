"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Link from "next/link";

import type { EntityCommands } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";

import { updateEntityCommand } from "@/data-layer/actions/commands";
import {
  type UpdateCommandSchema,
  updateCommandSchema,
} from "@/data-layer/schemas";

interface Props {
  command: EntityCommands;
}

export function UpdateForm({ command }: Props) {
  let [isPending, startTransition] = useTransition();

  let form = useForm<UpdateCommandSchema>({
    resolver: zodResolver(updateCommandSchema),
    defaultValues: {
      platform: command.platform,
      platformEntityId: command.platform_entity_id,
      id: command.id,
      command_name: command.name,
      command_content: command.content,
      status: command.status,
    },
  });

  function onSubmit(values: UpdateCommandSchema) {
    startTransition(async () => {
      let res = await updateEntityCommand(values);

      if (res.data?.error) {
        toast.error(res.data.error);
        return;
      }

      toast.success("Command successfully updated.");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="command_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} readOnly disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="command_content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                See our{" "}
                <Link
                  href="https://docs.senchabot.app/twitch-bot/variables"
                  target="_blank"
                  rel="noreferrer"
                >
                  docs page
                </Link>{" "}
                for more variables.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{field.value ? "Enabled" : "Disabled"}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
