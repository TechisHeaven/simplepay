import { NextFunction, Request, Response } from "express";
import { createError } from "../utils/custom.error";
import statusCodes from "../utils/status.codes";
import { UserService } from "../services/user.service";

export const UserController = {
  fetchUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.fetchUser(req.params);
      return res.status(statusCodes.ok).send(result);
    } catch (error) {
      next(error);
    }
  },
};
