import { NextFunction, Request, Response } from "express";
import {
  LoginUser,
  RegisterUser,
  UpdateUserProfileData,
} from "../interface/userInterface";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserPasswordValidator,
  updateUserValidator,
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
    console.log(newUser);
    res.json(newUser);
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

    res.json(token);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
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
      address,
    }: UpdateUserProfileData = req.body;

    const { error } = updateUserValidator(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const currUserId = req.user?._id;
    const currUser = await User.findOne({ _id: currUserId });
    if (!currUser) return res.status(404).send("User did not found");

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: currUserId },
    });
    if (existingEmail)
      return res.status(409).send("User with this email already exist");

    const existingContact = await User.findOne({
      contact,
      _id: { $ne: currUserId },
    });
    if (existingContact)
      return res.status(409).send("User with this contact already exist");

    currUser.set({ firstName, lastName, email, contact });
    if (address) currUser.address = address;

    await currUser.save();

    res.json(currUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const { error } = updateUserPasswordValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .send("New Password and Confirm Password did not match");

    const currUserId = req.user?._id;
    if (!currUserId)
      return res
        .status(401)
        .send("Please login first. You are not authenticated yet");

    const user = await User.findOne({ _id: currUserId }).select("password");
    if (!user) return res.status(404).send("User did not found");

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isValidPassword)
      return res.status(400).send("Credentials did not match");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(confirmPassword, salt);

    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;

    const currUser = await User.findOne({ _id: currUserId });
    if (!currUser) return res.status(404).send("User did not found");

    res.json(currUser);
  } catch (error) {
    next(error);
  }
};
