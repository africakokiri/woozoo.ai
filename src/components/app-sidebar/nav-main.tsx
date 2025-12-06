"use client";

import { DropdownMenu, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/ui/sidebar";

import { type LucideIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const NavMain = ({
  tools
}: {
  tools: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {tools.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
            >
              <Link href={item.url}>
                <item.icon strokeWidth={1.5} />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
