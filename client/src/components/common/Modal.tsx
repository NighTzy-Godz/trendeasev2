import React from "react";
import { IoMdClose } from "react-icons/io";
interface ModalProps {
  onModalClose(): void;
  headerTitle: string;
  children: React.ReactNode;
}

function Modal({ headerTitle, onModalClose, children }: ModalProps) {
  return (
    <div className="fixed grid place-items-center  py-10 left-0 top-0 h-dvh w-dvw bg-black/60  z-50 ">
      <div className=" lg:w-1/4  mx-auto">
        <div className=" bg-bgColor w-full rounded-lg flex flex-col px-10 py-5  animate__animated animate__fadeInDown animate__faster">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-mainColor lg:text-3xl font-kanit">
              {headerTitle}
            </h1>
            <IoMdClose
              className="text-textColor h-5 w-5 cursor-pointer"
              onClick={onModalClose}
            />
          </div>
          <div className=""> {children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
