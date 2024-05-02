import http from "http";
// Function to create an API route handler
export function createRouteHandler(
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

//Function to return an API route Body
export function returnBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData); // Resolve with parsed data
      } catch (error) {
        console.error("Error parsing request body:", error);
        reject(new Error("Invalid request body")); // Reject with error for invalid data
      }
    });
  });
}

//Function to return API route parameters

export function getRouteParams(req: http.IncomingMessage): {
  [key: string]: string;
} {
  const url = req.url || "";
  const urlParts = url.split("/");

  // Assuming your route pattern is like /api/user/:id
  const routePattern = "/api/user/:id";
  const routeParts = routePattern.split("/");

  const params: { [key: string]: string } = {};
  if (urlParts.length === routeParts.length) {
    for (let i = 0; i < urlParts.length; i++) {
      if (routeParts[i].startsWith(":")) {
        const paramName = routeParts[i].slice(1); // Remove leading ':' from param name
        params[paramName] = urlParts[i + 1];
      }
    }
  }

  return params;
}

//Function to return API route query parameters
export function getQueryString(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = req.url || ""; // Handle potential undefined URL
    const queryString = url.split("?")[1] || ""; // Extract query string after '?'

    const parsedQuery: { [key: string]: string } = {};
    if (queryString) {
      const queryParams = new URLSearchParams(queryString);
      for (const [key, value] of queryParams.entries()) {
        parsedQuery[key] = value;
      }
    }

    resolve(parsedQuery);
  });
}
