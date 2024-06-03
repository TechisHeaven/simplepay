import { NextFunction, Request, Response } from "express";
import { BankService } from "../services/bank.service";

export const BankController = {
  createBank: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BankService.createBank(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
  createCard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BankService.createCard(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  fetchBank: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await BankService.fetchBank(req.params?.id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
