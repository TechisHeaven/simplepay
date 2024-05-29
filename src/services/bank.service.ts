import uuid4 from "uuid4";
import { BankManager } from "../managers/bank.manager";
import { createError } from "../utils/custom.error";
import statusCodes from "../utils/status.codes";
import { randomNumberGenerator } from "../utils/randomNumberGenerator";

const Bank = new BankManager();
export const BankService = {
  createBank: async ({
    id,
    customerName,
  }: {
    id: string;
    customerName: string;
  }) => {
    try {
      if (!id || !customerName) {
        throw createError(statusCodes.notFound, "All Fields not found");
      }
      const checkIdExists = await Bank.getUserBankById(id);
      if (checkIdExists) {
        throw createError(statusCodes.conflict, "User already exists");
      }

      const bankId = uuid4();
      const accountNumber = randomNumberGenerator();
      const creditCardNumber = randomNumberGenerator();
      const bankFields = {
        id: bankId,
        name: "SimplePay Bank",
        customerId: id,
        customer_name: customerName,
        account: accountNumber,
        balance: 12000,
        cards: [
          {
            customerId: id,
            customerName: "Himanshu verma",
            cardNumber: creditCardNumber,
            balance: 14000,
            limit: 20000,
            bankName: "SimplePay",
          },
        ],
      };
      const result = Bank.createBank(bankFields);

      return {
        status: statusCodes.ok,
        success: true,
        error: false,
        result,
        message: "Bank created successfully",
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
