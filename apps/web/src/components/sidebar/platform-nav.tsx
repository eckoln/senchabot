"use client";

import { useMemo } from "react";

import { useParams, useSelectedLayoutSegments } from "next/navigation";

import {
  GearIcon,
  HomeIcon,
  ListBulletIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";

import { Nav, NavItem } from "./nav";

function getNavItems(platform: string | undefined, entityId: string) {
  if (platform !== "twitch" && platform !== "discord") {
    return null;
  }

  const baseRoute = `/dashboard/${platform}/${entityId}`;
  const items = [
    {
      label: "Overview",
      path: `${baseRoute}/overview`,
      icon: HomeIcon,
    },
    {
      label: "Commands",
      path: `${baseRoute}/commands`,
      icon: ListBulletIcon,
    },
    {
      label: "Settings",
      path: `${baseRoute}/settings`,
      icon: GearIcon,
    },
  ];

  if (platform === "discord") {
    items.splice(2, 0, {
      label: "Live Streams",
      path: `${baseRoute}/livestreams`,
      icon: SpeakerModerateIcon,
    });
  }

  return items;
}

export function PlatformNav() {
  let layoutSegments = useSelectedLayoutSegments();
  let currentPlatform = layoutSegments.at(1);
  let params = useParams<{ id: string }>();

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
        <NavItem href={item.path} key={index}>
          <item.icon className="size-4" />
          <span>{item.label}</span>
        </NavItem>
      ))}
    </Nav>
  );
}
