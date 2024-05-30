import { UserManager } from "../managers/auth.manager";
import { UserInterface } from "../types/types.user";
import { createError } from "../utils/custom.error";
import { PasswordUtils } from "../utils/password.utils";
import statusCodes from "../utils/status.codes";
import { JWTUtils } from "../utils/token.utils";
import uuid4 from "uuid4";

const user = new UserManager();
export const AuthService = {
  //register user
  signUp: async (props: UserInterface) => {
    try {
      console.log("result", props);
      if (!props.name && !props.email && !props.password) {
        throw createError(statusCodes.notFound, "Please Provide all Fields.");
      }

      if (props.password.length < 8) {
        throw createError(
          statusCodes.badRequest,
          "Password must be at least 8 characters"
        );
      }
      const emailCheck = await user.getUserByEmail(props.email);

      if (emailCheck) {
        throw createError(statusCodes.conflict, "Email already exists.");
      }

      props.password = await PasswordUtils.bycrptPassword(props.password);
      const id = uuid4();
      props.id = id;
      props.image =
        "https://lh3.googleusercontent.com/a/ACg8ocIXH1OzdIK01CcjMDfzvlhE-LPnbaeCUG5RLgnXP0puXt80bqNX=s96-c";
      props.accessToken = await JWTUtils.generateToken(props);
      const result = user.createUser(props);
      if (!result) {
        throw createError(statusCodes.badRequest, "Failed to create user");
      }

      return {
        status: statusCodes.created,
        error: false,
        success: true,
        result,
        message: "User created successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message);
    }
  },

  //login user
  signIn: async (props: { email: string; password: string }) => {
    try {
      if (!props.email && !props.password) {
        throw createError(statusCodes.notFound, "Please Provide all Fields");
      }

      const emailCheck = await user.getUserByEmail(props.email);

      if (!emailCheck) {
        throw createError(
          statusCodes.conflict,
          "User with this Email Not Exists"
        );
      }

      const checkPassword = await PasswordUtils.comparePassword({
        reqBodyPassword: props.password,
        userPassword: emailCheck.password,
      });

      if (!checkPassword) {
        throw createError(statusCodes.conflict, "Password is Incorrect.");
      }
      const id = emailCheck.id!;

      return {
        status: statusCodes.ok,
        error: false,
        success: true,
        result: { ...emailCheck },
        message: "User Login successfully",
      };
    } catch (error: any) {
      throw createError(error.status, error.message);
    }
  },
};
