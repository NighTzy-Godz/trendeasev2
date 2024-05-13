import React, { useEffect } from "react";
import Modal from "../../common/Modal";
import { useForm } from "react-hook-form";
import { LoginData } from "../../../interfaces/userInterfaces";
import Input from "../../common/Input";
import Button from "../../common/Button";
import InputError from "../../common/InputError";
import { useLoginUserMutation } from "../../../store/apis/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  setShowLoginModal,
  setShowRegisterUserModal,
} from "../../../store/slices/ui";
import { setAuthToken } from "../../../store/slices/auth";
import { renderError } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isShow: boolean;
  onModalClose(): void;
}

function LoginModal({ isShow, onModalClose }: LoginModalProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, result] = useLoginUserMutation();
  const { error, data, isLoading, isSuccess } = result;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>();

  useEffect(() => {
    if (error) renderError(error);
    if (isSuccess) {
      toast.success("Successfully Logged In!");
      dispatch(setAuthToken(data));
      reset();
      navigate("/user/profile");
    }
  }, [result]);

  const handleRegisterClick = () => {
    dispatch(setShowLoginModal(false));
    dispatch(setShowRegisterUserModal(true));
  };

  const handleLoginSubmit = (data: LoginData) => {
    dispatch(setShowLoginModal(false));
    loginUser(data);
  };

  if (isShow) {
    return (
      <Modal headerTitle="User Login Form" onModalClose={onModalClose}>
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
              Login
            </Button>
          </div>
          <div className="">
            <p className="font-kanit font-sm text-textColor">
              Not a member yet?{" "}
              <span
                onClick={handleRegisterClick}
                className="font-semibold text-mainColor hover:underline cursor-pointer"
              >
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
