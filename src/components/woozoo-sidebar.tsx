"use client";

import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { DropdownMenu } from "@/ui/dropdown-menu";
import { Separator } from "@/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/ui/sidebar";
import { cn } from "@/utils/shadcn/cn";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Moon, Search, SquarePen, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export const WooZooSidebar = () => {
  const [mounted, setMounted] = useState(false);

  const { open } = useSidebar();

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className={cn(
        "bg-sidebar flex h-screen w-72 flex-col border-r px-2 py-4 transition-none **:transition-none",
        !open && "w-16!"
      )}
    >
      <SidebarHeader className="flex items-center">
        <div className={cn(open ? "flex w-full items-center justify-between" : "hidden")}>
          <h1 className="text-sidebar-foreground text-xl font-light">WooZoo</h1>

          <div className="">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10"
            >
              {theme === "dark" ? (
                <Sun
                  strokeWidth={1.5}
                  className="h-4 w-4"
                />
              ) : (
                <Moon
                  strokeWidth={1.5}
                  className="h-4 w-4"
                />
              )}
            </Button>

            <SidebarTrigger className="h-10 w-10" />
          </div>
        </div>

        <div className={cn("", open && "hidden")}>
          <SidebarTrigger className="h-10 w-10" />
        </div>
      </SidebarHeader>

      <Separator className="my-4" />

      <SidebarContent className="gap-0">
        <SidebarGroup className="space-y-4 p-0">
          <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
            <Card className="bg-sidebar-accent-foreground/10 border p-4 shadow-none">
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="text-muted-foreground text-xs tracking-wider">CREDITS</p>
                  <p className="text-sidebar-foreground text-2xl font-light">$24.80</p>
                </div>

                <Button
                  size="sm"
                  className="text-xs"
                >
                  Recharge
                </Button>
              </div>
            </Card>
          </SidebarGroupContent>

          <SidebarGroupContent>
            <SidebarMenu className={cn("flex flex-col", !open && "items-center")}>
              <SidebarMenuItem className={cn(open ? "space-y-1" : "space-y-2")}>
                <SidebarItem
                  href="/"
                  Icon={<SquarePen strokeWidth={1.5} />}
                  text="New Chat"
                />
                <SidebarItem
                  href="/search"
                  Icon={<Search strokeWidth={1.5} />}
                  text="Search Chats"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className={cn("mt-2 mb-4", !open && "hidden")} />

        <SidebarGroup className="p-0">
          <SidebarGroupLabel
            className={cn("text-muted-foreground h-fit text-xs tracking-wider", !open && "hidden")}
          >
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarRecentChat />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn("flex", open ? "justify-start" : "items-center")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarUser />
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const SidebarItem = ({ href, Icon, text }: { href: string; Icon: React.ReactNode; text: string }) => {
  const { open } = useSidebar();

  return (
    <SidebarMenuButton asChild>
      <Link
        href={href}
        className={cn(
          "hover:bg-accent-foreground/10! flex items-center gap-2",
          !open && "h-10! w-10! justify-center rounded-md"
        )}
      >
        {Icon}
        <span className={cn(!open && "hidden")}>{text}</span>
      </Link>
    </SidebarMenuButton>
  );
};

const SidebarRecentChat = () => {
  return <SidebarMenuButton asChild></SidebarMenuButton>;
};

const SidebarUser = () => {
  const { open } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="flex justify-start px-0"
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-sidebar-foreground text-sidebar text-sm font-normal">
          CC
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex items-center justify-between", !open && "hidden")}>
        <div className="flex flex-col text-start">
          <span className="font-semibold">Choi Bangu</span>
          <span className="text-xs font-light">kokiri@gmail.com</span>
        </div>
      </div>
    </Button>
  );
};
