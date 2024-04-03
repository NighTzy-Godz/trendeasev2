import React, { useEffect } from "react";
import Modal from "../../common/Modal";
import { useForm } from "react-hook-form";
import { LoginData } from "../../../interfaces/userInterfaces";
import Input from "../../common/Input";
import Button from "../../common/Button";
import InputError from "../../common/InputError";
import { useLoginUserMutation } from "../../../store/apis/userApi";
import { toast } from "react-toastify";

interface LoginModalProps {
  isShow: boolean;
  onModalClose(): void;
}

function LoginModal({ isShow, onModalClose }: LoginModalProps) {
  const [loginUser, result] = useLoginUserMutation();
  const { error, isLoading } = result;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  useEffect(() => {
    if (error && "originalStatus" in error) {
      if (error.originalStatus >= 500) {
        toast.error("Unexpected Error Happened" as string, {
          toastId: "Login Unexpected",
        });
      } else {
        toast.error(error.data as string, {
          toastId: "Login Error",
        });
      }
    }
  }, [result]);

  const handleLoginSubmit = (data: LoginData) => {
    loginUser(data);
  };

  if (isShow) {
    return (
      <Modal headerTitle="Login Form" onModalClose={onModalClose}>
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          {" "}
          <div className="mb-6">
            <Input
              className="mb-1 "
              type="email"
              placeholder="Username ..."
              {...register("email", {
                required: "Username is a required field",
              })}
            />
            {errors.email && <InputError msg={errors.email.message} />}
          </div>
          <div className="mb-5">
            <Input
              className="mb-1"
              placeholder="Password ..."
              type="password"
              {...register("password", {
                required: "Password is a required field",
              })}
            />

            {errors.password && <InputError msg={errors.password.message} />}
          </div>
          <div className="mb-1">
            {" "}
            <Button variant="default" isLoading={isLoading}>
              Submit
            </Button>
          </div>
          <div className="">
            <p className="font-kanit font-sm text-textColor">
              Not a member yet?{" "}
              <span className="font-semibold text-mainColor hover:underline cursor-pointer">
                Register Here
              </span>
            </p>
          </div>
        </form>
      </Modal>
    );
  }
  return null;
}

export default LoginModal;
