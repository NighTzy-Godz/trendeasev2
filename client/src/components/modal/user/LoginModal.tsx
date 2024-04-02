import React from "react";
import Modal from "../../common/Modal";
import { useForm } from "react-hook-form";
import { LoginData } from "../../../interfaces/userInterfaces";

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
        <input type="text" />
      </Modal>
    );
  }
  return null;
}

export default LoginModal;
