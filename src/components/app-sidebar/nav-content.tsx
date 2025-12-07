"use client";

import { Button } from "@/ui/button";
import { TooltipButton } from "@/ui/tooltip-button";

import { Search, SquarePen } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

export const NavContent = ({
  isSidebarOpen,
  setIsSidebarOpen
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <ul className="space-y-1">
        {["New chats", "Search chats"].map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex w-full items-center gap-2 px-2 text-sm"
          >
            {isSidebarOpen ? (
              <Button
                variant="ghost"
                size="sm"
                className="flex w-full justify-start px-4!"
              >
                {i === 0 ? <SquarePen /> : <Search />}
                {item}
              </Button>
            ) : (
              <TooltipButton
                tooltipMessage={item}
                aria-label={item}
              >
                {i === 0 ? <SquarePen aria-hidden={true} /> : <Search aria-hidden={true} />}
              </TooltipButton>
            )}
          </li>
        ))}
      </ul>

      <ul></ul>
    </>
  );
};
