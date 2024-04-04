import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../../components/ui/TopNav";

function HomeLayout() {
  return (
    <React.Fragment>
      <TopNav />
      <Outlet></Outlet>
    </React.Fragment>
  );
}

export default HomeLayout;
