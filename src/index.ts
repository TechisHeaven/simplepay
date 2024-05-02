// api.ts

import * as http from "http";

// Define interface for request data (replace with your actual data structure)
interface RequestData {
  name: string;
}

// Define interface for response data (replace with your actual data structure)
interface ResponseData {
  message: string;
}

const PORT = 8080;

// Function to create an API route handler
function createRouteHandler(
  method: string,
  url: string,
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void
) {
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method === method && req.url === url) {
      handler(req, res);
    }
  };
}

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  const contentType = headers["content-type"];

  // Define API routes using the createRouteHandler function
  const routes = [
    createRouteHandler("GET", "/api/data", (req, res) => {
      const responseData: ResponseData = { message: "Hello from the API!" };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(responseData));
    }),
    createRouteHandler("POST", "/api/data", (req, res) => {
      let requestData: RequestData;
      req.on("data", (chunk) => {
        requestData = JSON.parse(chunk.toString());
      });

      req.on("end", () => {
        console.log("Received data:", requestData);
        const responseData: ResponseData = {
          message: `Hello, ${requestData.name}!`,
        };
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(responseData));
      });
    }),
  ];

  // Handle requests based on defined routes
  routes.forEach((route) => route(req, res));

  // Fallback for unmatched routes
  if (!routes.some((route) => route(req, res))) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
