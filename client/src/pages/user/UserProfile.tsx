import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import InputLabel from "../../components/common/InputLabel";
import { useForm } from "react-hook-form";
import { UpdateUserProfileData } from "../../interfaces/userInterfaces";
import InputError from "../../components/common/InputError";
import { useUpdateUserMutation } from "../../store/apis/userApi";
import { renderError } from "../../utils/utils";
import { toast } from "react-toastify";

function UserProfile() {
  const [updateUser, result] = useUpdateUserMutation();
  const { error, isSuccess } = result;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfileData>();

  useEffect(() => {
    if (error) {
      renderError(error);
    }
    if (isSuccess) {
      toast.success("Successfully Updated Your Account!");
    }
  }, [result, error, isSuccess]);

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
      <li className="px-4 py-1 mb-2 w-full block " key={item.id}>
        {" "}
        <NavLink
          to={item.path}
          className="font-kanit text-textColor text-xl  w-full "
        >
          {item.name}
        </NavLink>
      </li>
    );
  });

  const handleUpdateUserSubmit = (data: UpdateUserProfileData) => {
    updateUser(data);
  };

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
            <form action="" onSubmit={handleSubmit(handleUpdateUserSubmit)}>
              {" "}
              <div className="mb-8 w-1/2 flex flex-col">
                <InputLabel label="First Name" className="mb-1" />
                <Input
                  className="mb-1"
                  placeholder="Ex. James"
                  {...register("firstName", {
                    required: "First Name is a required field",
                  })}
                />
                {errors.firstName && (
                  <InputError msg={errors.firstName.message} />
                )}
              </div>
              <div className="mb-8 w-1/2">
                <InputLabel label="Last Name" className="mb-1" />
                <Input
                  placeholder="Ex. Laysol"
                  {...register("lastName", {
                    required: "Last Name is a required field",
                  })}
                />
                {errors.lastName && (
                  <InputError msg={errors.lastName.message} />
                )}
              </div>
              <div className="mb-8 w-1/2">
                <InputLabel label="Contact Number" className="mb-1" />
                <Input
                  placeholder="Ex. 0912 345 6789"
                  {...register("contact", {
                    required: "Contact is a required field",
                    pattern: {
                      value: /^[0-9]{11}/,
                      message: "Contact should be 11 digit long",
                    },
                  })}
                />
                {errors.contact && <InputError msg={errors.contact.message} />}
              </div>
              <div className="mb-8 w-1/2">
                <InputLabel label="Email" className="mb-1" />
                <Input
                  placeholder="Ex. test@gmail.com"
                  type="email"
                  {...register("email", {
                    required: "Email is a required field",
                  })}
                />
                {errors.email && <InputError msg={errors.email.message} />}
              </div>
              <div className="mb-5 w-1/2">
                <InputLabel label="Address" className="mb-1" />
                <Input
                  placeholder="Your current address"
                  {...register("address", {
                    min: {
                      value: 10,
                      message: "Address should have atleast 10 characters",
                    },
                    max: {
                      value: 400,
                      message: "Address can only have 400 characters",
                    },
                  })}
                />
                {errors.address && <InputError msg={errors.address.message} />}
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
