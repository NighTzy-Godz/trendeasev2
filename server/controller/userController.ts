import { NextFunction, Request, Response } from "express";
import { LoginUser, RegisterUser } from "../interface/userInterface";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validator/userValidator";
import bcrypt from "bcrypt";
import User from "../models/User";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      password,
      confirmPassword,
    }: RegisterUser = req.body;

    const { error } = registerUserValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingEmail = await User.findOne({ email }).select("_id");

    if (existingEmail) {
      return res.status(409).send("User with this email already existing");
    }

    const existingContact = await User.findOne({ contact }).select("_id");
    if (existingContact)
      return res.status(409).send("User with this contact already existing");

    if (confirmPassword !== password)
      return res
        .status(400)
        .send("Password and Confirm Password did not match");

    const newUser = new User({
      firstName,
      lastName,
      email,
      contact,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(confirmPassword, salt);

    await newUser.save();

    res.send(newUser);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: LoginUser = req.body;

    const { error } = loginUserValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).send("User did not found");

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword)
      return res.status(401).send("Credentials did not match");

    const token = existingUser.generateAuthToken();

    res.send(token);
  } catch (error) {
    next(error);
  }
};
