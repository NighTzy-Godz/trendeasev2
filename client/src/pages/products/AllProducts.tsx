import React from "react";
import { useGetAllProductsQuery } from "../../store/apis/productsApi";
import { IProduct } from "../../interfaces/productInterfaces";
import ProductCard from "../../components/cards/ProductCard";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import productCategories from "../../data/productCategories";
import Button from "../../components/common/Button";

function AllProducts() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    productFilter: "electronics",
  });

  const page = searchParams.get("page");
  const productFilter = searchParams.get("productFilter");

  const productParams = {
    page,
    productFilter,
  };

  const { refetch, data } = useGetAllProductsQuery("");

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

  const handleCategoryChange = (category: string) => {
    setSearchParams(
      (prev) => {
        prev.set("productFilter", category);
        return prev;
      },
      { replace: true }
    );
  };

  const handleApplyFilter = () => {
    console.log(page, productFilter);
  };

  const renderProductCategories = productCategories.map((category) => {
    const isActive = productFilter === category.value;
    return (
      <div className="flex items-center gap-x-2 mb-3" key={category.id}>
        <input
          type="radio"
          name="category"
          value={category.value}
          id={`radio-${category.id}`}
          className="hidden"
          checked={isActive}
          onChange={() => handleCategoryChange(category.value)}
        />
        <label
          htmlFor={`radio-${category.id}`}
          className="flex items-center cursor-pointer"
        >
          <span
            className={`w-4 h-4 inline-block mr-2 border  rounded-full ${
              isActive ? "bg-mainColor border-mainColor" : "border-textColor"
            }`}
          ></span>
          <p
            className={`text-textColor font-kanit text-xl ${
              isActive ? "text-activeColor" : ""
            }`}
          >
            {category.name}
          </p>
        </label>
      </div>
    );
  });

  return (
    <div className="py-20 bg-bgColor">
      <div className="container mx-auto">
        <div className="flex gap-x-10">
          <div className="w-1/5 ">
            <div className="sticky top-0 mt-5 bg-bgColorHover rounded-md px-3 py-5">
              <h1 className="font-kanit text-3xl mb-5 text-mainColor">
                Categories
              </h1>
              {renderProductCategories}

              <div className="">
                <Button onClick={handleApplyFilter}>Apply Filter</Button>
              </div>
            </div>
          </div>
          <div className="w-4/5 ">
            <div className="grid grid-cols-4 gap-7 mb-5 pt-5">
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
