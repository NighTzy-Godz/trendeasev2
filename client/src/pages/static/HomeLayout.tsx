import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/ui/TopNav";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setDecodedUser } from "../../store/slices/auth";
import Cart from "../../components/ui/Cart";
import LoginModal from "../../components/modal/user/LoginModal";
import RegisterModal from "../../components/modal/user/RegisterModal";
import {
  setShowLoginModal,
  setShowRegisterUserModal,
  setShowUserCart,
} from "../../store/slices/ui";
function HomeLayout() {
  const dispatch = useDispatch();

  const showLoginModal = useSelector(
    (state: RootState) => state.ui.showLoginModal
  );
  const showRegisterUser = useSelector(
    (state: RootState) => state.ui.showRegisterUserModal
  );
  const showUserCart = useSelector((state: RootState) => state.ui.showUserCart);

  const token1 = useSelector((state: RootState) => state.auth.authToken);
  const token2 = localStorage.getItem("token");
  const token = token1 || token2;

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("token", token);
        const user = jwtDecode(token);
        dispatch(setDecodedUser(user));
      }
    } catch (error) {}
  }, [token]);

  const handleCloseLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const handleCloseRegisterModal = () => {
    dispatch(setShowRegisterUserModal(false));
  };

  const handleCloseCart = () => {
    dispatch(setShowUserCart(false));
  };

  return (
    <React.Fragment>
      <TopNav token={token} />
      <Cart isShow={showUserCart} onCartClose={handleCloseCart} />
      <LoginModal
        isShow={showLoginModal}
        onModalClose={handleCloseLoginModal}
      />
      <RegisterModal
        onModalClose={handleCloseRegisterModal}
        isShow={showRegisterUser}
      />
      <Outlet></Outlet>
    </React.Fragment>
  );
}

export default HomeLayout;
