import { HTMLAttributes } from "react";

import { cn } from "@/utils";

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}
export function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <div className={cn("max-w-80 max-h-56 overflow-y-auto", className)}>
      {children}
    </div>
  );
}
