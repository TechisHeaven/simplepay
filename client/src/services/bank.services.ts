import sanitizedConfig from "@/utils/env.config";

const BankService = {
  createBank: async (data: { id: string; name: string }) => {
    try {
      const url = sanitizedConfig.BACKEND_URL;
      let result = await fetch(`${url}api/bank`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      result = await result.json();
      console.log(result);
      if (result.status !== 201) {
        throw result.message;
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  fetchBank: async (id: string) => {
    try {
      const url = sanitizedConfig.BACKEND_URL;
      let result = await fetch(`${url}api/bank/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      if (result.status !== 200) {
        throw result.message;
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default BankService;
