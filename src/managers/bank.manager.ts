import { BankInterface } from "../types/types.bank";

export class BankManager {
  private accounts: BankInterface[] = [];
  constructor() {
    this.accounts = this.accounts;
  }

  createBank(account: BankInterface) {
    this.accounts.push(account);
    return account;
  }

  getUserBankById(id: string) {
    return this.accounts.find((bank: BankInterface) => bank.customerId === id);
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
