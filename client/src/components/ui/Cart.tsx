import React from "react";
import { IoClose } from "react-icons/io5";

import IMG from "../../assets/img/defaultStorePfp.png";
import { useGetUserCartQuery } from "../../store/apis/cartApi";
import { ICart } from "../../interfaces/cartInterfaces";

interface CartProps {
  isShow: boolean;
  onCartClose(): void;
}
function Cart({ isShow, onCartClose }: CartProps) {
  const { data } = useGetUserCartQuery("");

  const userCart = data as ICart[];

  const renderCartItems = () => {
    if (userCart?.length === 0) return <h1>No Cart Available</h1>;
    if (userCart) {
      return userCart.map((cart) => {
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
                <h3 className="font-kanit text-bgColor text-xl whitespace-nowrap text-ellipsis overflow-hidden">
                  {cart.item?.productName}
                </h3>
                <p className="font-kanit text-mainColor text-lg">
                  P {cart.item?.price}
                </p>

                <p className="font-kanit mt-2 text-bgColor text-lg">
                  Quantity: {cart.quantity}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <React.Fragment>
      {isShow && <div className="w-dvw top-0 h-dvh fixed bg-black/50 " />}

      <div
        className={`transition duration-700 ease-in-out ${
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
