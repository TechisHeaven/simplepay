import express from "express";
import { BankController } from "../controller/bank.controller";
import { protectRoute } from "../middleware/middleware";
const router = express.Router();

//? create all auth routes here
//*create bank account route
router.route("/").post(BankController.createBank);
// fetch bank account routes
router.route("/:id").get(BankController.fetchBank);
// create bank account Card routes
router.route("/card").post(BankController.createCard);

module.exports = router;
