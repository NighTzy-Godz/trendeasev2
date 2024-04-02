import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="w-full py-2 px-4 rounded-md text-slate-700 border focus:border-mainColor focus:ring-mainColor outline-none font-kanit"
    />
  );
}

export default Input;
