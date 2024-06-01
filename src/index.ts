import express, { Request, Response } from "express";
import dotenv from "dotenv";
import errorHandler from "./utils/error.handle";
import cors from "cors";
import { createWebSocketServer } from "./websockets/websocket";
import sanitizedConfig from "./utils/env.config";
const app = express();
const port = sanitizedConfig.SERVER_PORT;
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bankRoutes = require("./routes/bank.routes");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bank", bankRoutes);
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

// websockets logic here-----------
(async () => {
  try {
    const wss = await createWebSocketServer(); // Adjust port if needed

    // Your WebSocket server logic here
    wss.on("connection", (ws) => {
      // Handle incoming connections (implement authentication/authorization here)
      ws.on("message", (message) => {
        const newData = message.toString("utf8");
        // Handle incoming messages
        wss.clients.forEach(function (client) {
          if (client !== ws) {
            client.send(message.toString());
          }
        });
      });
    });
  } catch (error) {
    console.error("Error creating WebSocket server:", error);
  }
})();
