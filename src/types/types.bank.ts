export interface BankInterface {
  id: string;
  name: string;
  customerId: string;
  account: string;
  balance: number;
  cards: CreditCardInterface[];
}

export interface CreditCardInterface {
  id: string;
  customerId: string;
  customerName: string;
  cardNumber: string;
  balance: number;
  limit: number;
  bankName: string;
}
