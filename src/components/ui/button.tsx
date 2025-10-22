import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./buttonVariants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

// Envolva a definição do componente com React.forwardRef
const Button = (
  {
    ref,
    className,
    variant,
    size,
    asChild = false,
    loading,
    children,
    ...props
  }: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> } // A ref agora é recebida como segundo argumento
) => {
  const Comp = asChild ? Slot : "button";
  const isDisabled = loading ?? props.disabled;

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref} // A ref é passada corretamente para o elemento DOM
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2Icon
          data-testid="spinner"
          className="mr-2 h-4 w-4 animate-spin"
        />
      )}
      {children}
    </Comp>
  );
};
Button.displayName = "Button";

export { Button };
