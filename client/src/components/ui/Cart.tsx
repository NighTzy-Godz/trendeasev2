import React from "react";
import { IoClose } from "react-icons/io5";

import IMG from "../../assets/img/defaultStorePfp.png";

interface CartProps {
  isShow: boolean;
  onCartClose(): void;
}
function Cart({ isShow, onCartClose }: CartProps) {
  return (
    <React.Fragment>
      {isShow && <div className="w-dvw top-0 h-dvh fixed bg-black/50 " />}

      <div
        className={`transition duration-700 ease-in-out ${
          isShow ? "translate-x-0  delay-150 " : " translate-x-full"
        } w-96 h-dvh right-0  bg-textColor fixed top-0  `}
      >
        <div className="px-5 py-3 ">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="font-kanit text-xl text-bgColor">Shopping Cart</h3>
            <IoClose
              className="text-bgColor h-6 w-6 mt-[2px] cursor-pointer"
              onClick={onCartClose}
            />
          </div>

          <div className="mb-5">
            {" "}
            <div className="flex">
              <div className="w-1/3">
                <div className="h-24 w-24">
                  {" "}
                  <img
                    src={IMG}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="w-2/3 ">
                <h3 className="font-kanit text-bgColor ">Product Name</h3>
                <p className="font-kanit text-mainColor ">P 10,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cart;
