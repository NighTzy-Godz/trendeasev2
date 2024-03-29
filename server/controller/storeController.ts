import { Request, Response, NextFunction } from "express";
import { CreateStore } from "../interface/storeInterface";
import { createStoreValidator } from "../validator/storeValidator";
import Store from "../models/Store";
import User from "../models/User";
import mongoose from "mongoose";

export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { storeName, description }: CreateStore = req.body;
    const currUserId = req.user?._id;

    const { error } = createStoreValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ _id: currUserId }).select("store");

    if (user?.store)
      return res.status(409).send("You already have an existing store");

    const store = new Store({
      storeName,
      description,
      owner: currUserId,
    });

    if (user) {
      user.store = store._id;
      await user.save();
    }

    await store.save();

    await session.commitTransaction();
    session.endSession();

    res.send(store);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
