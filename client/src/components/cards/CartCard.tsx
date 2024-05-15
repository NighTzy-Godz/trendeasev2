import React, { useEffect } from "react";
import { ICart } from "../../interfaces/cartInterfaces";
import Button from "../common/Button";
import { MdDelete } from "react-icons/md";
import { useDeleteCartMutation } from "../../store/apis/cartApi";
import { useDispatch } from "react-redux";
import { setShowUserCart } from "../../store/slices/ui";
import { toast } from "react-toastify";
import { renderError } from "../../utils/utils";

interface CartCardProps {
  cart: ICart;
}

function CartCard({ cart }: CartCardProps) {
  const dispatch = useDispatch();
  const [deleteCart, deleteCartResult] = useDeleteCartMutation();

  useEffect(() => {
    if (deleteCartResult.isSuccess) {
      dispatch(setShowUserCart(true));
    }
    if (deleteCartResult.isError) {
      renderError(deleteCartResult.error);
    }
  }, [deleteCartResult]);

  const handleDeleteCart = () => {
    deleteCart(cart._id);
  };
  return (
    <div className="mb-5">
      {" "}
      <div className="flex ">
        <div className="w-1/2 ">
          <div className="h-32 w-32">
            {" "}
            <img
              src={cart.item.images?.[0]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 ">
          <h3 className="leading-none font-kanit text-bgColor text-xl whitespace-nowrap text-ellipsis overflow-hidden">
            {cart.item?.productName}
          </h3>
          <p className="font-kanit text-mainColor text-lg">
            P {cart.item?.price}
          </p>

          <p className="font-kanit mt-2 text-bgColor text-lg">
            Quantity: {cart.quantity}
          </p>

          <Button
            variant="error"
            size="sm"
            className="mt-2 w-12"
            onClick={handleDeleteCart}
          >
            <MdDelete className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
