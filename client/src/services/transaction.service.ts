import sanitizedConfig from "@/utils/env.config";

const TransactionService = {
  createTransaction: async (data: {
    amount: number;
    from?: string;
    to?: string;
    note: string;
  }) => {
    try {
      const url = sanitizedConfig.BACKEND_URL;
      let result = await fetch(`${url}api/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      result = await result.json();
      if (result.status !== 201) {
        throw result.message;
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default TransactionService;
