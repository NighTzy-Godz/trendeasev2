import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/ui/TopNav";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setDecodedUser } from "../../store/slices/auth";
function HomeLayout() {
  const dispatch = useDispatch();

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

  return (
    <React.Fragment>
      <TopNav token={token} />
      <Outlet></Outlet>
    </React.Fragment>
  );
}

export default HomeLayout;
