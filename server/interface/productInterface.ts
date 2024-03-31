export enum ProductCategory {
  Electronics = "electronics",
  Fashion = "fashion",
  Appliances = "appliances",
  Apparel = "apparel",
  Instruments = "instruments",
  Sports = "sports",
  Health_and_Beauty = "health and beauty",
}

export interface CreateProduct {
  productName: string;
  description: string;
  price: string;
  quantity: string;
  category: ProductCategory;
}
