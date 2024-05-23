import { ICart } from "../interfaces/cartInterfaces";

const subTotals = (userCart: ICart[]): string[] => {
  if (userCart) {
    const totalSub = userCart.map((cart) => {
      const numTotal = parseFloat(cart.item.price) * cart.quantity;
      return numTotal.toString();
    });
    return totalSub;
  }
  return [];
};

export default subTotals;
