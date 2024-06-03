import express from "express";
import { protectRoute } from "../middleware/middleware";
import { TransactionController } from "../controller/transaction.controller";
const router = express.Router();

//? create all auth routes here
//*create bank account route
router.route("/").post(TransactionController.createTransaction);
// fetch bank account routes
router.route("/:id").get(TransactionController.fetchTransaction);

module.exports = router;
