import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../store/apis/productsApi";
import { Link, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/productInterfaces";
import Slider from "react-slick";
import ImageCarousel from "../../components/ui/ImageCarousel";
import Button from "../../components/common/Button";

function ProductDetails() {
  const { productId } = useParams();
  const { data } = useGetProductDetailsQuery(productId);

  const { productName, images, price, description, category, quantity } =
    (data as IProduct) || {};

  const [mainImg, setMainImg] = useState("");
  useEffect(() => {
    setMainImg(images?.[0]);
  }, [images]);
  const handleImgClick = (imgLink: string) => {
    setMainImg(imgLink);
  };

  return (
    <div className="py-20 bg-bgColor">
      <div className="container mx-auto">
        <div className="flex gap-10 mb-20">
          <div className="w-2/5 ">
            <ImageCarousel
              mainImg={mainImg}
              onImgClick={handleImgClick}
              images={images}
            />
          </div>

          <div className="w-3/5">
            <div className="mb-5">
              <h3 className="font-oswald tracking-wide text-4xl text-mainColor">
                Anta Frenzy 5th Generation Nitrogen Technology Cement Buster
                Anti-slip Wear-resistant Basketball Shoes
              </h3>
            </div>
            <div className="mb-2">
              <p className="font-kanit text-textColor ">
                4.5/5 Stars (5 Review)
              </p>
            </div>

            <div className="mb-8 flex gap-2 items-center">
              <p className="font-kanit font-semibold text-mainColor">
                Sold By:
              </p>
              <Link
                to="#"
                className="font-kanit text-textColor hover:underline"
              >
                Aser James
              </Link>
            </div>

            <div className="mb-8 ">
              <p className="tracking-[2px] font-kanit text-textColor text-4xl ">
                P{price}
              </p>
            </div>

            <div className="mb-8 flex gap-2 items-center">
              <p className="font-kanit text-2xl text-mainColor">Quantity:</p>
              <p className="font-kanit text-textColor text-xl ">
                {" "}
                {quantity} Pieces
              </p>
            </div>

            <div className="mb-8 flex gap-2 items-center">
              <p className="font-kanit text-2xl text-mainColor">
                Availability:
              </p>
              <p className="font-kanit text-textColor text-xl e"> On Stock</p>
            </div>
            <div className="mb-20 flex gap-2 items-center">
              <p className="font-kanit text-2xl text-mainColor">Category:</p>
              <p className="font-kanit text-textColor text-xl "> {category}</p>
            </div>

            <div className="mb-5 flex gap-5">
              <Button className="w-60">Add To Cart</Button>
              <Button className="w-60" variant="sub">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
