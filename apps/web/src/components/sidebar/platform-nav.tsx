"use client";

import { useParams, useSelectedLayoutSegments } from "next/navigation";

import {
  GearIcon,
  HomeIcon,
  ListBulletIcon,
  SpeakerModerateIcon,
} from "@radix-ui/react-icons";

import { Nav, NavItem } from "./nav";

function getNavItems() {
  let layoutSegments = useSelectedLayoutSegments();
  let platform = layoutSegments.at(1);

  if (platform !== "twitch" && platform !== "discord") {
    return null;
  }

  let params = useParams<{ id: string }>();

  let items = [
    {
      label: "Overview",
      path: `/dashboard/${platform}/${params.id}/overview`,
      icon: HomeIcon,
    },
    {
      label: "Commands",
      path: `/dashboard/${platform}/${params.id}/commands`,
      icon: ListBulletIcon,
    },
    {
      label: "Settings",
      path: `/dashboard/${platform}/${params.id}/settings`,
      icon: GearIcon,
    },
  ];

  if (platform === "discord") {
    items.splice(2, 0, {
      label: "Live Streams",
      path: `/dashboard/${platform}/${params.id}/livestreams`,
      icon: SpeakerModerateIcon,
    });
  }

  return items;
}

export function PlatformNav() {
  let navItems = getNavItems();

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
