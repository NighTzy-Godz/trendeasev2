import React from "react";

interface InputLabelProps {
  label: string;
  className?: string;
}

function InputLabel({ label, className }: InputLabelProps) {
  return (
    <p className={`font-kanit text-sm text-textColor ${className}`}>{label}</p>
  );
}

export default InputLabel;
