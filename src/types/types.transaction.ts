import { CreditCardInterface } from "./types.bank";

export interface TransactionInterface {
  id: string;
  amount: number;
  status: "failed" | "pending" | "complete";
  from: {
    id: string;
    name: string;
    image: string;
    timestamp: Date;
  };
  to: {
    id: string;
    name: string;
    image: string;
    timestamp: Date;
  };
  card: string;
  note: string;
}
