import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "./pages/static/HomeLayout";
import Home from "./pages/static/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import UserProfile from "./pages/user/UserProfile";
import AllProducts from "./pages/products/AllProducts";
import LogOut from "./pages/static/LogOut";
import CreateStore from "./pages/store/CreateStore";
import { setCurrUser } from "./store/slices/user";
import { useGetUserDataQuery } from "./store/apis/userApi";
import CreateProduct from "./pages/store/CreateProduct";
import ManageStoreProducts from "./pages/store/ManageStoreProducts";
import ProductDetails from "./pages/products/ProductDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/css/img_slider.css";
import Checkout from "./pages/static/Checkout";
import UserOrders from "./pages/user/UserOrders";
import UserProfileLayout from "./components/user/UserProfileLayout";
import RedirectLastPage from "./components/common/RedirectLastPage";
import UserChangePassword from "./pages/user/UserChangePassword";

function App() {
  const colorTheme = useSelector((state: RootState) => state.ui.colorTheme);
  const currUser = useSelector((state: RootState) => state.currUser.currUser);
  const dispatch = useDispatch();
  const { data } = useGetUserDataQuery("");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorTheme);
  }, []);

  useEffect(() => {
    if (!currUser && data) dispatch(setCurrUser(data));
  }, [data, currUser]);

  return (
    <BrowserRouter>
      <ToastContainer transition={Zoom} autoClose={2500} />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />

          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/user" element={<UserProfileLayout />}>
            <Route index element={<RedirectLastPage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="myOrders" element={<UserOrders />} />
            <Route path="changePassword" element={<UserChangePassword />} />
          </Route>

          <Route path="/product/:productId" element={<ProductDetails />} />

          <Route path="/store/createStore" element={<CreateStore />} />
          <Route path="/store/createProduct" element={<CreateProduct />} />
          <Route
            path="/store/manageProducts"
            element={<ManageStoreProducts />}
          />

          <Route path="/logout" element={<LogOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
