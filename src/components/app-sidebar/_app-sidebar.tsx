"use client";

import { NavHeader } from "@/components/app-sidebar/nav-header";
import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavUser } from "@/components/app-sidebar/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/ui/sidebar";

import { Search, SquarePen } from "lucide-react";
import { type ComponentProps } from "react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  tools: [
    {
      name: "New chat",
      url: "/",
      icon: SquarePen
    },
    {
      name: "Search chats",
      url: "/search",
      icon: Search
    }
  ]
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <NavMain tools={data.tools} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
