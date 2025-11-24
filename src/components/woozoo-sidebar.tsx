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
  SidebarTrigger
} from "@/ui/sidebar";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronsLeft, Moon, Search, SquarePen, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export const WooZooSidebar = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sidebar
      collapsible="icon"
      className="bg-sidebar flex h-screen w-72 flex-col border-r px-2 py-4"
    >
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <h1 className="text-sidebar-foreground text-xl font-light">WooZoo</h1>

          <div className="space-x-4">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <SidebarTrigger>
              <Button
                variant="ghost"
                size="icon-sm"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </SidebarTrigger>
          </div>
        </div>
      </SidebarHeader>

      <Separator className="my-4" />

      <SidebarContent>
        <SidebarGroup className="space-y-4">
          <SidebarGroupContent>
            <Card className="bg-sidebar-accent border-sidebar-border p-4 shadow-none">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
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
            <SidebarMenu>
              <SidebarMenuItem className="space-y-1">
                <SidebarItem
                  href="/"
                  Icon={
                    <SquarePen
                      strokeWidth={1.5}
                      className="h-5 w-5"
                    />
                  }
                  text="New Chat"
                />
                <SidebarItem
                  href="/"
                  Icon={
                    <Search
                      strokeWidth={1.5}
                      className="h-5 w-5"
                    />
                  }
                  text="Search Chats"
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs tracking-wider">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarRecentChat />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
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
  return (
    <SidebarMenuButton asChild>
      <Link
        href={href}
        className="flex items-center gap-2"
      >
        {Icon}
        <span>{text}</span>
      </Link>
    </SidebarMenuButton>
  );
};

const SidebarRecentChat = () => {
  return <SidebarMenuButton asChild></SidebarMenuButton>;
};

const SidebarUser = () => {
  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start px-2"
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-sidebar-foreground text-sidebar text-sm font-normal">
          CC
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center justify-between">
        <div className="flex flex-col text-start">
          <span className="font-semibold">Choi Bangu</span>
          <span className="text-xs font-light">kokiri@gmail.com</span>
        </div>
      </div>
    </Button>
  );
};
