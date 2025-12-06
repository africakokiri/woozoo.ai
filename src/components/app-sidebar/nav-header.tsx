import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/tooltip";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const NavHeader = () => {
  const [hover, setHover] = useState(false);

  const { open, setOpen } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="hover:bg-sidebar"
          tooltip="Open sidebar"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hover ? (
                <div
                  className="flex h-8 w-8 items-center justify-center"
                  onMouseLeave={() => setHover(false)}
                  onClick={() => {
                    setOpen(!open);
                    setHover(false);
                  }}
                >
                  <ChevronsRight
                    className="h-4 w-4"
                    strokeWidth={1.5}
                  />
                </div>
              ) : (
                <Image
                  src="/icons/woozoo.svg"
                  alt=""
                  width={32}
                  height={32}
                  onMouseEnter={() => !open && setHover(true)}
                  className="dark:invert"
                />
              )}

              <span className="text-lg font-light">WooZoo</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {open && (
                    <SidebarMenuAction
                      className="h-10 w-10"
                      onClick={() => setOpen(!open)}
                    >
                      {!open ? <ChevronsRight strokeWidth={1.5} /> : <ChevronsLeft strokeWidth={1.5} />}
                    </SidebarMenuAction>
                  )}
                </TooltipTrigger>

                <TooltipContent side="bottom">Close sidebar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
