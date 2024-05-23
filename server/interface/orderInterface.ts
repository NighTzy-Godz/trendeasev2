export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH ON DELIVERY",
  CARD_PAYMENT = "CARD PAYMENT",
}

export interface AddOrder {
  clearCart: boolean;
  paymentMethod: PaymentMethod;
  checkoutItems: string[];
  shippingAddress: {
    houseNumber: string;
    street: string;
    province: string;
    municipality: string;
    baranggay: string;
  };
}
