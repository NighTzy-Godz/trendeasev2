import React, { useEffect, useState } from "react";
import { IoStorefront } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setShowLoginModal } from "../../store/slices/ui";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PFP from "../../assets/img/defaultUserPfp.png";

interface TopNavProps {
  token: string | null;
}

function TopNav({ token }: TopNavProps) {
  const dispatch = useDispatch();
  const navClassName = `font-kanit text-lg text-textColor hover:text-mainColor`;

  const currUser = useSelector((state: RootState) => state.auth.decodedUser);

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
                <FaHeart className="w-6 h-6 text-textColor cursor-pointer font-semibold" />
              </li>
              <li>
                <FaCartShopping className="w-6 h-6 text-textColor cursor-pointer font-semibold" />
              </li>
              {!token ? (
                <li>
                  <FaUser
                    className="w-6 h-6 text-textColor cursor-pointer font-semibold"
                    onClick={() => dispatch(setShowLoginModal(true))}
                  />
                </li>
              ) : (
                <Link to="/user/profile" className="w-8 h-8">
                  {" "}
                  <img
                    className="w-8 h-8 block rounded-full"
                    src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/428614910_1573169330203091_1427140977305999776_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEq7J5oTpqrejAm1VnZly6Bu9mflR7u2RO72Z-VHu7ZEwKcBt5U9LWR6hkOX7IQJAgjoic0zGEMUBGXP4d-qKg9&_nc_ohc=X7ypD3i3QzgAb404K0M&_nc_ht=scontent.fmnl9-2.fna&oh=00_AfBYgEhhURu4pY0ESf0NISrw2hZbWIOOUm4OH0gfecUHYg&oe=661452EF"
                    alt=""
                  />
                </Link>
              )}
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
