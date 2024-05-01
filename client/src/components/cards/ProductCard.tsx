import React from "react";
import { IProduct } from "../../interfaces/productInterfaces";
import { Link } from "react-router-dom";

interface ProductCardProps {
  data: IProduct;
}

function ProductCard({ data }: ProductCardProps) {
  const { images, productName, price } = data;
  return (
    <div>
      <Link to="#">
        <div className="h-52 ">
          <img
            className="h-full w-full object-cover"
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
        <p className="font-kanit text-textColor ">P {price}</p>
      </div>{" "}
    </div>
  );
}

export default ProductCard;
