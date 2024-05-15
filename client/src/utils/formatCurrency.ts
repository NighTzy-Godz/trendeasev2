export default function (value: string): string {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) {
    return value;
  }

  const formattedCurrency = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(numberValue);

  return formattedCurrency;
}
