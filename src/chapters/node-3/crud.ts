/*
==========================================
        crud
==========================================
*/

import fs from "fs";
import path from "path";
import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
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

const app = express();
app.use(morgan("dev"));
// logger :- Application-level middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(req.method, req.ip, req.hostname, req.get("User-Agent"));
  next();
});

// Router-level middleware but that's not the better idea because we can't set password to query parameters,
// const auth = (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.query);
//   if (req.query.password === "123") {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// };

//  Built-in middleware
/* for now: it will help us to get the json data from the request body*/

// bodyParser
app.use(express.json());

// get the file from remote or a directory to read
// app.use(express.static("src/constants/"));

// urlEncoded :- this will be used when sending data from the form
// app.use(express.urlencoded())

const auth = (_req: Request, _res: Response, next: NextFunction) => {
  // console.log(req.body);
  // if (req.body.password === "123") {
  //   next();
  // } else {
  //   res.sendStatus(401);
  // }
  next();
};
// Rest API
app.get("/products", auth, (_req: Request, res: Response) => {
  res.json(obj);
});
// Dynamic Routes For single products
app.get("/products/:id", auth, (req: Request, res: Response) => {
  const id = +req.params.id;
  const product = obj.find((p) => p.id === id);
  !product && res.sendStatus(404);
  res.json(product);
});
app.post("/products", auth, (req: Request, res: Response) => {
  console.log(req.body);
  // req.
  obj.push(req.body);
  res.json(req.body);
});
// means put something new remove others properties
app.put("/products/:id", auth, (req: Request, res: Response) => {
  const id = +req.params.id;
  const productIndex = obj.findIndex((p) => p.id === id);
  const updated = obj.splice(productIndex, 1, { ...req.body, id: id });
  // !productIndex && res.sendStatus(404);
  res.sendStatus(201).json(updated);
});
// means patch keep all the properties change only which require
app.patch("/products/:id", auth, (req: Request, res: Response) => {
  const id = +req.params.id;
  const productIndex = obj.findIndex((p) => p.id === id);
  const getTheProduct = obj[productIndex];
  const updated = obj.splice(productIndex, 1, {
    ...getTheProduct,
    ...req.body,
  });
  // !productIndex && res.sendStatus(404);
  res.sendStatus(201).json(updated);
});
// means patch keep all the properties change only which require
app.delete("/products/:id", auth, (req: Request, res: Response) => {
  const id = +req.params.id;
  const productIndex = obj.findIndex((p) => p.id === id);
  const updated = obj.splice(productIndex, 1);
  // !productIndex && res.sendStatus(404);
  res.sendStatus(201).json(updated);
});
// Names: API - Endpoint - Route

// Assignment :- 1
// http://localhost:8080/demo/?name=Youstart&age=21&subject=bakcend

// app.get("/demo/:name/:age/:subject", auth, (req: Request, res: Response) => {
//   console.log({ queryParams: req.params });
//   res.json(req.params);
// });
// app.get("/demo/:id", auth, (req: Request, res: Response) => {
//   console.log({ param: req.params });
//   res.send({ type: "GET" });
// });

app.post("/", auth, (_req: Request, res: Response) => {
  res.send({ type: "POST" });
});
app.put("/", (_req: Request, res: Response) => {
  res.send({ type: "PUT" });
});
app.patch("/", (_req: Request, res: Response) => {
  res.send({ type: "PATCH" });
});

app.delete("/", (_req: Request, res: Response) => {
  res.send({ type: "DELETE" });
});

app.listen(8080, () => {
  console.log("Server started");
});

// res.json(obj);
// res.send("Hello world!");
// res.sendFile(`F:\fullstack\node_setup\src\constants\index.html`);
