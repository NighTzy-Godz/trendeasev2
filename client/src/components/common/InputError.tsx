import React from "react";

interface InputErrorProps {
  msg?: string;
}

function InputError({ msg }: InputErrorProps) {
  return <p className="font-kanit text-errColor text-sm">{msg}</p>;
}

export default InputError;
