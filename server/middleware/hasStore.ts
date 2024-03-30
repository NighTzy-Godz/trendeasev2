import { Request, Response, NextFunction } from "express";
import Store from "../models/Store";

const hasStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currStoreId = req.user?.store;
    const currStore = await Store.findOne({ _id: currStoreId }).select("_id");

    if (!currStore)
      return res.status(401).send("This user did not register it's store yet.");

    next();
  } catch (error) {
    next(error);
  }
};

export default hasStore;
