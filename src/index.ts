import express, { Request, Response } from "express";
import dotenv from "dotenv";
import errorHandler from "./utils/error.handle";
import cors from "cors";
dotenv.config({ path: "./.env" });
const app = express();
const port = 3000;
const authRoutes = require("./routes/auth.routes");

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(200).send({ message: "Success Test API" });
});
// Error handler middleware
app.use(errorHandler);
// Catch-all route for 404 errors
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ error: true, success: false, message: "404 Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
