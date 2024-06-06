import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpdateUserPasswordData } from "../../interfaces/userInterfaces";
import InputLabel from "../../components/common/InputLabel";
import Input from "../../components/common/Input";
import InputError from "../../components/common/InputError";
import Button from "../../components/common/Button";
import { useUpdateUserPasswordMutation } from "../../store/apis/userApi";
import { renderError } from "../../utils/utils";
import { toast } from "react-toastify";

function UserChangePassword() {
  const [updatePassword, result] = useUpdateUserPasswordMutation();
  const { error, isSuccess } = result;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPasswordData>();

  useEffect(() => {
    if (error) {
      renderError(error);
    }
    if (isSuccess) {
      toast.success("Successfully updated your password");
    }
  }, [result]);

  const handleUpdatePasswordSubmit = (data: UpdateUserPasswordData) => {
    updatePassword(data);
  };

  return (
    <div className="flex  flex-col justify-center items-center">
      <div className="mb-20 text-center">
        <h1 className="font-kanit text-3xl text-mainColor">Update Password</h1>
        <p className="font-kanit text-textColor ">
          Always protect your privacy. Change Your Password here
        </p>
      </div>

      <form
        className=" w-1/2 "
        onSubmit={handleSubmit(handleUpdatePasswordSubmit)}
      >
        <div className="mb-8 flex flex-col">
          <InputLabel label="Current Password" className="mb-1" />
          <Input
            type="password"
            placeholder="Type your current password"
            {...register("currentPassword", {
              required: "Current Password is a required field",
            })}
          />
          {errors.currentPassword && (
            <InputError msg={errors.currentPassword.message} />
          )}
        </div>
        <div className="mb-8 flex flex-col">
          <InputLabel label="New Password" className="mb-1" />
          <Input
            type="password"
            placeholder="Your new desired password"
            {...register("newPassword", {
              required: "New Password is a required fielddd",
              min: {
                value: 7,
                message: "New Password should be atleast 7 characters long",
              },
            })}
          />
          {errors.newPassword && (
            <InputError msg={errors.newPassword.message} />
          )}
        </div>
        <div className="mb-8 flex flex-col">
          <InputLabel label="Confirm Password" className="mb-1" />
          <Input
            type="password"
            placeholder="Re-enter your new password"
            {...register("confirmPassword", {
              required: "Confirm Password is a required field",
              min: {
                value: 7,
                message: "Confirm Password should be atleast 7 characters long",
              },
            })}
          />
          {errors.confirmPassword && (
            <InputError msg={errors.confirmPassword.message} />
          )}
        </div>

        <div className="">
          <Button>Update Password</Button>
        </div>
      </form>
    </div>
  );
}

export default UserChangePassword;
