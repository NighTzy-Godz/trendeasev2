import Joi from "joi";
import { RegisterUser } from "../interface/userInterface";

export const registerUserValidator = (
  data: RegisterUser
): Joi.ValidationResult => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      "string.base": "First Name is a type of string",
      "any.required": "First Name is required field",
      "string.empty": "First Name is a required field",
    }),
    lastName: Joi.string().required().messages({
      "string.base": "Last Name is a type of string",
      "any.required": "Last Name is required field",
      "string.empty": "Last Name is a required field",
    }),

    email: Joi.string().required().messages({
      "string.base": "Email is a type of string",
      "any.required": "Email is required field",
      "string.empty": "Email is a required field",
    }),
    contact: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .required()
      .messages({
        "string.base": "Contact is a type of string",
        "any.required": "Contact is required field",
        "string.empty": "Contact is a required field",
        "string.pattern.base": "Contact should be 11 digit long",
      }),

    password: Joi.string().min(7).max(50).required().messages({
      "string.base": "Email is a type of string",
      "any.required": "Email is required field",
      "string.empty": "Email is a required field",
    }),
    confirmPassword: Joi.string().min(7).max(50).required().messages({
      "string.base": "Email is a type of string",
      "any.required": "Email is required field",
      "string.empty": "Email is a required field",
    }),
  });
  return schema.validate(data);
};
