import { UserManager } from "../managers/auth.manager";
import { UserInterface } from "../types/types.user";
import { createError } from "../utils/custom.error";
import { PasswordUtils } from "../utils/password.utils";
import statusCodes from "../utils/status.codes";
import { JWTUtils } from "../utils/token.utils";
import uuid4 from "uuid4";

const user = new UserManager();
export const UserService = {
  //fetch user
  fetchUser: async (props: { search?: string }) => {
    try {
      if (!props.search) {
        throw createError(statusCodes.notFound, "Value must be provided");
      }

      const result = user.getUserBySearch(props.search);
      if (!result) {
        throw createError(statusCodes.badRequest, "Failed to Fetch user");
      }

      return {
        status: statusCodes.created,
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
