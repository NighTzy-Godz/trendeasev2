import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../utils/utils";

const btnVariants = cva(
  "relative w-full inline-flex items-center justify-center rounded-md rounded-md font-kanit focus:outline-none focus:ring-2 ",
  {
    variants: {
      variant: {
        default:
          "bg-mainColor text-textColor hover:bg-mainColorHover focus:ring-textColor",
        success: "bg-green-600 text-white hover:bg-green-700",
        error: "bg-red-500 text-white hover:bg-red-600",
        sub: "bg-textColor text-mainColor",
      },
      size: {
        lg: "h-12 py-3 px-4 text-lg",
        default: "h-10 py-2 px-4",
        sm: "h-8 px-2 py-1 text-sm",
        xs: "h-6 px-1 py-1 text-xs",
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
    VariantProps<typeof btnVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, isLoading, size, variant, children, ...props }: ButtonProps,
    ref
  ) => {
    const [count, setCount] = useState(0);
    const [msg, setMsg] = useState("");
    useEffect(() => {
      let timerId: number;
      if (isLoading) {
        if (count > 2) {
          setMsg(
            "Please be patient, it may take some time to complete this action "
          );
        } else {
          setMsg("Loading ...");
        }

        timerId = setTimeout(() => {
          setCount(count + 1);
        }, 1000);
      }

      return () => {
        clearTimeout(timerId);
        if (!isLoading) setCount(0);
      };
    }, [count, isLoading]);

    return (
      <button
        className={`${className}${cn(
          btnVariants({ variant, size, className })
        )}`}
        ref={ref}
        {...props}
      >
        {isLoading ? msg : children}
      </button>
    );
  }
);

export { btnVariants };
export default Button;
