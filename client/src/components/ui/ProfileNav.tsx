import React from "react";
import userProfileLinks from "../../data/userProfileLinks";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import storeProfileLinks from "../../data/storeProfileLinks";

function ProfileNav() {
  const profileNavClass = "font-kanit text-textColor text-xl  w-full ";
  const hasStore = useSelector(
    (state: RootState) => state.auth.decodedUser?.store
  );
  const currUser = useSelector((state: RootState) => state.currUser.currUser);
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
    if (!hasStore)
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
            className="w-48 h-48 rounded-full"
            src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/428614910_1573169330203091_1427140977305999776_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEq7J5oTpqrejAm1VnZly6Bu9mflR7u2RO72Z-VHu7ZEwKcBt5U9LWR6hkOX7IQJAgjoic0zGEMUBGXP4d-qKg9&_nc_ohc=X7ypD3i3QzgAb404K0M&_nc_ht=scontent.fmnl9-2.fna&oh=00_AfBYgEhhURu4pY0ESf0NISrw2hZbWIOOUm4OH0gfecUHYg&oe=661452EF"
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
