import React from "react";

import ProfileNav from "../../components/ui/ProfileNav";
import ProductCard from "../../components/cards/ProductCard";
import { IProduct } from "../../interfaces/productInterfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetStoreProductsQuery } from "../../store/apis/productsApi";
import ProductList from "../../components/containers/ProductList";

function ManageStoreProducts() {
  const user = useSelector((state: RootState) => state.auth.decodedUser);

  const { data, isLoading } = useGetStoreProductsQuery(user);

  const storeProducts = data as IProduct[];

  const renderStoreProducts = () => {
    if (storeProducts?.length === 0) return <h1>There is no Products Here</h1>;
    return storeProducts?.map((item) => {
      return (
        <React.Fragment key={item._id}>
          <ProductCard data={item} />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="py-10 bg-bgColor min-h-[92dvh]">
      <div className="container mx-auto">
        <div className="flex gap-7">
          <div className="w-1/4">
            <ProfileNav />
          </div>
          <ProductList>{renderStoreProducts()}</ProductList>
        </div>
      </div>
    </div>
  );
}

export default ManageStoreProducts;
