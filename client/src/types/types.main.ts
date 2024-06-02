export interface UserFormData {
  name?: string;
  email: string;
  password: string;
  id?: string;
}
export interface UserInterface {
  email: string;
  id: string;
  image: string;
  name: string;
}

export interface BankDataInterface {
  id: string;
  name: string;
  customerId: string;
  customer_name: string;
  account: number;
  balance: number;
  cards: CardInterface[];
}

export interface CardInterface {
  customerId: string;
  customerName: string;
  cardNumber: number;
  balance: string;
  limit: string;
  bankName: string;
}
