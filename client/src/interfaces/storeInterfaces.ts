import { IProduct } from "./productInterfaces";
import { IUser } from "./userInterfaces";

export interface CreateStoreData {
  storeName: string;
  description: string;
  email: string;
  phone: string;
}

export interface IStore extends Document {
  pfp: string;

  storeName: string;
  description: string;
  owner: string | IUser;
  products: string[] | IProduct[];
  createdAt: Date;
  updatedAt: Date;
}
