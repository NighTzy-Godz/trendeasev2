import React, { HTMLAttributes } from "react";
import formatCurrency from "../../utils/formatCurrency";
import { PreCheckoutItem } from "../../interfaces/orderInteraces";

interface CheckoutItemCardProps extends HTMLAttributes<HTMLDivElement> {
  data: PreCheckoutItem;
}

function CheckoutItemCard({ data: item }: CheckoutItemCardProps) {
  const preSubTotal = parseInt(item.price) * item.quantity;
  return (
    <div className="flex justify-between mb-5">
      <div className="flex  items-center gap-x-4">
        <div className="h-24 w-24">
          <img
            src={item.img}
            className="h-full rounded-md w-full object-cover"
            alt=""
          />
        </div>
        <div className="">
          <div className="mb-3">
            {" "}
            <h4 className="font-kanit text-mainColor text-xl leading-none">
              {item.productName}
            </h4>
            <p className="font-kanit text-textColor text-lg">
              {" "}
              {formatCurrency(item.price)}
            </p>
          </div>{" "}
          <div className="">
            <p className="font-kanit text-lg text-textColor">
              x{item.quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="font-kanit text-mainColor text-lg">
          {formatCurrency(preSubTotal.toString())}
        </p>
      </div>
    </div>
  );
}

export default CheckoutItemCard;
