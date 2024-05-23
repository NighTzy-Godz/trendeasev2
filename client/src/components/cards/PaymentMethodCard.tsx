import React, { HTMLAttributes } from "react";
import { IPaymentMethod } from "../../data/paymentMethod";

interface PaymentMethodCardProps extends HTMLAttributes<HTMLDivElement> {
  data: IPaymentMethod;
  currPaymentMethod: IPaymentMethod;
  onPaymentMethodClick(data: IPaymentMethod): void;
}

function PaymentMethodCard({
  data,
  currPaymentMethod,
  onPaymentMethodClick,
}: PaymentMethodCardProps) {
  return (
    <div
      className={`w-72 border cursor-pointer bg- ${
        currPaymentMethod.id === data.id
          ? "bg-mainColor border-mainColor"
          : "border-textColor"
      }  rounded-md py-3 px-5`}
      key={data.id}
      onClick={() => onPaymentMethodClick(data)}
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-kanit text-textColor text-xl">{data.name}</h1>
      </div>
      <p className="font-kanit text-xs text-textColor">{data.definition}</p>
    </div>
  );
}

export default PaymentMethodCard;
