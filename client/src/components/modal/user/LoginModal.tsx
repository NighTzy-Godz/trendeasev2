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
  const { error } = result;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  useEffect(() => {
    if (error) {
      if ("status" in error) {
        toast.error(error.data as string, {
          autoClose: 2500,
          toastId: "Login ERror",
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
          <Button variant="default">Submit</Button>
        </form>
      </Modal>
    );
  }
  return null;
}

export default LoginModal;
