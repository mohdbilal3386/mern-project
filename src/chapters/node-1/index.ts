import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";

interface Products {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getFileName = (pathName: string) => {
  const incomingFileName = path.resolve(__dirname, "constants", pathName);
  const afterReadingFile = fs.readFileSync(incomingFileName);
  return afterReadingFile;
};
const fileContent = getFileName("data.json");
const obj: Products[] = JSON.parse(fileContent.toString());

const createServer = (port: number) => {
  const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      if (req.url?.startsWith("/demo")) {
        const id = req.url.split("/")[2];
        const d = obj.find((item) => item.id === +id);
        console.log(d, req.method);
        return;
      }
      switch (req.url) {
        case "/":
          res.setHeader("Content-Type", "text/html");
          res.end(getFileName("index.html"));
          return;
        case "/demo":
          res.setHeader("Content-Type", "application/json");
          res.end(getFileName("data.json"));
          return;
        default:
          console.log("ive been called with");
          res.writeHead(404, "Not Found");

          res.end();
          return;
      }
    }
  );
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  return server;
};

const port1 = 3000;
const port2 = 4000;

const server1 = createServer(port1);
const server2 = createServer(port2);

const switchPort = (server: http.Server, oldPort: number, newPort: number) => {
  server.close(() => {
    console.log(`Switching server from port ${oldPort} to port ${newPort}`);
    server.listen(newPort, () => {
      console.log(`Server now running on port ${newPort}`);
    });
  });
};

setTimeout(() => {
  // Switch ports for the two servers
  switchPort(server1, port1, port2);
  switchPort(server2, port2, port1);
}, 10000);
