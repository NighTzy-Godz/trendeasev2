export interface IPaymentMethod {
  id: number;
  name: string;
  value: string;
  definition: string;
}

const paymentMethod = [
  {
    id: 0,
    name: "Cash on Delivery",
    value: "CASH ON DELIVERY",
    definition: "Pay when you recieved the item",
  },
  {
    id: 1,
    name: "Card Payment",
    value: "CARD PAYMENT",
    definition: "Pay ahead using your card ",
  },
];

export default paymentMethod;
