import WebSocket from "ws";

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for connection
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  // Event listener for messages
  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);

    // Broadcast the received message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Event listener for closing the connection
  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});
