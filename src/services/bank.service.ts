import uuid4 from "uuid4";
import { BankManager } from "../managers/bank.manager";
import { createError } from "../utils/custom.error";
import statusCodes from "../utils/status.codes";
import { randomNumberGenerator } from "../utils/randomNumberGenerator";
import { CreditCardInterface } from "../types/types.bank";

const Bank = BankManager.getInstance();
export const BankService = {
  createBank: async ({ id, name }: { id: string; name: string }) => {
    try {
      if (!id || !name) {
        throw createError(statusCodes.notFound, "All Fields not found");
      }
      const checkIdExists = await Bank.getUserBankById(id);
      if (checkIdExists) {
        throw createError(statusCodes.conflict, "User already exists");
      }

      const bankId = uuid4();
      const cardId = uuid4();
      const accountNumber = randomNumberGenerator();
      const creditCardNumber = randomNumberGenerator();
      const bankFields = {
        id: bankId,
        name: "SimplePay Bank",
        customerId: id,
        customer_name: name,
        account: accountNumber,
        balance: 12000,
        cards: [
          {
            id: cardId,
            customerId: id,
            customerName: name,
            cardNumber: creditCardNumber,
            balance: 14000,
            limit: 20000,
            bankName: "SimplePay",
          },
        ],
      };
      const result = Bank.createBank(bankFields);

      return {
        status: statusCodes.created,
        success: true,
        error: false,
        result,
        message: "Bank created successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message || error);
    }
  },
  createCard: async ({ id, name }: { id: string; name: string }) => {
    try {
      if (!id || !name) {
        throw createError(statusCodes.notFound, "All Fields not found");
      }

      const cardId = uuid4();
      const creditCardNumber = randomNumberGenerator();
      const cardFields: CreditCardInterface = {
        id: cardId,
        customerId: id,
        customerName: name,
        cardNumber: creditCardNumber,
        balance: 14000,
        limit: 20000,
        bankName: "SimplePay",
      };
      const result = Bank.createCard(cardFields);
      return {
        status: statusCodes.created,
        success: true,
        error: false,
        result,
        message: "Card created successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message || error);
    }
  },
  fetchBank: async (id: string) => {
    try {
      if (!id) {
        throw createError(statusCodes.notFound, "Bank Id Not Found");
      }

      const result = await Bank.getUserBankById(id);
      if (!result) {
        throw createError(statusCodes.notFound, "Bank Not Found");
      }
      return {
        status: statusCodes.ok,
        success: true,
        error: false,
        result,
        message: "Bank Fetched successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message || error);
    }
  },
};
