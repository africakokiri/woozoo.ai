"use client";

import { TooltipButton } from "@/ui/tooltip-button";
import { cn } from "@/utils/shadcn/cn";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import { type Dispatch, type SetStateAction, useState } from "react";

export const NavHeader = ({
  isSidebarOpen,
  setIsSidebarOpen
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {isHover ? (
          <TooltipButton
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              setIsHover(false);
            }}
            className="flex h-8 w-8 items-center justify-center"
            onMouseLeave={() => setIsHover(false)}
            aria-label="Open sidebar"
            tooltipMessage="Open sidebar"
          >
            <ChevronsRight aria-hidden={true} />
          </TooltipButton>
        ) : (
          <Image
            src="/icons/woozoo.svg"
            alt="WooZoo logo"
            width={32}
            height={32}
            onMouseEnter={() => !isSidebarOpen && setIsHover(true)}
            className="h-8! w-8! dark:invert"
          />
        )}

        <span className={cn("text-lg font-light", !isSidebarOpen && "hidden")}>WooZoo</span>
      </div>

      {isSidebarOpen && (
        <TooltipButton
          aria-label="Close sidebar"
          tooltipMessage="Close sidebar"
          className="flex h-8 w-8 items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ChevronsLeft />
        </TooltipButton>
      )}
    </>
  );
};
