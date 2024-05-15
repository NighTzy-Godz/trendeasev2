import React from "react";
import { IoClose } from "react-icons/io5";

import IMG from "../../assets/img/defaultStorePfp.png";
import {
  useDeleteCartMutation,
  useGetUserCartQuery,
} from "../../store/apis/cartApi";
import { ICart } from "../../interfaces/cartInterfaces";
import Button from "../common/Button";
import { MdDelete } from "react-icons/md";
import CartCard from "../cards/CartCard";
interface CartProps {
  isShow: boolean;
  onCartClose(): void;
}
function Cart({ isShow, onCartClose }: CartProps) {
  const { data } = useGetUserCartQuery("");

  const userCart = data as ICart[];

  const renderCartItems = () => {
    if (userCart?.length === 0) return <h1>No Cart Available</h1>;

    return userCart?.map((cart) => {
      return (
        <React.Fragment key={cart._id}>
          <CartCard cart={cart} />
        </React.Fragment>
      );
    });
  };

  return (
    <React.Fragment>
      {isShow && <div className="w-dvw top-0 h-dvh fixed bg-black/50 " />}

      <div
        className={`transition duration-700 ease-in-out  ${
          isShow ? "translate-x-0  delay-150 " : " translate-x-full"
        } w-80 h-dvh right-0  bg-textColor fixed top-0  `}
      >
        <div className="px-5 py-3 ">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="font-kanit text-xl text-bgColor">Shopping Cart</h3>
            <IoClose
              className="text-bgColor h-6 w-6 mt-[2px] cursor-pointer"
              onClick={onCartClose}
            />
          </div>

          {renderCartItems()}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cart;
