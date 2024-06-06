import Joi from "joi";
import { CreateStore } from "../interface/storeInterface";

export const createStoreValidator = (
  data: CreateStore
): Joi.ValidationResult => {
  const schema = Joi.object({
    storeName: Joi.string().required().messages({
      "string.required": "Store Name is a required field",
      "string.base": "Store Name should be a type of string",
    }),
    description: Joi.string().required().messages({
      "string.required": "Description is a required field",
      "string.base": "Description should be a type of string",
    }),
    email: Joi.string().required().messages({
      "string.base": "Email is a type of string",
      "any.required": "Email is required field",
      "string.empty": "Email is a required field",
    }),
    phone: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required()
      .messages({
        "string.base": "Contact is a type of string",
        "any.required": "Contact is required field",
        "string.empty": "Contact is a required field",
        "string.pattern.base": "Contact should be 11 digit long",
      }),
  });

  return schema.validate(data);
};

export const updateStoreValidator = (
  data: CreateStore
): Joi.ValidationResult => {
  const schema = Joi.object({
    storeName: Joi.string().required().messages({
      "string.required": "Store Name is a required field",
      "string.base": "Store Name should be a type of string",
    }),
    description: Joi.string().required().messages({
      "string.required": "Description is a required field",
      "string.base": "Description should be a type of string",
    }),
    email: Joi.string().required().messages({
      "string.base": "Email is a type of string",
      "any.required": "Email is required field",
      "string.empty": "Email is a required field",
    }),
    phone: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required()
      .messages({
        "string.base": "Contact is a type of string",
        "any.required": "Contact is required field",
        "string.empty": "Contact is a required field",
        "string.pattern.base": "Contact should be 11 digit long",
      }),
  });

  return schema.validate(data);
};
