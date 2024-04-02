import React from "react";
import TopNav from "../../components/ui/TopNav";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoginModal from "../../components/modal/user/LoginModal";
import { useDispatch } from "react-redux";
import { setShowLoginModal } from "../../store/slices/ui";

function Home() {
  const dispatch = useDispatch();
  const showLoginModal = useSelector(
    (state: RootState) => state.ui.showLoginModal
  );

  const handleCloseLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  return (
    <React.Fragment>
      <LoginModal
        isShow={showLoginModal}
        onModalClose={handleCloseLoginModal}
      />
      <TopNav />
      <Outlet />
    </React.Fragment>
  );
}

export default Home;
