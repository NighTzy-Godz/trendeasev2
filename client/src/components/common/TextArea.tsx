import React, { ChangeEvent, TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }: TextAreaProps, ref) => {
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.currentTarget.style.height = "auto";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    };

    return (
      <textarea
        {...props}
        ref={ref}
        onChange={handleTextAreaChange}
        className={` resize-none w-full py-2 px-4 rounded-md text-slate-700 border focus:border-mainColor focus:ring-mainColor outline-none font-kanit border-slate-300 ${className}`}
      />
    );
  }
);

export default Textarea;
