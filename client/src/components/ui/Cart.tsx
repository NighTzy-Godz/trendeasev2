import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

import { useGetUserCartQuery } from "../../store/apis/cartApi";
import { ICart } from "../../interfaces/cartInterfaces";

import CartCard from "../cards/CartCard";
import { useDispatch } from "react-redux";
import { setShowUserCart } from "../../store/slices/ui";
import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";
import calculateSubtotal from "../../utils/calculateSubtotal";

interface CartProps {
  isShow: boolean;
  onCartClose(): void;
}

function Cart({ isShow, onCartClose }: CartProps) {
  const { data } = useGetUserCartQuery("");
  const dispatch = useDispatch();
  const cartRef = useRef<HTMLDivElement>(null);
  const userCart = data as ICart[];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      console.log(cartRef.current);
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        dispatch(setShowUserCart(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartRef]);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShow]);

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

  const subTotals = (): string[] => {
    if (userCart) {
      const totalSub = userCart.map((cart) => {
        const numTotal = parseFloat(cart.item.price) * cart.quantity;
        return numTotal.toString();
      });
      return totalSub;
    }
    return [];
  };

  return (
    <React.Fragment>
      {isShow && <div className="w-dvw top-0 h-dvh fixed bg-black/50 " />}{" "}
      <div
        ref={cartRef}
        className={`transition duration-700 ease-in-out  ${
          isShow ? "translate-x-0  delay-150 " : " translate-x-full"
        } w-80 h-dvh right-0  bg-textColor fixed top-0  flex flex-col z-50`}
      >
        <div className="px-5 py-3 overflow-auto ">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="font-kanit text-xl text-bgColor">Shopping Cart</h3>
            <IoClose
              className="text-bgColor h-6 w-6 mt-[2px] cursor-pointer"
              onClick={onCartClose}
            />
          </div>

          {renderCartItems()}
        </div>
        <div className=" h-40 w-full inset-x-0 bottom-0 z-50 ">
          <div className="px-5 py-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-kanit font-semibold text-bgColor text-xl">
                Subtotal
              </h3>
              <p className="font-kanit text-xl text-mainColor">
                {formatCurrency(calculateSubtotal(subTotals()))}
              </p>
            </div>
            <p className="font-kanit leading-none text-sm text-bgColor">
              Taxes and shipping calculated at checkout
            </p>

            <div className="mt-3">
              <Button>Checkout</Button>
            </div>
          </div>
        </div>
      </div>{" "}
    </React.Fragment>
  );
}

export default Cart;
