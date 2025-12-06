import { Button } from "@/ui/button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/ui/sidebar";

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
  );
};
