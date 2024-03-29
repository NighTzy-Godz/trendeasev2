import { Request, Response, NextFunction } from "express";
import { CreateStore } from "../interface/storeInterface";
import { createStoreValidator } from "../validator/storeValidator";
import Store from "../models/Store";

const createStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { storeName, description }: CreateStore = req.body;

    const { error } = createStoreValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const store = new Store({
      storeName,
      description,
    });

    await store.save();

    res.send(store);
  } catch (error) {
    next(error);
  }
};
