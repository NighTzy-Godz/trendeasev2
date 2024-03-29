import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedUser {
  _id: string;
  fullName: string;
  store: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(403).send("Forbidden. You are not authorized");

    const decoded = jwt.verify(token, "jwtSecretKey") as JwtPayload;

    const user: DecodedUser = {
      _id: decoded._id,
      fullName: decoded.fullName,
      store: decoded.store,
    };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
