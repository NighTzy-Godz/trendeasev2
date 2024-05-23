import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../store/apis/productsApi";
import { Link, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/productInterfaces";

import ImageCarousel from "../../components/ui/ImageCarousel";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAddToCartMutation } from "../../store/apis/cartApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setShowLoginModal, setShowUserCart } from "../../store/slices/ui";
import formatCurrency from "../../utils/formatCurrency";
import { PreCheckoutItem } from "../../interfaces/orderInteraces";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { data } = useGetProductDetailsQuery(productId);
  const [addCart, addCartResult] = useAddToCartMutation();

  const currUser = useSelector((state: RootState) => state.auth.decodedUser);
  const {
    productName,
    images,
    price,
    description,
    category,
    quantity,
    store,
    _id,
  } = (data as IProduct) || {};

  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    setMainImg(images?.[0]);
  }, [images]);

  useEffect(() => {
    if (addCartResult.isSuccess) dispatch(setShowUserCart(true));
  }, [addCartResult]);

  const handleCartClick = () => {
    if (!currUser) {
      toast.error("You need to Login first");
      return dispatch(setShowLoginModal(true));
    }
    return addCart(productId);
  };

  const handleBuyNow = () => {
    const existingCheckoutItems = localStorage.getItem("checkoutItemsConfig");
    if (existingCheckoutItems) localStorage.removeItem("checkoutItemsConfig");

    const checkoutItem: PreCheckoutItem = {
      product: _id,
      quantity: 1,
      price: price,
      productOwner: store,
      img: images[0],
      productName: productName,
    };

    const checkoutItemsConfig = { clearCart: false, items: [checkoutItem] };

    localStorage.setItem(
      "checkoutItemsConfig",
      JSON.stringify(checkoutItemsConfig)
    );

    if (!currUser) {
      localStorage.setItem("redirectRoute", "/checkout");
      toast.error("You need to Login first");
      return dispatch(setShowLoginModal(true));
    }
  };

  const renderProductButtons = () => {
    if (currUser?.store !== store)
      return (
        <React.Fragment>
          <Button className="w-60" onClick={handleCartClick}>
            Add To Cart
          </Button>
          <Button className="w-60" variant="sub" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </React.Fragment>
      );

    return (
      <React.Fragment>
        {" "}
        <Button className="w-60">Delete Product</Button>
        <Button className="w-60" variant="sub">
          Edit Product
        </Button>
      </React.Fragment>
    );
  };

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
                {formatCurrency(price)}
              </p>
            </div>

            <div className="mb-5 flex gap-2 items-center">
              <p className="font-kanit text-2xl text-mainColor">Quantity:</p>
              <p className="font-kanit text-textColor text-xl ">
                {" "}
                {quantity} Pieces
              </p>
            </div>

            <div className="mb-5 flex gap-2 items-center">
              <p className="font-kanit text-2xl text-mainColor">
                Availability:
              </p>
              <p className="font-kanit text-textColor text-xl e"> On Stock</p>
            </div>
            <div className="mb-20 flex gap-2 items-center">
              <p className="font-kanit text-2xl text-mainColor">Category:</p>
              <p className="font-kanit text-textColor text-xl "> {category}</p>
            </div>

            <div className="mb-5 flex gap-5">{renderProductButtons()}</div>
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
