"use client";

import Image from "next/image";

export const Header = () => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <Image
          className="size-12"
          src="/icons/main.svg"
          alt="WooZoo main logo"
          width={48}
          height={48}
        />
        <span className="text-3xl font-light tracking-tight">WooZoo</span>
      </div>
    </div>
  );
};
