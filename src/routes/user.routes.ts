import express from "express";
import { UserController } from "../controller/user.controller";
const router = express.Router();

//? create all auth routes here
//*login user route
router.route("/:search").get(UserController.fetchUser);

module.exports = router;
