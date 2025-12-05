import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/ui/sidebar";

import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

export const AppSidebarHeader = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-[58px]"
            >
              <DropdownItem
                imageSrc="/icons/woozoo.svg"
                text="WooZoo"
                description="Pay-as-you-go AI chat"
              />

              <ChevronsUpDown
                strokeWidth={1.5}
                className="ml-auto"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
            <DropdownMenuItem className="cursor-not-allowed">
              <DropdownItem
                imageSrc="/icons/saturn.svg"
                text="Saturn"
                description="Currently unavailable."
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const DropdownItem = ({
  imageSrc,
  text,
  description
}: {
  imageSrc: string;
  text?: string;
  description?: string;
}) => {
  return (
    <div className="flex max-h-12 items-center gap-2">
      <Image
        src={imageSrc}
        alt=""
        width={36}
        height={36}
        className="min-h-9 min-w-9"
      />

      <div className="flex flex-col gap-0.5 font-light">
        <span className="text-xl">{text}</span>
        <span className="text-xs">{description}</span>
      </div>
    </div>
  );
};
