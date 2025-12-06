import { Collapsible, CollapsibleTrigger } from "@/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/ui/sidebar";

import { ChevronDown, Plus } from "lucide-react";

export const AppSidebarContent = () => {
  return (
    <Collapsible>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Help
            <ChevronDown
              className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>New chat</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>asd</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup></SidebarGroup>
    </Collapsible>
  );
};
