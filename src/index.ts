// api.ts

import * as http from "http";
import * as url from "node:url";
import * as querystring from "node:querystring";
// Define interface for request data (replace with your actual data structure)
const PORT = 3000;

type RequestHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  data: { params: any; query: any; body: any }
) => void;

interface RouteMap {
  [path: string]: RequestHandler;
}

export class MyExpress {
  private routes: { [method: string]: RouteMap };

  constructor() {
    this.routes = {
      GET: {},
      POST: {},
    };
  }

  public get(path: string, callback: RequestHandler): void {
    this.routes["GET"][path] = callback;
  }

  public post(path: string, callback: RequestHandler): void {
    this.routes["POST"][path] = callback;
  }

  private parseParams(
    routePath: string,
    reqPath: string
  ): { [key: string]: string } {
    const routeParts = routePath.split("/");
    const reqParts = reqPath.split("/");
    const params: { [key: string]: string } = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(":") && reqParts[i]) {
        params[routeParts[i].slice(1)] = reqParts[i];
      }
    }
    return params;
  }

  private handleRequest(req: any, res: http.ServerResponse): void {
    const method = req.method;
    const parsedUrl = url.parse(req.url || "", true);
    const path = parsedUrl.pathname || "";
    const queryParams = parsedUrl.query || {};

    let body = "";
    req.on("data", (chunk: any) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const postData = querystring.parse(body);
      const routeHandler = this.routes[method][path];
      if (routeHandler) {
        const parsedBody =
          req.headers["content-type"] === "application/json"
            ? JSON.parse(body)
            : postData;
        const params = this.parseParams(path, path);
        routeHandler(req, res, {
          params: params,
          query: queryParams,
          body: parsedBody,
        });
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found", status: 404 }));
      }
    });
  }

  public listen(port: number, callback?: () => void): void {
    const server = http.createServer((req, res) =>
      this.handleRequest(req, res)
    );
    server.listen(port, callback);
  }
}
const app = new MyExpress();

app.get("/hello", (req, res, { params, query, body }) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(JSON.stringify({ message: `Data received successfully!` }));
});

app.post("/submit", (req, res, { params, query, body }) => {
  // Access the submitted data from body
  console.log("Submitted data:", body);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({ message: `Data received successfully!`, result: body })
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
