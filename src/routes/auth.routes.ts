import express from "express";
const router = express.Router();

//? create all auth routes here

//*login user route
router.route("/login").post((req, res) => {
  res.send("Hello");
});
//*register user route
router.route("/register").post((req, res) => {
  res.send("Hello");
});

module.exports = router;
