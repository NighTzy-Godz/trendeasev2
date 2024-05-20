import React from "react";

function calculateSubtotal(prices: string[]): string {
  if (prices?.length === 0) return "0";

  const numericPrices = prices?.map((price) => {
    return parseFloat(price);
  });

  const total = numericPrices?.reduce((acc, currVal) => acc + currVal, 0);

  return total?.toString();
}

export default calculateSubtotal;
