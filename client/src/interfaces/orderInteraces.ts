export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH ON DELIVERY",
  CARD_PAYMENT = "CARD PAYMENT",
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
  productOwner: string;
}

export interface CheckoutItemConfig {
  items: PreCheckoutItem[];
  clearCart: boolean;
}

export interface PreCheckoutItem {
  img: string;
  price: string;
  product: string;
  productName: string;
  productOwner: string;
  quantity: number;
}

export interface AddOrderData {
  clearCart: boolean;
  paymentMethod: PaymentMethod;
  checkoutItems: OrderItem[];
  shippingAddress: {
    houseNumber: string;
    street: string;
    province: string;
    municipality: string;
    baranggay: string;
  };
}
