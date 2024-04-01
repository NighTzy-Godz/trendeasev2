import React from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <React.Fragment>
      <Outlet></Outlet>
    </React.Fragment>
  );
}

export default HomeLayout;
