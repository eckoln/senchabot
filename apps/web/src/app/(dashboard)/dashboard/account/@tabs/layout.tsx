"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let currentTab = useSelectedLayoutSegment();

  return (
    <Tabs className="space-y-6" value={currentTab!}>
      <TabsList>
        {[
          {
            label: "Profile",
            value: "profile",
          },
          {
            label: "Connections",
            value: "connections",
          },
          {
            label: "Privacy",
            value: "privacy",
          },
        ].map((item, index) => (
          <TabsTrigger value={item.value} key={index} asChild>
            <Link href={`/dashboard/account/${item.value}`}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}
