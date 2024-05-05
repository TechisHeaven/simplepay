import bcrypt from "bcryptjs";
import { createError } from "./custom.error";
import statusCodes from "./status.codes";

export const PasswordUtils = {
  bycrptPassword: async (password: string) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      if (!hash) {
        throw createError(
          statusCodes.internalServerError,
          "Something went wrong"
        );
      }
      return hash;
    } catch (error: any) {
      throw createError(error.status, error.message);
    }
  },
  comparePassword: async (props: {
    reqBodyPassword: string;
    userPassword: string;
  }) => {
    try {
      const isPasswordCorrect = await bcrypt.compare(
        props.reqBodyPassword,
        props.userPassword
      );
      return isPasswordCorrect;
    } catch (error) {
      throw createError(statusCodes.badRequest, "Wrong password");
    }
  },
};
