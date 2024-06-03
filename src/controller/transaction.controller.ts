import { NextFunction, Request, Response } from "express";
import { BankService } from "../services/bank.service";
import { TransactionService } from "../services/transaction.service";

export const TransactionController = {
  createTransaction: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await TransactionService.createTransaction(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  fetchTransaction: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await TransactionService.fetchTransaction(req.params?.id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
