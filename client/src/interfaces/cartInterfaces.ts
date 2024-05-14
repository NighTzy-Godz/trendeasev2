import { IProduct } from "./productInterfaces";

export interface ICart {
  item: IProduct;
  user: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
