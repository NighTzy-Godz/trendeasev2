import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AddOrderData,
  CheckoutItemConfig,
  OrderItem,
  PaymentMethod,
  PreCheckoutItem,
} from "../../interfaces/orderInteraces";
import Input from "../../components/common/Input";
import paymentMethod from "../../data/paymentMethod";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import formatCurrency from "../../utils/formatCurrency";
import calculateSubtotal from "../../utils/calculateSubtotal";
import subTotals from "../../utils/subtotals";
import calculateTax from "../../utils/calculateTax";
import calculateTotal from "../../utils/calculateTotal";
import Button from "../../components/common/Button";
import InputError from "../../components/common/InputError";
import { useAddOrderMutation } from "../../store/apis/orderApi";
import { renderError } from "../../utils/utils";
import { useGetUserDataQuery } from "../../store/apis/userApi";
import { useGetUserCartQuery } from "../../store/apis/cartApi";

function Checkout() {
  const navigate = useNavigate();
  const [addOrder, result] = useAddOrderMutation();
  const { refetch: cartRefetch } = useGetUserCartQuery("");
  // const { data } = useGetUserDataQuery("");
  const [payMethod, setPayMethod] = useState(paymentMethod[0]);
  const [checkoutItems, setCheckoutItems] = useState<PreCheckoutItem[]>([]);
  const [clearCart, setClearCart] = useState(false);

  useEffect(() => {
    try {
      const preCheckoutItemsConfig = localStorage.getItem(
        "checkoutItemsConfig"
      );
      if (!preCheckoutItemsConfig) {
        toast.error("There is no Checkout Items");
        <Navigate to="/" />;
      } else {
        const preItems: CheckoutItemConfig = JSON.parse(
          preCheckoutItemsConfig as string
        );

        setCheckoutItems(preItems.items);
        setClearCart(preItems.clearCart);
      }
    } catch (error) {}
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddOrderData>();

  useEffect(() => {
    if (result.error) {
      renderError(result.error);
    }
    if (result.isSuccess) {
      toast.success("Successfully checked out the items");
      cartRefetch();
      navigate("/user/profile");
    }
  }, [result]);

  const renderPaymentMethods = paymentMethod.map((item) => {
    return (
      <div
        className={`w-72 border cursor-pointer bg- ${
          payMethod.id === item.id
            ? "bg-mainColor border-mainColor"
            : "border-textColor"
        }  rounded-md py-3 px-5`}
        key={item.id}
        onClick={() => setPayMethod(item)}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-kanit text-textColor text-xl">{item.name}</h1>
        </div>
        <p className="font-kanit text-xs text-textColor">{item.definition}</p>
      </div>
    );
  });

  const renderCheckoutItems = checkoutItems.map((item) => {
    const preSubTotal = parseInt(item.price) * item.quantity;
    return (
      <div className="flex justify-between mb-5">
        <div className="flex  items-center gap-x-4">
          <div className="h-24 w-24">
            <img
              src={item.img}
              className="h-full rounded-md w-full object-cover"
              alt=""
            />
          </div>
          <div className="">
            <div className="mb-3">
              {" "}
              <h4 className="font-kanit text-mainColor text-xl leading-none">
                {item.productName}
              </h4>
              <p className="font-kanit text-textColor text-lg">
                {" "}
                {formatCurrency(item.price)}
              </p>
            </div>{" "}
            <div className="">
              <p className="font-kanit text-lg text-textColor">
                x{item.quantity}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-kanit text-mainColor text-lg">
            {formatCurrency(preSubTotal.toString())}
          </p>
        </div>
      </div>
    );
  });

  const subTotals = checkoutItems.map((item) => {
    return (parseInt(item.price) * item.quantity).toString();
  });

  const totalTax = calculateTax(calculateSubtotal(subTotals));
  const subTotal = calculateSubtotal(subTotals);

  const handleCheckoutSubmit = async (data: AddOrderData) => {
    const items = checkoutItems.map((item) => {
      const body: OrderItem = {
        product: item.product,
        price: parseInt(item.price),
        quantity: item.quantity,
        productOwner: item.productOwner,
      };
      return body;
    });
    const reqBody: AddOrderData = {
      shippingAddress: data.shippingAddress,
      checkoutItems: items,
      paymentMethod: payMethod.value as PaymentMethod,
      clearCart,
    };

    await addOrder(reqBody).unwrap();
  };

  return (
    <div className="py-16 bg-bgColor">
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/2 py-5">
            <h1 className="font-kanit text-mainColor text-3xl mb-10">
              Checkout Page
            </h1>
            <form onSubmit={handleSubmit(handleCheckoutSubmit)}>
              <div className="mb-10">
                <h3 className="font-kanit text-textColor text-2xl mb-5">
                  Shipping Address
                </h3>
                <div className="flex gap-2 mb-3">
                  <div className="flex flex-col">
                    <Input
                      placeholder=" House Number "
                      {...register("shippingAddress.houseNumber", {
                        required: "House Number is a required field",
                        pattern: {
                          value: /[0-9]/,
                          message: "House Number only accepts a number",
                        },
                      })}
                    />
                    {errors.shippingAddress?.houseNumber && (
                      <InputError
                        msg={errors.shippingAddress.houseNumber.message}
                      />
                    )}
                  </div>

                  <div className="flex flex-col w-auto">
                    <Input
                      placeholder=" Street Address"
                      {...register("shippingAddress.street", {
                        required: "Shipping Street is a required field",
                      })}
                    />
                    {errors.shippingAddress?.street && (
                      <InputError msg={errors.shippingAddress.street.message} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Input
                      placeholder="Baranggay "
                      {...register("shippingAddress.baranggay", {
                        required: "Baranngay is a required field",
                      })}
                    />
                    {errors.shippingAddress?.baranggay && (
                      <InputError
                        msg={errors.shippingAddress.baranggay.message}
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <Input
                      placeholder=" Province "
                      {...register("shippingAddress.province", {
                        required: "Province is a required field",
                      })}
                    />{" "}
                    {errors.shippingAddress?.province && (
                      <InputError
                        msg={errors.shippingAddress.province.message}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    {" "}
                    <Input
                      placeholder=" Municipality"
                      {...register("shippingAddress.municipality", {
                        required: "Municipality is a required field",
                      })}
                    />
                    {errors.shippingAddress?.municipality && (
                      <InputError
                        msg={errors.shippingAddress.municipality.message}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-kanit text-textColor text-2xl mb-3">
                  Shipping Method
                </h3>

                <div className="w-72 bg-mainColor rounded-md py-3 px-5">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="font-kanit text-textColor text-xl">
                      Local Standard
                    </h1>
                    <p className="font-kanit text-bgColor text-lg">P40</p>
                  </div>
                  <p className="font-kanit text-xs text-textColor">
                    Expected to be delivered for 4-5 days
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="font-kanit text-textColor text-2xl mb-3">
                  Payment Method
                </h3>{" "}
                <div className="flex gap-3">{renderPaymentMethods}</div>
              </div>

              <div className="">
                <Button type="submit" size="lg" variant="sub">
                  Pay Now
                </Button>
              </div>
            </form>
          </div>
          <div className="w-1/2">
            <div className="sticky top-0 py-5">
              <div className="px-20 ">
                <div className="mb-3  ">
                  <h1 className="text-2xl font-kanit text-textColor">
                    Checkout Items
                  </h1>
                </div>
                <div className="mb-12"> {renderCheckoutItems} </div>

                <div className="w-full border rounded-md  border-textColor p-3">
                  <div className="mb-5">
                    <h1 className=" leading-snug text-2xl text-mainColor font-kanit">
                      Payment Details
                    </h1>
                    <p className="text-sm font-kanit text-textColor">
                      Review all the total with subtotal, tax and shipping fee
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-kanit text-textColor">
                      Merchandise Total:
                    </p>
                    <p className="font-kanit text-mainColor">
                      {/* {formatCurrency(subTotal)} */}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-kanit text-textColor">Shipping Fee:</p>
                    <p className="font-kanit text-mainColor">
                      {formatCurrency("40")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-kanit text-textColor">Tax:</p>
                    <p className="font-kanit text-mainColor">
                      {formatCurrency(totalTax)}
                    </p>
                  </div>

                  <div className=" mt-2 mb-4 w-full h-[2px] bg-mainColor"></div>

                  <div className="flex items-center justify-between">
                    <h3 className="font-kanit text-textColor text-2xl">
                      Total Payment:
                    </h3>
                    <p className="font-kanit text-2xl text-mainColor">
                      {calculateTotal(subTotal, totalTax)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
