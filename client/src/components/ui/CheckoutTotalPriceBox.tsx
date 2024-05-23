import React from "react";
import formatCurrency from "../../utils/formatCurrency";
import calculateTotal from "../../utils/calculateTotal";

interface CheckoutTotalPriceBoxProps {
  subTotal: string;
  totalTax: string;
}

function CheckoutTotalPriceBox({
  subTotal,
  totalTax,
}: CheckoutTotalPriceBoxProps) {
  return (
    <div className="w-full border rounded-md  border-textColor p-3">
      <div className="mb-5">
        <h1 className=" leading-snug text-2xl text-mainColor font-kanit">
          Payment Details
        </h1>
        <p className="text-sm font-kanit text-textColor">
          Review all the total with subtotal, tax and shipping fee
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-kanit text-textColor">Merchandise Total:</p>
        <p className="font-kanit text-mainColor">{formatCurrency(subTotal)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-kanit text-textColor">Shipping Fee:</p>
        <p className="font-kanit text-mainColor">{formatCurrency("40")}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-kanit text-textColor">Tax:</p>
        <p className="font-kanit text-mainColor">{formatCurrency(totalTax)}</p>
      </div>

      <div className=" mt-2 mb-4 w-full h-[2px] bg-mainColor"></div>

      <div className="flex items-center justify-between">
        <h3 className="font-kanit text-textColor text-2xl">Total Payment:</h3>
        <p className="font-kanit text-2xl text-mainColor">
          {calculateTotal(subTotal, totalTax)}
        </p>
      </div>
    </div>
  );
}

export default CheckoutTotalPriceBox;
