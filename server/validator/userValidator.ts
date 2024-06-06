import Joi from "joi";
import {
  LoginUser,
  RegisterUser,
  UpdateUserPasswordData,
  UpdateUserProfileData,
} from "../interface/userInterface";

export const updateUserPasswordValidator = (
  data: UpdateUserPasswordData
): Joi.ValidationResult => {
  const schema = Joi.object({
    currentPassword: Joi.string().required().messages({
      "string.any": "Current Password cannot be empty",
      "string.required": "Current Password should be a type of string",
      "string.base": "Current Password should be a type of string",
    }),

    newPassword: Joi.string().min(7).required().messages({
      "string.any": "New Password cannot be empty",
      "string.required": "New Password should be a type of string",
      "string.base": "New Password should be a type of string",
      "string.min": "New Password should be atleast 7 characters",
    }),

    confirmPassword: Joi.string().min(7).required().messages({
      "string.any": "Confirm Password cannot be empty",
      "string.required": "Confirm Password should be a type of string",
      "string.base": "Confirm Password should be a type of string",
      "string.min": "Confirm Password should be atleast 7 characters",
    }),
  });

  return schema.validate(data);
};

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
  data: UpdateUserProfileData
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

    address: Joi.object({
      houseNumber: Joi.string()
        .optional()
        .allow(" " || null)
        .messages({
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
    }).optional(),
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
