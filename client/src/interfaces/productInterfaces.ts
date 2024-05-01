export enum ProductCategory {
  Electronics = "electronics",
  Fashion = "fashion",
  Appliances = "appliances",
  Apparel = "apparel",
  Instruments = "instruments",
  Sports = "sports",
  Health_and_Beauty = "health and beauty",
}

export interface CreateProductData {
  productName: string;
  description: string;
  price: string;
  quantity: string;
  category: ProductCategory;
  img: FileList;
}

export interface IProduct {
  _id: string;
  productName: string;
  description: string;
  price: string;
  quantity: string;
  category: ProductCategory;
  images: string[];
  store: string;
  relatedProducts: string | IProduct[];
  createdAt: Date;
  updatedAt: Date;
}
