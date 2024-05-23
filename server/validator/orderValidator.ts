import Joi, { Schema } from "joi";
import { AddOrder, PaymentMethod } from "../interface/orderInterface";

export const addOrderValidator = (data: AddOrder): Joi.ValidationResult => {
  const schema = Joi.object({
    clearCart: Joi.boolean().optional().messages({
      "boolean.base": "Clear Cart is a type of boolean",
    }),
    paymentMethod: Joi.string()
      .valid(...Object.values(PaymentMethod))
      .required()
      .messages({
        "string.empty": "Payment Method cannot be empty",
        "string.base": "Payment Method only accepts string value",
        "string.required": "Payment Method is a required field",
        "any.only": "Invalid Payment Method",
      }),
    checkoutItems: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
          price: Joi.number().min(0).required(),
          productOwner: Joi.string().required(),
        })
      )
      .required(),
    shippingAddress: Joi.object({
      houseNumber: Joi.string().optional().messages({
        "string.base": "House Number should be a type of string",
      }),
      street: Joi.string().required().messages({
        "string.required": "Street is a required field",
        "string.base": "Street should be a type of string",
      }),
      province: Joi.string().required().messages({
        "string.required": "Province is a required field",
        "string.base": "Province should be a type of string",
      }),
      municipality: Joi.string().required().messages({
        "string.required": "Municipality is a required field",
        "string.base": "Municipality should be a type of string",
      }),
      baranggay: Joi.string().required().messages({
        "string.required": "Baranggay is a required field",
        "string.base": "Baranggay should be a type of string",
      }),
    }).required(),
  });

  return schema.validate(data);
};
