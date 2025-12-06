"use client";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import { Separator } from "@/ui/separator";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/ui/sidebar";
import { cn } from "@/utils/shadcn/cn";

import { EllipsisVertical, Eraser, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const NavMain = () => {
  const { open } = useSidebar();

  return (
    <>
      <SidebarGroup className={cn(!open && "hidden")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <Card className="rounded-3xl px-4 font-light shadow-none">
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sidebar-foreground/70 text-xs tracking-wider">CREDITS</span>
                  <span className="text-sidebar-foreground mt-1 text-2xl">$24.80</span>
                </div>

                <Button size="sm">Recharge</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sidebar-foreground/70 text-xs tracking-wider">
                    SESSION TOTAL
                  </span>
                  <span className="text-xl">1,322</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sidebar-foreground/70 text-xs tracking-wider">TOTAL COST</span>
                  <span className="text-lg">$0.14</span>
                </div>
              </div>
            </Card>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs font-medium">
          Chat histories
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarItem />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};

const SidebarItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "group/chat-item flex items-center justify-between rounded-lg py-0.5 hover:bg-neutral-200",
        isOpen && "bg-neutral-200"
      )}
    >
      <SidebarMenuButton
        asChild
        className="flex-1 hover:bg-transparent!"
      >
        <Link href="/">
          <span>토스에 채용되는 방법</span>
        </Link>
      </SidebarMenuButton>

      <DropdownMenu
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DropdownMenuTrigger
          className={cn("p-2 group-hover/chat-item:opacity-50", isOpen ? "opacity-50" : "opacity-0")}
        >
          <EllipsisVertical className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
        >
          <DropdownMenuItem>
            <Eraser />
            Rename
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="**:text-destructive hover:bg-destructive/15! text-destructive!">
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
