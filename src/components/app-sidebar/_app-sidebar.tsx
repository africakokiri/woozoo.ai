"use client";

import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavUser } from "@/components/app-sidebar/nav-user";
import { Button } from "@/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/ui/sidebar";

import { BookOpen, Bot, ChevronsLeft, ChevronsRight, Settings2, SquareTerminal } from "lucide-react";
import Image from "next/image";
import { type ComponentProps, useState } from "react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg"
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#"
        },
        {
          title: "Starred",
          url: "#"
        },
        {
          title: "Settings",
          url: "#"
        }
      ]
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#"
        },
        {
          title: "Explorer",
          url: "#"
        },
        {
          title: "Quantum",
          url: "#"
        }
      ]
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#"
        },
        {
          title: "Get Started",
          url: "#"
        },
        {
          title: "Tutorials",
          url: "#"
        },
        {
          title: "Changelog",
          url: "#"
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#"
        },
        {
          title: "Team",
          url: "#"
        },
        {
          title: "Billing",
          url: "#"
        },
        {
          title: "Limits",
          url: "#"
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const [hover, setHover] = useState(false);

  const { open, setOpen } = useSidebar();

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-sidebar"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hover ? (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="flex items-center justify-center"
                      onMouseLeave={() => setHover(false)}
                      onClick={() => {
                        setOpen(!open);
                        setHover(false);
                      }}
                    >
                      <ChevronsRight strokeWidth={1.5} />
                    </Button>
                  ) : (
                    <Image
                      src="/icons/woozoo.svg"
                      alt=""
                      width={32}
                      height={32}
                      onMouseEnter={() => !open && setHover(true)}
                    />
                  )}

                  <span className="text-lg font-light">WooZoo</span>
                </div>

                {open && (
                  <Button
                    variant="ghost"
                    className="h-10 w-10"
                    onClick={() => setOpen(!open)}
                  >
                    {!open ? <ChevronsRight strokeWidth={1.5} /> : <ChevronsLeft strokeWidth={1.5} />}
                  </Button>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
