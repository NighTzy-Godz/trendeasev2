const TAX_RATE = 0.012;

const calculateTax = (subTotal: string): string => {
  if (!subTotal) return "0";
  const taxNumberVal = parseInt(subTotal) * TAX_RATE;
  return taxNumberVal.toString();
};

export default calculateTax;
