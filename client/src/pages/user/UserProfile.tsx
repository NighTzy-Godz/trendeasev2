import React from "react";
import { NavLink } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import InputLabel from "../../components/common/InputLabel";

function UserProfile() {
  const userProfileLinks = [
    {
      id: 0,
      name: "My Account",
      path: "/user/profile",
    },
    {
      id: 1,
      name: "Orders",
      path: "/user/myOrders",
    },
    {
      id: 2,
      name: "Customer Orders",
      path: "/user/customerOrders",
    },
    {
      id: 3,
      name: "Change Password",
      path: "/user/changePassword",
    },
    {
      id: 4,
      name: "Sign Out",
      path: "/user/signOut",
    },
  ];

  const renderProfileLinks = userProfileLinks.map((item) => {
    return (
      <li className="px-4 py-1 mb-2 w-full block ">
        {" "}
        <NavLink
          to={item.path}
          key={item.id}
          className="font-kanit text-textColor text-xl  w-full "
        >
          {item.name}
        </NavLink>
      </li>
    );
  });

  return (
    <div className="py-10 bg-bgColor min-h-[90dvh]">
      <div className="container mx-auto">
        <div className="flex gap-7">
          <div className="w-1/4">
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
                  Aser James Hubero
                </h3>
              </div>
            </div>

            <ul className="w-full ">{renderProfileLinks}</ul>
          </div>
          <div className="w-3/4 ">
            <div className="mb-20">
              <h1 className="font-kanit text-mainColor text-2xl">My Profile</h1>
              <p className="font-kanit text-textColor ">
                Protect and Manage your account
              </p>
            </div>
            <form action="">
              {" "}
              <div className="mb-8 w-1/2 flex flex-col">
                <InputLabel label="First Name" className="mb-1" />
                <Input placeholder="Ex. James" />
              </div>
              <div className="mb-8 w-1/2">
                <InputLabel label="Last Name" className="mb-1" />
                <Input placeholder="Ex. Laysol" />
              </div>
              <div className="mb-8 w-1/2">
                <InputLabel label="Contact Number" className="mb-1" />
                <Input placeholder="Ex. 0912 345 6789" />
              </div>
              <div className="mb-5 w-1/2">
                <InputLabel label="Email" className="mb-1" />
                <Input placeholder="Ex. test@gmail.com" type="email" />
              </div>
              <div className="w-1/2">
                <Button>Update Profile Information</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
