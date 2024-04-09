import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import InputLabel from "../../components/common/InputLabel";
import { useForm } from "react-hook-form";
import { UpdateUserProfileData } from "../../interfaces/userInterfaces";
import InputError from "../../components/common/InputError";
import {
  useGetUserDataQuery,
  useUpdateUserMutation,
} from "../../store/apis/userApi";
import { renderError } from "../../utils/utils";
import { toast } from "react-toastify";
import ProfileNav from "../../components/ui/ProfileNav";
import { useDispatch } from "react-redux";
import { setCurrUser } from "../../store/slices/user";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

function UserProfile() {
  const [updateUser, result] = useUpdateUserMutation();
  const { error, isSuccess } = result;
  const { data } = useGetUserDataQuery("");

  const values: UpdateUserProfileData = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    contact: data?.contact,

    address: data?.address,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserProfileData>({
    values,
  });

  useEffect(() => {
    if (error) {
      renderError(error);
    }
    if (isSuccess) {
      toast.success("Successfully Updated Your Account!");
    }
  }, [result, error, isSuccess]);

  const handleUpdateUserSubmit = (data: UpdateUserProfileData) => {
    updateUser(data);
  };

  return (
    <div className="py-10 bg-bgColor min-h-[90dvh]">
      <div className="container mx-auto">
        <div className="flex gap-7">
          <div className="w-1/4">
            <ProfileNav />
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
