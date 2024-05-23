const SHIPPING_FEE = 40;

const calculateTotal = (subTotal: string, tax: string) => {
  if (!subTotal || !tax) return "0";

  const numSubtotal = parseFloat(subTotal);
  const numTax = parseFloat(tax);

  const numTotalVal = SHIPPING_FEE + numSubtotal + numTax;

  return new Intl.NumberFormat("en-PH", {
    currency: "PHP",
    style: "currency",
  }).format(numTotalVal);
};

export default calculateTotal;
