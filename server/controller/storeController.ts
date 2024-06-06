import { Request, Response, NextFunction } from "express";
import { CreateStore } from "../interface/storeInterface";
import {
  createStoreValidator,
  updateStoreValidator,
} from "../validator/storeValidator";
import Store from "../models/Store";
import User from "../models/User";
import mongoose from "mongoose";
import Product from "../models/Product";

export const getMyStoreData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;
    const currUserStore = req.user?.store;

    if (!currUserId)
      return res.status(401).send("Unauthorized, you cannot do that action");

    if (!currUserStore)
      return res
        .status(404)
        .send("You dont have any store registered at the moment");

    const currStore = await Store.findOne({ owner: currUserId });
    if (!currStore) return res.status(404).send("Store did not found");

    res.json(currStore);
  } catch (error) {
    next(error);
  }
};

export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { storeName, description, email, phone }: CreateStore = req.body;
    const currUserId = req.user?._id;

    const { error } = createStoreValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ _id: currUserId }).select("store");

    if (user?.store)
      return res.status(409).send("You already have an existing store");

    const storeFields = ["email", "phone"];
    for (const field of storeFields) {
      const existingStore = await Store.findOne({
        [field]: req.body[field],
      }).select("_id");
      if (existingStore) {
        return res.status(409).send(`Store with this ${field} already exists`);
      }
    }

    const store = new Store({
      storeName,
      description,
      owner: currUserId,
      email,
      phone,
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

export const updateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { storeName, description, email, phone }: CreateStore = req.body;
    const currUserId = req.user?._id;

    const { error } = updateStoreValidator(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (!currUserId) {
      return res.status(401).send("Unauthorized");
    }

    const user = await User.findById(currUserId).select("store");
    if (!user?.store) {
      return res.status(409).send("You dont have have an existing store");
    }

    const storeFields = ["email", "phone"];
    for (const field of storeFields) {
      const query = { [field]: req.body[field], owner: { $ne: currUserId } };
      const existingStore = await Store.findOne(query).select("_id");
      if (existingStore) {
        return res.status(409).send(`Store with this ${field} already exists`);
      }
    }

    const store = await Store.findOne({ owner: currUserId });
    if (!store) {
      return res.status(404).send("Store not found");
    }

    store.set({
      storeName,
      description,
      email,
      phone,
    });

    await store.save();

    res.send(store);
  } catch (error) {
    next(error);
  }
};
