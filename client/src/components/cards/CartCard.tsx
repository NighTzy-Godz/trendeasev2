import React, { useEffect } from "react";
import { ICart } from "../../interfaces/cartInterfaces";
import Button from "../common/Button";
import { MdDelete } from "react-icons/md";
import {
  useDeleteCartMutation,
  useUpdateCartQtyMutation,
} from "../../store/apis/cartApi";
import { useDispatch } from "react-redux";
import { setShowUserCart } from "../../store/slices/ui";
import { toast } from "react-toastify";
import { renderError } from "../../utils/utils";
import CartCounter from "../ui/CartCounter";
import formatCurrency from "../../utils/formatCurrency";

interface CartCardProps {
  cart: ICart;
}

function CartCard({ cart }: CartCardProps) {
  const dispatch = useDispatch();
  const [deleteCart, deleteCartResult] = useDeleteCartMutation();
  const [updateCart] = useUpdateCartQtyMutation();

  useEffect(() => {
    if (deleteCartResult.isSuccess) {
      dispatch(setShowUserCart(true));
    }
    if (deleteCartResult.isError) {
      renderError(deleteCartResult.error);
    }
  }, [deleteCartResult]);

  const handleAddQty = () => {
    updateCart({
      cartId: cart._id,
      qty: cart.quantity + 1,
    });
  };

  const handleDecreaseQty = () => {
    if (cart.quantity <= 1) return;
    updateCart({
      cartId: cart._id,
      qty: cart.quantity - 1,
    });
  };

  const handleDeleteCart = () => {
    deleteCart(cart._id);
    toast.success("Successfully Deleted the Cart Item!");
  };
  return (
    <div className="mb-8">
      {" "}
      <div className="flex gap-x-4">
        <div className="w-1/2 ">
          <div className="h-32 w-32">
            {" "}
            <img
              src={cart.item.images?.[0]}
              alt=""
              className="h-full w-full object-cover border rounded-md"
            />
          </div>
        </div>
        <div className="w-1/2 ">
          <h3 className="leading-none font-kanit text-bgColor text-lg whitespace-nowrap text-ellipsis overflow-hidden">
            {cart.item?.productName}
          </h3>
          <p className="font-kanit text-mainColor mb-3">
            {formatCurrency(cart.item.price)}
          </p>

          <CartCounter
            onDecreaseQty={handleDecreaseQty}
            onIncreaseQty={handleAddQty}
            value={cart.quantity}
          />

          <Button
            variant="error"
            size="xs"
            className="mt-2 w-12"
            onClick={handleDeleteCart}
          >
            <MdDelete className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
