// import WebSocket from "ws";

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 });

// // Event listener for connection
// wss.on("connection", function connection(ws) {
//   console.log("Client connected");

//   // Event listener for messages
//   ws.on("message", function incoming(message) {
//     console.log("Received: %s", message);

//     // Broadcast the received message to all clients
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   // Event listener for closing the connection
//   ws.on("close", function close() {
//     console.log("Client disconnected");
//   });
// });

import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import http from "http";
import sanitizedConfig from "../utils/env.config";
dotenv.config();

const port = sanitizedConfig.WEBSOCKET_PORT || 8080;

const server = http.createServer().listen(port);
export function createWebSocketServer(): Promise<WebSocketServer> {
  return new Promise((resolve, reject) => {
    server.on("listening", () => {
      console.log(`WebSocket server listening on port ${port}`);
      resolve(new WebSocketServer({ server }));
    });

    server.on("error", (error: any) => {
      reject(error);
    });
  });
}
