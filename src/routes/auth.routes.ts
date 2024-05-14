import express from "express";
import { AuthController } from "../controller/auth.controller";
const router = express.Router();

//? create all auth routes here
//*login user route
router.route("/login").post(AuthController.signIn);
//*register user route
router.route("/register").post(AuthController.signUp);

module.exports = router;
