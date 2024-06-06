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
    <div className="  w-full h-full grid place-items-center ">
      <div className="mb-20 text-center">
        <h1 className="font-kanit text-mainColor text-3xl">My Profile</h1>
        <p className="font-kanit text-textColor ">
          Protect and Manage your account
        </p>
      </div>
      <form className="w-1/2" onSubmit={handleSubmit(handleUpdateUserSubmit)}>
        {" "}
        <div className="mb-8  flex flex-col">
          <InputLabel label="First Name" className="mb-1" />
          <Input
            className="mb-1"
            placeholder="Ex. James"
            {...register("firstName", {
              required: "First Name is a required field",
            })}
          />
          {errors.firstName && <InputError msg={errors.firstName.message} />}
        </div>
        <div className="mb-8 ">
          <InputLabel label="Last Name" className="mb-1" />
          <Input
            placeholder="Ex. Laysol"
            {...register("lastName", {
              required: "Last Name is a required field",
            })}
          />
          {errors.lastName && <InputError msg={errors.lastName.message} />}
        </div>
        <div className="mb-8 ">
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
        <div className="mb-8  ">
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
        <div className="mb-5 ">
          <InputLabel label="Address" className="mb-1" />
          <div className="flex gap-2 mb-3">
            <div className="flex flex-col">
              <Input
                placeholder=" House Number "
                {...register("address.houseNumber", {
                  pattern: {
                    value: /[0-9]/,
                    message: "House Number only accepts a number",
                  },
                })}
              />
              {errors.address?.houseNumber && (
                <InputError msg={errors.address.houseNumber.message} />
              )}
            </div>

            <div className="flex flex-col w-auto">
              <Input
                placeholder=" Street Address"
                {...register("address.street")}
              />
              {errors.address?.street && (
                <InputError msg={errors.address.street.message} />
              )}
            </div>
            <div className="flex flex-col">
              <Input
                placeholder="Baranggay "
                {...register("address.baranggay")}
              />
              {errors.address?.baranggay && (
                <InputError msg={errors.address.baranggay.message} />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <Input
                placeholder=" Province "
                {...register("address.province")}
              />{" "}
              {errors.address?.province && (
                <InputError msg={errors.address.province.message} />
              )}
            </div>
            <div className="flex flex-col">
              <Input
                placeholder=" Municipality"
                {...register("address.municipality")}
              />
              {errors.address?.municipality && (
                <InputError msg={errors.address.municipality.message} />
              )}
            </div>
          </div>
        </div>
        <div className="">
          <Button>Update Profile Information</Button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
