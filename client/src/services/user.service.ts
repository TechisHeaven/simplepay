import sanitizedConfig from "@/utils/env.config";

const UserService = {
  fetchUser: async (data: { search: string; id: string }) => {
    try {
      const url = sanitizedConfig.BACKEND_URL;
      let result = await fetch(`${url}api/user/${data.id}/${data.search}`, {
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

export default UserService;
