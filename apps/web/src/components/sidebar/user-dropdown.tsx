"use client";

import Link, { type LinkProps } from "next/link";

import { AvatarImage } from "@radix-ui/react-avatar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <div className="flex items-center space-x-2">
            <Avatar className="size-4">
              <AvatarImage src="https://randomuser.me/api/portraits/lego/7.jpg" />
              <AvatarFallback>{"Username".charAt(0)}</AvatarFallback>
            </Avatar>
            <span>username</span>
          </div>
          <DotsHorizontalIcon className="size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="center" side="top">
        <div className="px-2 py-1.5 text-sm">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">username</p>
            <p className="text-xs leading-none text-muted-foreground">
              example@mail.com
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {[
          { label: "My Account", path: "/dashboard/account" },
          { label: "Connections", path: "/dashboard/account/connections" },
          { label: "Sign out", path: "/dashboard/signout" },
        ].map((item, index) => (
          <DropdownMenuLinkItem href={item.path} key={index}>
            {item.label}
          </DropdownMenuLinkItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownMenuLinkItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & LinkProps) {
  return (
    <DropdownMenuItem asChild>
      <Link {...props} />
    </DropdownMenuItem>
  );
}
