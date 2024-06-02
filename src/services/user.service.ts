import { UserManager } from "../managers/auth.manager";
import { createError } from "../utils/custom.error";
import statusCodes from "../utils/status.codes";

const user = UserManager.getInstance();
export const UserService = {
  //fetch user
  fetchUser: async (props: { id?: string }) => {
    try {
      if (!props.id) {
        throw createError(statusCodes.notFound, "Id must be provided");
      }

      const result = user.getUserBySearch(props);

      return {
        status: statusCodes.ok,
        error: false,
        success: true,
        result,
        message: "User Fetched successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message);
    }
  },
  fetchUserById: async (props: { id?: string }) => {
    try {
      if (!props.id) {
        throw createError(statusCodes.notFound, "Id must be provided");
      }

      const result = user.getUserById(props.id);

      return {
        status: statusCodes.ok,
        error: false,
        success: true,
        result,
        message: "User Fetched successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message);
    }
  },
};
