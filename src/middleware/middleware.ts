import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import sanitizedConfig from "../utils/env.config";

//protectRouteFunction to protect routes from non authenticated users
interface Header {
  user?: any;
}
export const protectRoute = async (
  req: Request & Header,
  res: Response,
  next: NextFunction
) => {
  let token: any;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //seperate token and bearer token
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, sanitizedConfig.JWT_SECRET!);

      req.user = decoded;
      next();
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return res.status(401).send({
          error: err.message,
          success: false,
          message: "Not authorized, invalid token",
        });
      } else if (err.name === "TokenExpiredError") {
        return res.status(401).send({
          error: err.message,
          success: false,
          message: "Not authorized, token expired",
        });
      } else {
        return res.status(401).send({
          success: false,
          error: err.message,
          message: "Not authorized, token failed",
        });
      }
    }
  }
  if (!token) {
    res.status(401).send({
      error: true,
      success: false,
      message: "Not authorzied , no token",
    });
  }
};
