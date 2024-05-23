import React from "react";
import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
interface CartCounterProps {
  value: number;
  onIncreaseQty(): void;
  onDecreaseQty(): void;
}

function CartCounter({
  value,
  onIncreaseQty,
  onDecreaseQty,
}: CartCounterProps) {
  return (
    <div className="w-28 h-9 text-center relative border border-zinc-500 rounded-full">
      <button
        className="absolute left-0 pl-3 leading-10 block h-8 text-bgColor"
        onClick={onDecreaseQty}
      >
        <FiMinus />
      </button>
      <input
        type="number"
        min="0"
        max="99"
        value={value}
        onChange={() => {}}
        className="text-center h-8 bg-inherit font-kanit text-bgColor"
      />
      <button
        className="absolute right-0 pr-3 leading-10 h-8 text-bgColor"
        onClick={onIncreaseQty}
      >
        <MdAdd className="" />
      </button>
    </div>
  );
}

export default CartCounter;
