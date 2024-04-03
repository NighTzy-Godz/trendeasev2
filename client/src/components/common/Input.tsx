import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full py-2 px-4 rounded-md text-slate-700 border focus:border-mainColor focus:ring-mainColor outline-none font-kanit border-slate-300 ${className}`}
      />
    );
  }
);

export default Input;
