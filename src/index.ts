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

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  const contentType = headers["content-type"];

  // Define API routes using the createRouteHandler function
  if (method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const responseData: ResponseData = { message: "Hello from the API!" };
    const responseString = JSON.stringify(responseData);

    res.write(responseString);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
