import React, { SelectHTMLAttributes, forwardRef } from "react";

interface SelectData {
  value: string;
  name: string;
  id: number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  data: SelectData[];
  headerInstruction: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, data, headerInstruction, ...props }: SelectProps, ref) => {
    const renderOptions = data.map((item) => {
      return (
        <option value={item.value} key={item.id}>
          {item.name}
        </option>
      );
    });

    return (
      <select
        ref={ref}
        className={`${className} w-full py-2 px-4 rounded-md font-kanit `}
        {...props}
      >
        <option value="--">-- {headerInstruction} -- </option>
        {renderOptions}
      </select>
    );
  }
);

export default Select;
