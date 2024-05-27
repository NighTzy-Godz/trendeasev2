import React from "react";
import { useGetMyOrdersQuery } from "../../store/apis/orderApi";
import ProfileNav from "../../components/ui/ProfileNav";
import { IOrder } from "../../interfaces/orderInteraces";
import { isFullModel } from "../../utils/isFullModel";
import { IUser } from "../../interfaces/userInterfaces";
import { IProduct } from "../../interfaces/productInterfaces";
import { formatProductCategory } from "../../utils/formatProductCategory";
import formatCurrency from "../../utils/formatCurrency";
import Button from "../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import handleBuyNow from "../../utils/handleBuyNow";

function UserOrders() {
  const { data } = useGetMyOrdersQuery("");
  const navigate = useNavigate();
  const myOrders = data as IOrder[];
  const renderMyOrders = myOrders?.map((item) => {
    const product = item.item.product as IProduct;
    return (
      <div className="w-full mb-10">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="w-32 h-32">
              <img
                src={product.images[0]}
                alt=""
                className="h-full w-full object-cover rounded-md"
              />
            </div>

            <div className="">
              <div className="mb-2">
                {" "}
                <Link
                  to={`/product/${product._id}`}
                  className="leading-none font-kanit text-2xl text-mainColor"
                >
                  {product.productName}
                </Link>
                <p className="font-kanit text-textColor">
                  {formatProductCategory(product.category)}
                </p>
              </div>
              <div className="flex gap-x-1 items-center">
                <div className="font-kanit text-mainColor text-sm">Status:</div>{" "}
                <p className="font-kanit text-textColor  text-sm">
                  {formatProductCategory(item.status)}
                </p>
              </div>
              <div className="flex gap-x-1 items-center">
                <div className="font-kanit text-mainColor text-sm">
                  Original Price
                </div>{" "}
                <p className="font-kanit text-textColor text-sm">
                  {formatCurrency(item.item.price.toString())}
                </p>
              </div>
              <div className="flex gap-x-1 items-center">
                <div className="font-kanit text-mainColor text-sm">
                  Quantity:
                </div>{" "}
                <p className="font-kanit text-textColor text-sm">
                  {item.item.quantity}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex gap-2">
              <h1 className="font-kanit text-xl text-mainColor">
                Order Total:
              </h1>
              <p className="font-kanit text-xl text-textColor">
                {formatCurrency(item.totalAmount.toString())}
              </p>
            </div>
            <div className=" flex justify-end">
              <Button
                size="sm"
                className="w-32"
                onClick={() => handleBuyAgain(product)}
              >
                Buy Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const handleBuyAgain = (data: IProduct) => {
    const res = handleBuyNow(data);
    res === 1 ? navigate("/checkout") : null;
  };

  return (
    <div className="py-10 bg-bgColor min-h-[92dvh]">
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4">
            <ProfileNav />
          </div>
          <div className="w-3/4">{renderMyOrders}</div>
        </div>
      </div>
    </div>
  );
}

export default UserOrders;
