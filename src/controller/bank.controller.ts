import { NextFunction, Request, Response } from "express";
import { BankService } from "../services/bank.service";

export const BankController = {
  createBank: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BankService.createBank(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
