import React from "react";
import { useGetAllProductsQuery } from "../../store/apis/productsApi";
import { IProduct } from "../../interfaces/productInterfaces";
import ProductCard from "../../components/cards/ProductCard";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

function AllProducts() {
  const { data } = useGetAllProductsQuery("");
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    productFilter: "",
  });

  const page = searchParams.get("page");
  const productFilter = searchParams.get("productSearch");

  const products = data as IProduct[];

  const renderProducts = () => {
    if (products?.length === 0) return <h1>No Products Here</h1>;
    return products?.map((item) => {
      return (
        <React.Fragment key={item._id}>
          <ProductCard data={item} />
        </React.Fragment>
      );
    });
  };

  console.log(page);
  const handlePageChange = (page: number) => {
    const realPage = page + 1;
    setSearchParams(
      (prev) => {
        prev.set("page", realPage.toString());
        return prev;
      },
      { replace: true }
    );
  };
  return (
    <div className="py-20 bg-bgColor">
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/5"></div>
          <div className="w-4/5">
            <div className="grid grid-cols-4 gap-7 mb-5">
              {" "}
              {renderProducts()}
            </div>
            <ReactPaginate
              pageCount={5}
              activeClassName="bg-mainColor"
              pageClassName="font-kanit h-8 w-8 flex justify-center items-center text-textColor  rounded-full"
              className="flex gap-x-2"
              previousClassName="font-kanit h-8 w-8 flex justify-center items-center text-textColor  mr-2"
              previousLabel="<"
              nextClassName="font-kanit h-8 w-8 flex justify-center items-center text-textColor  ml-2"
              nextLabel=">"
              forcePage={parseInt(page as string) - 1}
              onPageChange={({ selected: page }) => handlePageChange(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
