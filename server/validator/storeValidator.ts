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
  });

  return schema.validate(data);
};
