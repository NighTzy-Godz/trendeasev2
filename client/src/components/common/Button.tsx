import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/utils";

const btnVariants = cva(
  "w-full inline-flex items-center justify-center rounded-md rounded-md font-kanit focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default: "bg-mainColor text-textColor hover:bg-mainColorHover",
        success: "bg-green-600 text-white",
        error: "bg-red-500 text-white",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof btnVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }: ButtonProps, ref) => {
    return (
      <button
        className={cn(btnVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export { btnVariants };
export default Button;
