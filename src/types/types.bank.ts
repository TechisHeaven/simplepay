export interface BankInterface {
  id: string;
  name: string;
  customerId: string;
  account: string;
  balance: number;
  cards: CreditCardInterface[];
}

export interface CreditCardInterface {
  customerId: string;
  customerName: string;
  cardNumber: string;
  balance: number;
  limit: number;
  bankName: string;
}
