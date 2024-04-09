import React, { useEffect } from "react";
import ProfileNav from "../../components/ui/ProfileNav";
import InputLabel from "../../components/common/InputLabel";
import Input from "../../components/common/Input";
import { useForm } from "react-hook-form";
import InputError from "../../components/common/InputError";

import { CreateProductData } from "../../interfaces/productInterfaces";
import Button from "../../components/common/Button";
import { useAddProductMutation } from "../../store/apis/productsApi";
import { toast } from "react-toastify";
import { renderError } from "../../utils/utils";
import Select from "../../components/common/Select";
import productCategories from "../../data/productCategories";

function CreateProduct() {
  const [addProduct, result] = useAddProductMutation();
  const { error, isSuccess, isLoading, data } = result;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductData>();

  useEffect(() => {
    if (error) renderError(error);
    if (isSuccess) {
      toast.success(`Successfully Created the Product ${data.productName} `);
      reset();
      // NOTE: ADD A NAVIGATION TO /STORE/MYPRODUCTS
    }
  }, [error, isLoading, isSuccess]);

  const handleCreateProductSubmit = (data: CreateProductData) => {
    const { productName, quantity, price, description, img, category } = data;
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    Array.from(img).map((item) => {
      formData.append("img", item);
    });

    addProduct(formData as any);
  };

  return (
    <div className="py-10 bg-bgColor min-h-[92dvh]">
      <div className="container mx-auto">
        <div className="flex gap-7">
          <div className="w-1/4">
            <ProfileNav />
          </div>
          <div className="w-3/4">
            <div className="w-full h-full grid place-items-center">
              <form
                onSubmit={handleSubmit(handleCreateProductSubmit)}
                className="w-1/2 block  rounded-lg p-7"
              >
                <div className="w-full text-center mb-10">
                  <h1 className="font-kanit text-mainColor text-3xl">
                    Create your Product
                  </h1>
                  <p className=" font-kanit text-textColor">
                    Post something incredible. Post your product!
                  </p>
                </div>

                <div className="mb-7">
                  <InputLabel label="Product Images" className="mb-1" />
                  <Input
                    type="file"
                    multiple
                    className="mb-1"
                    accept="image/*"
                    {...register("img", {
                      required: "Product Images cannot be empty",
                    })}
                  />
                  {errors.img && <InputError msg={errors.img.message} />}
                </div>

                <div className="mb-7">
                  <InputLabel label="Product Name" className="mb-1" />
                  <Input
                    className="mb-1"
                    placeholder="Ex. Light Glass"
                    {...register("productName", {
                      required: "Product Name is a required field",
                    })}
                  />
                  {errors.productName && (
                    <InputError msg={errors.productName.message} />
                  )}
                </div>
                <div className="mb-7">
                  <InputLabel label="Product Category" className="mb-1" />
                  <Select
                    {...register("category", {
                      required: "Category is a required field",
                    })}
                    data={productCategories}
                    headerInstruction="Select a Category Below"
                  />
                  {errors.price && <InputError msg={errors.price.message} />}
                </div>

                <div className="mb-7">
                  <InputLabel label="Product Price" className="mb-1" />
                  <Input
                    className="mb-1"
                    placeholder="Ex. 10,000"
                    {...register("price", {
                      required: "Product Price is a required field",
                      pattern: {
                        value: /^\d+$/,
                        message: "Price can only contain numbers",
                      },
                    })}
                  />
                  {errors.price && <InputError msg={errors.price.message} />}
                </div>
                <div className="mb-7">
                  <InputLabel label="Product Quantity" className="mb-1" />
                  <Input
                    className="mb-1"
                    placeholder="Ex. 10"
                    {...register("quantity", {
                      required: "Product Quantity is a required field",
                      pattern: {
                        value: /^\d+$/,
                        message: "Product Quantity can only contain numbers",
                      },
                    })}
                  />
                  {errors.quantity && (
                    <InputError msg={errors.quantity.message} />
                  )}
                </div>

                <div className="mb-5">
                  <InputLabel label="Product Description" className="mb-1" />
                  <Input
                    placeholder="Ex. A Good Designer Brand"
                    className="mb-1"
                    {...register("description", {
                      required: "Product Description is a required field",
                    })}
                  />
                  {errors.description && (
                    <InputError msg={errors.description.message} />
                  )}
                </div>
                <div className="">
                  <Button isLoading={isLoading}>Create Product</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
