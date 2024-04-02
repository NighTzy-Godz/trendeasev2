import React from "react";
import Modal from "../../common/Modal";
import { useForm } from "react-hook-form";
import { LoginData } from "../../../interfaces/userInterfaces";
import Input from "../../common/Input";

interface LoginModalProps {
  isShow: boolean;
  onModalClose(): void;
}

function LoginModal({ isShow, onModalClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  if (isShow) {
    return (
      <Modal headerTitle="Login Form" onModalClose={onModalClose}>
        <div className="mb-6">
          <Input placeholder="Username ..." />
        </div>

        <div className="mb-5">
          <Input placeholder="Password ..." type="password" />
        </div>
      </Modal>
    );
  }
  return null;
}

export default LoginModal;
