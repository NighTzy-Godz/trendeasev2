import React, { useEffect } from "react";
import Modal from "../../common/Modal";
import { useForm } from "react-hook-form";
import { RegisterUserData } from "../../../interfaces/userInterfaces";
import Input from "../../common/Input";
import InputError from "../../common/InputError";
import Button from "../../common/Button";
import { useRegisterUserMutation } from "../../../store/apis/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setShowLoginModal,
  setShowRegisterUserModal,
} from "../../../store/slices/ui";
import { renderError } from "../../../utils/utils";

interface RegisterModalProps {
  isShow: boolean;
  onModalClose(): void;
}

function RegisterModal({ isShow, onModalClose }: RegisterModalProps) {
  const dispatch = useDispatch();
  const [registerUser, result] = useRegisterUserMutation();
  const { error, isLoading, isSuccess, data } = result;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserData>();

  useEffect(() => {
    if (error) renderError(error);
    if (isSuccess) {
      toast.success(
        `Successfully created the account for ${data.firstName} ${data.lastName}!`
      );
      reset();
      dispatch(setShowRegisterUserModal(false));
      dispatch(setShowLoginModal(true));
    }
  }, [result, isSuccess, error]);

  const handleRegisterUserSubmit = (data: RegisterUserData) => {
    registerUser(data);
  };

  if (isShow) {
    return (
      <Modal headerTitle="User Register Form" onModalClose={onModalClose}>
        <form onSubmit={handleSubmit(handleRegisterUserSubmit)}>
          <div className="mb-5">
            <Input
              className="mb-1"
              placeholder="First Name"
              {...register("firstName", {
                required: "First Name is a required field",
              })}
            />

            {errors.firstName && <InputError msg={errors.firstName.message} />}
          </div>

          <div className="mb-5">
            <Input
              className="mb-1"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last Name is a required field",
              })}
            />

            {errors.lastName && <InputError msg={errors.lastName.message} />}
          </div>

          <div className="mb-5">
            <Input
              className="mb-1"
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Email is a required field",
              })}
            />

            {errors.email && <InputError msg={errors.email.message} />}
          </div>
          <div className="mb-5">
            <Input
              className="mb-1"
              placeholder="Contact Number"
              {...register("contact", {
                required: "Contact Number is a required field",

                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Contact should be 11 digit long",
                },
              })}
            />

            {errors.contact && <InputError msg={errors.contact.message} />}
          </div>
          <div className="mb-5">
            <Input
              className="mb-1"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is a required field",
                min: {
                  value: 7,
                  message: "Password should be atleast 7 digit long",
                },
                max: {
                  value: 50,
                  message: "Password could only contain 50 characters",
                },
              })}
            />

            {errors.password && <InputError msg={errors.password.message} />}
          </div>
          <div className="mb-5">
            <Input
              className="mb-1"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is a required field",
                min: {
                  value: 7,
                  message: "Confirm Password should be atleast 7 digit long",
                },
                max: {
                  value: 50,
                  message: "Confirm Password could only contain 50 characters",
                },
              })}
            />

            {errors.confirmPassword && (
              <InputError msg={errors.confirmPassword.message} />
            )}
          </div>
          <div className="mb-1">
            <Button type="submit" isLoading={isLoading}>
              Register
            </Button>
          </div>

          <div className="">
            <p className="font-kanit font-sm text-textColor">
              Already a member?{" "}
              <span
                onClick={() => {
                  dispatch(setShowRegisterUserModal(false));
                  dispatch(setShowLoginModal(true));
                }}
                className="font-semibold text-mainColor hover:underline cursor-pointer"
              >
                Login Here
              </span>
            </p>
          </div>
        </form>
      </Modal>
    );
  }
  return null;
}

export default RegisterModal;
