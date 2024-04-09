import Joi from "joi";
import { CreateProduct, ProductCategory } from "../interface/productInterface";

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
    category: Joi.string()
      .valid(...Object.values(ProductCategory))
      .required()
      .messages({
        "string.empty": "Product Category cannot be empty",
        "string.base": "Product Category should be a type of string",
        "any.required": "Product Category is a required field",
        "any.only": "Invalid Product Category",
      }),

    quantity: Joi.string().min(1).required().messages({
      "string.required": "Quantity is a required field",
      "string.base": "Quantity should be a type of string",
      "string.min": "Quantity should be atleast 3 characters long",
    }),
  });

  return schema.validate(data);
};
