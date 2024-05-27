import { PreCheckoutItem } from "../interfaces/orderInteraces";
import { IProduct } from "../interfaces/productInterfaces";

const handleBuyNow = (data: IProduct) => {
  if (!data) return 0;

  const { productName, images, price, store, _id } = (data as IProduct) || {};

  const existingCheckoutItems = localStorage.getItem("checkoutItemsConfig");
  if (existingCheckoutItems) localStorage.removeItem("checkoutItemsConfig");

  const checkoutItem: PreCheckoutItem = {
    product: _id,
    quantity: 1,
    price: price,
    productOwner: store,
    img: images[0],
    productName: productName,
  };

  const checkoutItemsConfig = { clearCart: false, items: [checkoutItem] };

  try {
    localStorage.setItem(
      "checkoutItemsConfig",
      JSON.stringify(checkoutItemsConfig)
    );

    return 1;
  } catch (error) {
    console.log(error);
  }
};

export default handleBuyNow;
