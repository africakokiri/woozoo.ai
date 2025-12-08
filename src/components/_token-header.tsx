import { Button } from "@/ui/button";
import { useSidebar } from "@/ui/sidebar";
import { cn } from "@/utils/shadcn/cn";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function TokenHeader() {
  const { open, setOpen } = useSidebar();

  return (
    <header className="bg-sidebar fixed top-0 left-0 z-10 flex h-[75px] w-full items-center border-b">
      <div className={cn("bg-blue-200", open && "min-w-[287px]")} />

      <Button
        variant="ghost"
        className="z-20 ml-4 h-10 w-10"
        onClick={() => setOpen(!open)}
      >
        {!open ? <ChevronsRight strokeWidth={1.5} /> : <ChevronsLeft strokeWidth={1.5} />}
      </Button>

      <div className="absolute flex w-full justify-end">
        <div className="mr-8 flex">
          {/* CREDITS */}
          <div className="ml-4 flex flex-col gap-0.5 text-center">
            <span className="text-muted-foreground text-xs font-light tracking-wider">CREDITS</span>
            <span className="text-lg font-light">$24.80</span>
          </div>

          {/* SESSION USAGE */}
          <div className="mx-8 flex flex-col gap-0.5 border-x px-8 text-center">
            <span className="text-muted-foreground text-xs font-light tracking-wider">
              SESSION USAGE
            </span>
            <div className="font-light">
              <span className="text-lg">1,247</span>
              <span className="text-muted-foreground text-sm"> tokens</span>
            </div>
          </div>

          {/* COST */}
          <div className="flex flex-col gap-0.5 text-center">
            <span className="text-muted-foreground text-xs font-light tracking-wider">COST</span>
            <span className="text-lg font-light">$0.06</span>
          </div>
        </div>
      </div>
    </header>
  );
}
