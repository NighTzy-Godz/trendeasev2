import React from "react";
import TopNav from "../../components/ui/TopNav";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <TopNav />
      <Outlet />
    </React.Fragment>
  );
}

export default Home;
