import { NextFunction, Request, Response } from "express";
import { createError } from "../utils/custom.error";
import statusCodes from "../utils/status.codes";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  signIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.signIn(req.body);
      return res.status(statusCodes.ok).send(result);
    } catch (error) {
      next(error);
    }
  },
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.signUp(req.body);
      return res.status(statusCodes.ok).send(result);
    } catch (error) {
      next(error);
    }
  },
};
