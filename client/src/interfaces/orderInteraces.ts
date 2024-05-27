import { IProduct } from "./productInterfaces";
import { IStore } from "./storeInterfaces";
import { IUser } from "./userInterfaces";

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
export enum OrderStatus {
  PENDING = "PENDING",
  DELIVERING = "DELIVERING",
  RECIEVED = "RECIEVED",
  CANCELLED = "CANCELLED",
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

export interface IOrder {
  buyer: string | IUser;
  status: OrderStatus;
  item: {
    product: string | IProduct;
    quantity: number;
    price: number;
    productOwner: string | IStore;
  };
  paymentMethod: PaymentMethod;
  shippingAddress: {
    houseNumber: string;
    street: string;
    province: string;
    municipality: string;
    barangay: string;
  };
  subTotal: number;
  shippingFee: number;
  totalAmount: number;
  tax: number;
}
