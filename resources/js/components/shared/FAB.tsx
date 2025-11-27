import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

export const FloatingButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  FloatingButtonProps
>(({ className, children, size = "icon", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      size={size}
      className={cn(
        "fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 z-50",
        className
      )}
      {...props}
    >
      {children ?? <Plus className="h-6 w-6" />}
    </Button>
  );
});

FloatingButton.displayName = "FloatingButton";