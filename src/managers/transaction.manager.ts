import { TransactionInterface } from "../types/types.transaction";

export class TransactionManager {
  private static instance: TransactionManager;
  private transactions: TransactionInterface[] = [];
  constructor() {
    this.transactions = this.transactions;
  }

  // Method to get or create the singleton instance
  public static getInstance(): TransactionManager {
    if (!this.instance) {
      this.instance = new TransactionManager();
    }
    return this.instance;
  }

  createTransaction(transaction: TransactionInterface) {
    this.transactions.push(transaction);
    return transaction;
  }

  getTransactionById(id: string) {
    return this.transactions.find((transaction) => transaction.id === id);
  }
}
