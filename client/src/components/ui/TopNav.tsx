import React, { useEffect, useState } from "react";
import { IoStorefront } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setShowLoginModal } from "../../store/slices/ui";
function TopNav() {
  const dispatch = useDispatch();
  const navClassName = `font-kanit text-lg text-textColor hover:text-mainColor`;

  const [navToggle, setNavToggle] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 1500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1024) setNavToggle(false);
  }, [windowWidth]);
  console.log(navToggle);
  return (
    <nav className="bg-bgColor py-4 ">
      <div className="container mx-auto relative">
        <div className="flex lg:justify-normal justify-between lg:flex-nowrap flex-wrap  items-center  gap-4 lg:w-auto w-full ">
          <div className="flex items-center gap-1">
            <IoStorefront className="text-textColor h-7 w-7" />
            <h1 className="text-3xl text-mainColor font-oswald font-bold">
              Trendease
            </h1>
          </div>

          <div className="flex items-center gap-3    order-1 lg:order-3">
            <ul className="flex lg:gap-5 gap-3 items-center order-1">
              <li>
                <FaUser
                  className="w-6 h-6 text-textColor cursor-pointer font-semibold"
                  onClick={() => dispatch(setShowLoginModal(true))}
                />
              </li>
              <li>
                <FaHeart className="w-6 h-6 text-textColor cursor-pointer font-semibold" />
              </li>
              <li>
                <FaCartShopping className="w-6 h-6 text-textColor cursor-pointer font-semibold" />
              </li>
            </ul>
            <div
              className="lg:hidden order-2"
              onClick={() => setNavToggle(!navToggle)}
            >
              <RxHamburgerMenu className="w-6 h-6 text-textColor" />
            </div>
          </div>
          <div
            className={`lg:flex lg:justify-between order-2 w-full  ${
              navToggle ? "block" : "hidden"
            }`}
          >
            <div className=""></div>
            <ul className="lg:flex lg:items-center lg:gap-5 lg:mb-0 mb-3">
              <li>
                <NavLink to="/" className={navClassName}>
                  Home
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/shop" className={navClassName}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-product" className={navClassName}>
                  Add Product
                </NavLink>
              </li>
            </ul>
            <div className="flex gap-3">
              <div className="relative mt-1">
                <input
                  type="text"
                  className="px-3 pb-0 pt-0 mb-1 text-textColor text-sm  h-8 border rounded-full disabled:cursor-not-allowed disabled:opacity-50 border-textColor bg-transparent focus:border-mainColor focus:ring-mainColor outline-none
                "
                />
                <button className="absolute right-3 top-[6px] cursor-pointer">
                  <IoSearch className="h-5 w-5 text-textColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
{
  /* <ul className="flex gap-5 items-center">
<li>
  <FaUser
    className="w-6 h-6 text-textColor cursor-pointer font-semibold"
    onClick={() => dispatch(setShowLoginModal(true))}
  />
</li>
<li>
  <FaHeart className="w-6 h-6 text-textColor cursor-pointer font-semibold" />
</li>
<li>
  <FaCartShopping className="w-6 h-6 text-textColor cursor-pointer font-semibold" />
</li>
</ul> */
}
