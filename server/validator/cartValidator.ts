import Joi from "joi";

interface AddToCartData {
  quantity: number;
}

const updateCartValidator = (data: AddToCartData): Joi.ValidationResult => {
  const schema = Joi.object({
    qty: Joi.number().min(1).required().messages({
      "number.min": "Quantity Minimum number is 1",
      "number.required": "Quantity is a required field",
      "number.base": "Quantity should be a type of number",
      "number.any": "Quantity is a required field",
    }),
  });

  return schema.validate(data);
};

export { updateCartValidator };
