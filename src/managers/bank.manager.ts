import { BankInterface, CreditCardInterface } from "../types/types.bank";
import { createError } from "../utils/custom.error";
import statusCodes from "../utils/status.codes";

export class BankManager {
  private static instance: BankManager;
  private accounts: BankInterface[] = [];
  constructor() {
    this.accounts = this.accounts;
  }
  // Method to get or create the singleton instance
  public static getInstance(): BankManager {
    if (!this.instance) {
      this.instance = new BankManager();
    }
    return this.instance;
  }
  createBank(account: BankInterface) {
    this.accounts.push(account);
    return account;
  }
  createCard(account: CreditCardInterface) {
    const CurrentAccount = this.accounts.find(
      (currentAccount) => currentAccount.customerId == account.customerId
    );
    CurrentAccount?.cards.push(account);
    return account;
  }

  getUserBankById(id: string) {
    return this.accounts.find((bank: BankInterface) => bank.customerId === id);
  }

  getUserCardById(id: string) {
    return this.accounts.find((bank: BankInterface) => bank.cards);
  }

  updateBalanceById(
    sender: string,
    reciever: string,
    amount: number,
    card: string
  ) {
    const senderAccount = this.accounts.find(
      (account) => account.customerId === sender
    );
    const recieverAccount = this.accounts.find(
      (account) => account.customerId === reciever
    );
    if (senderAccount && recieverAccount) {
      const FindCard = senderAccount.cards.find(
        (cardItem) => cardItem.id === card
      ) as CreditCardInterface;
      if (!FindCard) {
        throw createError(statusCodes.notFound, "No card found");
      }
      FindCard.balance -= amount;

      recieverAccount.balance += amount;
      console.log(FindCard, recieverAccount);

      return true;
    }

    return null;
  }

  //   getUser(email: string, password: string) {
  //     return this.user.filter(
  //       (user) => user.email === email && user.password === password
  //     );
  //   }

  //   getUserByToken(token: string) {
  //     return this.user.filter((user) => user.token === token);
  //   }
}
