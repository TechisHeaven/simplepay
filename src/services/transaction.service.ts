import uuid4 from "uuid4";
import { BankManager } from "../managers/bank.manager";
import { createError } from "../utils/custom.error";
import statusCodes from "../utils/status.codes";
import { randomNumberGenerator } from "../utils/randomNumberGenerator";
import { CreditCardInterface } from "../types/types.bank";
import { TransactionManager } from "../managers/transaction.manager";
import { TransactionInterface } from "../types/types.transaction";
import { UserManager } from "../managers/auth.manager";

const Transaction = new TransactionManager();
const User = UserManager.getInstance();
const Bank = BankManager.getInstance();
export const TransactionService = {
  createTransaction: async (
    props: TransactionInterface & {
      from: string;
      to: string;
    }
  ) => {
    try {
      if (!props.amount || !props.from || !props.to || !props.note) {
        throw createError(statusCodes.notFound, "All Fields not found");
      }
      console.log("creating");
      const BankTransfer = await Bank.updateBalanceById(
        props.from,
        props.to,
        props.amount,
        props.card
      );

      if (!BankTransfer) {
        throw createError(statusCodes.badRequest, "Bank transfer not found");
      }
      const fromUser = await User.getUserById(props.from);
      const toUser = await User.getUserById(props.to);

      if (!fromUser || !toUser) {
        throw createError(statusCodes.notFound, "Accounts not Found");
      }
      const transactionId = uuid4();
      const transactionFields: TransactionInterface = {
        id: transactionId,
        amount: props.amount,
        from: {
          id: fromUser?.id!,
          name: fromUser?.name!,
          image: fromUser?.image!,
          timestamp: new Date(),
        },
        to: {
          id: toUser?.id!,
          name: toUser?.name!,
          image: toUser?.image!,
          timestamp: new Date(),
        },
        card: props.card,
        note: props.note,
        status: "complete",
      };
      const result = Transaction.createTransaction(transactionFields);

      return {
        status: statusCodes.created,
        success: true,
        error: false,
        result,
        message: "Transaction created successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message || error);
    }
  },
  fetchTransaction: async (id: string) => {
    try {
      if (!id) {
        throw createError(statusCodes.notFound, "Transaction Id Not Found");
      }

      const result = await Transaction.getTransactionById(id);
      if (!result) {
        throw createError(statusCodes.notFound, "Transaction Not Found");
      }
      return {
        status: statusCodes.ok,
        success: true,
        error: false,
        result,
        message: "Transaction Fetched successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message || error);
    }
  },
};
