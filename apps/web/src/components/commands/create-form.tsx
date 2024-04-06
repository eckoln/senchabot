"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useParams } from "next/navigation";

import { Platforms } from "@/types";
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
import { Link } from "@/ui/link";
import { Switch } from "@/ui/switch";

import { createEntityCommand } from "@/data-layer/actions/commands";
import {
  type CreateCommandSchema,
  createCommandSchema,
} from "@/data-layer/schemas";

interface Props {
  platform: Platforms;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateForm({ platform, setOpen }: Props) {
  let params = useParams<{ id: string }>();
  let [isPending, startTransition] = useTransition();

  let form = useForm<CreateCommandSchema>({
    resolver: zodResolver(createCommandSchema),
    defaultValues: {
      platform,
      platformEntityId: params.id,
      command_name: "",
      command_content: "",
      status: true,
    },
  });

  function onSubmit(values: CreateCommandSchema) {
    if (isPending) return;

    startTransition(async () => {
      let res = await createEntityCommand(values);

      if (res.data?.error) {
        toast.error(res.data.error);
        return;
      }

      setOpen(false);
      form.reset();
      toast.success("Command successfully added.");
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
                <Input placeholder="lurk" {...field} />
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
                <Input placeholder="thx @{username}" {...field} />
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
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
