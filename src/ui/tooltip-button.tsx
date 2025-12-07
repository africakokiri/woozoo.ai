"use client";

import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils/shadcn/cn";

type TooltipButtonProps = {
  children: string | React.ReactNode;
  tooltipMessage: string;
  className?: string;
  disableTooltip?: boolean;
} & React.ComponentProps<typeof Button>;

export const TooltipButton = ({
  children,
  tooltipMessage,
  className,
  disableTooltip,
  ...props
}: TooltipButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex w-full justify-start px-4!", className)}
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className={cn(disableTooltip && "hidden")}
        side="right"
      >
        <p>{tooltipMessage}</p>
      </TooltipContent>
    </Tooltip>
  );
};
