import React, { useEffect } from "react";
import ProfileNav from "../../components/ui/ProfileNav";
import Input from "../../components/common/Input";
import InputLabel from "../../components/common/InputLabel";
import Button from "../../components/common/Button";
import { useForm } from "react-hook-form";
import { CreateStoreData } from "../../interfaces/storeInterfaces";
import InputError from "../../components/common/InputError";

import { useCreateStoreMutation } from "../../store/apis/storeApi";
import { renderError } from "../../utils/utils";
import { toast } from "react-toastify";
import Textarea from "../../components/common/TextArea";
import { useNavigate } from "react-router-dom";

function CreateStore() {
  const [createStore, result] = useCreateStoreMutation();
  const { error, isSuccess, isLoading, data } = result;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreData>();

  useEffect(() => {
    if (error) renderError(error);
    if (isSuccess) {
      toast.success(
        `Successfully Created ${data.storeName}. Please refresh to take effect`
      );
      navigate("/store/myStore");
    }
  }, [error, result, isSuccess]);

  const handleCreateStoreSubmit = (data: CreateStoreData) => {
    createStore(data);
  };

  return (
    <div className="flex  flex-col justify-center items-center">
      <form
        action=""
        className="w-1/2 block"
        onSubmit={handleSubmit(handleCreateStoreSubmit)}
      >
        <div className="w-full text-center mb-20">
          <h1 className="font-kanit text-mainColor text-3xl">
            Create your Store
          </h1>
          <p className=" font-kanit text-textColor">
            Start your journey here. Get registered!
          </p>
        </div>
        <div className="mb-7">
          <InputLabel label="Store Name" className="mb-1" />
          <Input
            className="mb-1"
            placeholder="Ex. My Mighty Store"
            {...register("storeName", {
              required: "Store Name is a required field",
            })}
          />
          {errors.storeName && <InputError msg={errors.storeName.message} />}
        </div>

        <div className="mb-7">
          <InputLabel label="Email Address" className="mb-1" />
          <Input
            className="mb-1"
            type="email"
            placeholder="Ex. store@gmail.com"
            {...register("email", {
              required: "Email Address is a required field",
            })}
          />
          {errors.email && <InputError msg={errors.email.message} />}
        </div>

        <div className="mb-7">
          <InputLabel label="Phone Number" className="mb-1" />
          <Input
            className="mb-1"
            placeholder="Ex. 0912-234-5678"
            {...register("phone", {
              required: "Phone Number is a required field",
              pattern: {
                value: /^[0-9]{11}$/,
                message: "Phone Number should be 11 digit long and a number",
              },
            })}
          />
          {errors.phone && <InputError msg={errors.phone.message} />}
        </div>
        <div className="mb-5">
          <InputLabel label="Store Description" className="mb-1" />
          <Textarea
            placeholder="Ex. A Good Designer Brand"
            className="mb-1"
            {...register("description", {
              required: "Store Description is a required field",
            })}
          />

          {errors.description && (
            <InputError msg={errors.description.message} />
          )}
        </div>
        <div className="">
          <Button isLoading={isLoading}>Create Store</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateStore;
