import Joi from "joi";
import { LoginUser, RegisterUser } from "../interface/userInterface";

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
      "string.base": "Password is a type of string",
      "any.required": "Password is required field",
      "string.empty": "Password is a required field",
      "string.min": "Password should have atleast 7 characters",
      "string.max": "Password should only contain 50 characters",
    }),
    confirmPassword: Joi.string().min(7).max(50).required().messages({
      "string.base": "Confirm Password is a type of string",
      "any.required": "Confirm Password is required field",
      "string.empty": "Confirm Password is a required field",
    }),
  });
  return schema.validate(data);
};

export const updateUserValidator = (
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

    address: Joi.string()
      .min(10)
      .max(400)
      .trim()
      .allow("")
      .optional()
      .messages({
        "string.base": "Address is a type of string",
        "string.min": "Address should have atleast 10 characters",
        "string.max": "Address can only have 400 characters",
      }),
  });
  return schema.validate(data);
};

export const loginUserValidator = (data: LoginUser): Joi.ValidationResult => {
  const schema = Joi.object({
    email: Joi.string().required().messages({
      "string.base": "Email is a type of string",
      "any.required": "Email is required field",
      "string.empty": "Email is a required field",
    }),
    password: Joi.string().required().messages({
      "string.base": "Confirm Password is a type of string",
      "any.required": "Confirm Password is required field",
      "string.empty": "Confirm Password is a required field",
    }),
  });

  return schema.validate(data);
};
