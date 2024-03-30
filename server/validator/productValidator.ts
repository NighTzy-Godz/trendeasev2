import Joi from "joi";
import { CreateProduct } from "../interface/productInterface";
import Product from "../models/Product";

export const createProductValidator = (
  data: CreateProduct
): Joi.ValidationResult => {
  const schema = Joi.object({
    productName: Joi.string().min(3).required().messages({
      "string.required": "Product Name is a required field",
      "string.base": "Product Name should be a type of string",
      "string.min": "Product Name should be atleast 3 characters long",
    }),
    description: Joi.string().min(15).required().messages({
      "string.required": "Description is a required field",
      "string.base": "Description should be a type of string",
      "string.min": "Description should be atleast 15 characters long",
    }),
    price: Joi.string().min(1).required().messages({
      "string.required": "Price is a required field",
      "string.base": "Price should be a type of string",
      "string.min": "Price should be atleast 3 characters long",
    }),
    category: Joi.string().valid(...Object.values(Product)),

    quantity: Joi.string().min(1).required().messages({
      "string.required": "Quantity is a required field",
      "string.base": "Quantity should be a type of string",
      "string.min": "Quantity should be atleast 3 characters long",
    }),
  });

  return schema.validate(data);
};
