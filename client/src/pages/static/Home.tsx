import React from "react";
import TopNav from "../../components/ui/TopNav";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoginModal from "../../components/modal/user/LoginModal";
import { useDispatch } from "react-redux";
import {
  setShowLoginModal,
  setShowRegisterUserModal,
} from "../../store/slices/ui";
import RegisterModal from "../../components/modal/user/RegisterModal";

function Home() {
  const dispatch = useDispatch();
  const showLoginModal = useSelector(
    (state: RootState) => state.ui.showLoginModal
  );
  const showRegisterUser = useSelector(
    (state: RootState) => state.ui.showRegisterUserModal
  );

  const handleCloseLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const handleCloseRegisterModal = () => {
    dispatch(setShowRegisterUserModal(false));
  };

  return (
    <React.Fragment>
      <LoginModal
        isShow={showLoginModal}
        onModalClose={handleCloseLoginModal}
      />
      <RegisterModal
        onModalClose={handleCloseRegisterModal}
        isShow={showRegisterUser}
      />
      <TopNav />
      <Outlet />
    </React.Fragment>
  );
}

export default Home;
