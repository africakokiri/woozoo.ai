"use client";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { DropdownMenu, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { Separator } from "@/ui/separator";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/ui/sidebar";
import { cn } from "@/utils/shadcn/cn";

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
  const { open } = useSidebar();

  return (
    <>
      <SidebarGroup className={cn(!open && "hidden")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <Card className="rounded-3xl px-4 font-light shadow-none">
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sidebar-foreground/80 text-xs tracking-wider">CREDITS</span>
                  <span className="text-sidebar-foreground mt-1 text-2xl">$24.80</span>
                </div>

                <Button size="sm">Recharge</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sidebar-foreground/80 text-xs tracking-wider">
                    SESSION TOTAL
                  </span>
                  <span className="text-xl">1,322</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sidebar-foreground/80 text-xs tracking-wider">TOTAL COST</span>
                  <span className="text-lg">$0.14</span>
                </div>
              </div>
            </Card>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

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
    </>
  );
};
