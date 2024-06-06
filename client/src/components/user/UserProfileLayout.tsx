import React from "react";
import ProfileNav from "../ui/ProfileNav";
import { Outlet } from "react-router-dom";

function UserProfileLayout() {
  return (
    <div className="py-10 bg-bgColor min-h-[92dvh]">
      <div className="container mx-auto">
        <div className="flex gap-7">
          <div className="w-1/4">
            <ProfileNav />
          </div>
          <div className="w-3/4 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileLayout;
