import React from "react";
import { useGetAllProductsQuery } from "../../store/apis/productsApi";
import { IProduct } from "../../interfaces/productInterfaces";
import ProductCard from "../../components/cards/ProductCard";

function AllProducts() {
  const { data } = useGetAllProductsQuery("");

  const products = data as IProduct[];

  const renderProducts = () => {
    if (products?.length === 0) return <h1>No Products Here</h1>;
    return products?.map((item) => {
      return <ProductCard data={item} />;
    });
  };
  return (
    <div className="py-20 bg-bgColor">
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/5"></div>
          <div className="w-4/5">
            <div className="grid grid-cols-4 gap-7"> {renderProducts()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
