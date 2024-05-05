import jwt from "jsonwebtoken";
import { createError } from "./custom.error";
import sanitizedConfig from "./env.config";

export const JWTUtils = {
  generateToken: async (payload: { id: string }) => {
    const secret = sanitizedConfig.JWT_SECRET;
    const expiresIn = "30d";
    const decode = jwt.sign({ payload }, secret, { expiresIn });
    return decode;
  },
  verifyToken: async (token: string) => {
    const secret = sanitizedConfig.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, secret) as {
        payload: {
          id: string;
          role: string;
          isEmailVerified: boolean;
          parentId?: string;
        };
      };

      return decoded.payload;
    } catch (error: any) {
      // Handle verification failure, e.g., token expired or invalid
      if (error.name === "JsonWebTokenError") {
        console.error("Token verification failed:", error.message);
        // Handle specific JWT errors (e.g., expired token, invalid signature)
        if (error.message.includes("expired")) {
          throw createError(401, "Token expired");
        } else if (error.message.includes("invalid signature")) {
          throw createError(401, "Invalid token signature");
        }
      }
      // Handle other errors
      console.error("Unexpected error:", error);
      return null;
    }
  },
};
