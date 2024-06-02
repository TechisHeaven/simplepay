import express from "express";
import { UserController } from "../controller/user.controller";
const router = express.Router();

//? create all auth routes here
//*login user route
router.route("/:id/:search").get(UserController.fetchUser);
router.route("/:id").get(UserController.fetchUserById);

module.exports = router;
