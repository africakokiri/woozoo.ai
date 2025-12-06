import { Button } from "@/ui/button";
import { useSidebar } from "@/ui/sidebar";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function TokenHeader() {
  const { open, setOpen } = useSidebar();

  return (
    <header className="bg-sidebar fixed top-0 left-0 z-10 flex h-[75px] w-full items-center border">
      <div className="min-w-[287px] bg-blue-200" />

      <Button
        variant="ghost"
        className="z-20 ml-4 h-10 w-10"
        onClick={() => setOpen(!open)}
      >
        {!open ? <ChevronsRight strokeWidth={1.5} /> : <ChevronsLeft strokeWidth={1.5} />}
      </Button>
    </header>
  );
}
