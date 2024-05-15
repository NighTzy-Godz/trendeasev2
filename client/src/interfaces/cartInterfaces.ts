import { IProduct } from "./productInterfaces";

export interface ICart {
  _id: string;
  item: IProduct;
  user: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
