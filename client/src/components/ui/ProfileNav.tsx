import React, { useEffect } from "react";
import userProfileLinks from "../../data/userProfileLinks";
import { NavLink } from "react-router-dom";

import storeProfileLinks from "../../data/storeProfileLinks";
import { useGetUserDataQuery } from "../../store/apis/userApi";

function ProfileNav() {
  const { data: currUser } = useGetUserDataQuery("");

  const profileNavClass = "font-kanit text-textColor text-xl  w-full ";
  const renderProfileLinks = userProfileLinks.map((item) => {
    return (
      <li className="px-4 py-1 mb-2 w-full block " key={item.id}>
        {" "}
        <NavLink to={item.path} className={profileNavClass}>
          {item.name}
        </NavLink>
      </li>
    );
  });

  const renderStoreLinks = () => {
    if (!currUser?.store)
      return (
        <li className="px-4 py-1 mb-2 w-full block">
          <NavLink to="/store/createStore" className={profileNavClass}>
            Create your Store
          </NavLink>
        </li>
      );
    return storeProfileLinks.map((item) => (
      <li key={item.id} className="px-4 py-1 mb-2 w-full block">
        <NavLink to={item.path} className={profileNavClass}>
          {item.name}
        </NavLink>
      </li>
    ));
  };
  return (
    <React.Fragment>
      <div className="mb-10">
        <div className="flex justify-center mb-3">
          <img
            className="w-48 h-48 rounded-full object-cover"
            src={currUser?.profilePicture}
            alt=""
          />
        </div>
        <div className="flex justify-center">
          <h3 className="font-kanit text-2xl text-mainColor">
            {currUser?.firstName} {currUser?.lastName}
          </h3>
        </div>
      </div>

      <p className="font-kanit flex  mb-2  text-sm text-mainColor gap-2 after:content-[''] after:flex after:mt-2  after:w-2/5 after:h-[2px] after:border after:bg-textColor">
        Manage Profile
      </p>

      <ul className="w-full ">{renderProfileLinks}</ul>

      <p className="font-kanit flex mt-5   text-sm text-mainColor gap-2 after:content-[''] after:flex after:mt-2  after:w-2/5 after:h-[2px] after:border after:bg-textColor">
        Manage Store
      </p>

      <ul className="w-full">{renderStoreLinks()}</ul>
    </React.Fragment>
  );
}

export default ProfileNav;
