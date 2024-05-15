import React from "react";
import { IProduct } from "../../interfaces/productInterfaces";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

interface ProductCardProps {
  data: IProduct;
}

function ProductCard({ data }: ProductCardProps) {
  const { images, productName, price, _id } = data || {};
  return (
    <div>
      <Link to={`/product/${_id}`}>
        <div className="h-72 ">
          <img
            className="rounded-md h-full w-full object-cover"
            loading="lazy"
            src={images[0]}
            alt=""
          />
        </div>
      </Link>
      <div className="mt-2">
        <h3 className="font-kanit text-lg text-mainColor whitespace-nowrap text-ellipsis overflow-hidden">
          {productName}
        </h3>{" "}
        <p className="font-kanit text-textColor ">{formatCurrency(price)}</p>
      </div>{" "}
    </div>
  );
}

export default ProductCard;
