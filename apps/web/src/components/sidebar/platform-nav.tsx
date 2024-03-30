"use client";

import { useMemo } from "react";

import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";

import {
  GearIcon,
  HomeIcon,
  ListBulletIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";

import { Nav, NavItem } from "./nav";

function getNavItems(platform: string | null, entityId: string) {
  if (!platform || (platform !== "twitch" && platform !== "discord")) {
    return null;
  }

  const BASE_ROUTE = `/dashboard/${platform}/${entityId}`;
  const items = [
    {
      label: "Overview",
      path: `${BASE_ROUTE}`,
      icon: HomeIcon,
    },
    {
      label: "Commands",
      path: `${BASE_ROUTE}/commands/custom`,
      icon: ListBulletIcon,
    },
    {
      label: "Settings",
      path: `${BASE_ROUTE}/settings`,
      icon: GearIcon,
    },
  ];

  if (platform === "discord") {
    items.splice(2, 0, {
      label: "Live Streams",
      path: `${BASE_ROUTE}/livestreams`,
      icon: SpeakerModerateIcon,
    });
  }

  return items;
}

export function PlatformNav() {
  let currentPlatform = useSelectedLayoutSegment();
  let params = useParams<{ id: string }>();
  let pathname = usePathname();

  let navItems = useMemo(
    () => getNavItems(currentPlatform, params.id),
    [currentPlatform, params],
  );

  if (!navItems) {
    return null;
  }

  return (
    <Nav>
      {navItems.map((item, index) => (
        <NavItem href={item.path} isActive={item.path === pathname} key={index}>
          <item.icon className="size-4" />
          <span>{item.label}</span>
        </NavItem>
      ))}
    </Nav>
  );
}
