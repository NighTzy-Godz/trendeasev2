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

function CreateStore() {
  const [createStore, result] = useCreateStoreMutation();
  const { error, isSuccess, isLoading, data } = result;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreData>();

  useEffect(() => {
    if (error) renderError(error);
    if (isSuccess) toast.success(`Successfully Created ${data.storeName} `);
  }, [error, result, isSuccess]);

  const handleCreateStoreSubmit = (data: CreateStoreData) => {
    createStore(data);
  };

  return (
    <div className="py-10 bg-bgColor min-h-[92dvh]">
      <div className="container mx-auto">
        <div className="flex gap-7">
          <div className="w-1/4">
            <ProfileNav />
          </div>
          <div className="w-3/4  ">
            <div className="w-full h-full grid place-items-center ">
              <form
                action=""
                className="w-1/2 block  rounded-lg p-7"
                onSubmit={handleSubmit(handleCreateStoreSubmit)}
              >
                <div className="w-full text-center mb-10">
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
                  {errors.storeName && (
                    <InputError msg={errors.storeName.message} />
                  )}
                </div>
                <div className="mb-5">
                  <InputLabel label="Store Description" className="mb-1" />
                  <Input
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStore;
