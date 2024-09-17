import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import { productRouter } from "./routes/product";
import { userRouter } from "./routes/user";
import mongoose from "mongoose";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { handleError } from "./utils/errorHandler";

// mongoose configuration
// mongoose.connect("mongodb://localhost:27017/ecommerce");
// according to documentation
// main().catch(function (err) {
//   console.log(err);
// });
// async function main() {
//   await mongoose.connect("mongodb://localhost:27017/ecommerce");
// }
// schema design

const main = async () => {
  try {
    //  for localhost
    // await mongoose.connect("mongodb://localhost:27017/ecommerce");
    // for cloud
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("successfully connected to MongoDB");
    // const _product = new Product({
    //   title: "test",
    //   userId: "101",
    //   body: "test body",
    // });
    // await product.save();
  } catch (e: any) {
    console.log({ error: e.message });
  }
};
main();

// MVC model-view-controller

const app = express();
// checking for user if he/she is valid user or not

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get("Authorization")?.split("Bearer ")[1];
    console.log({ token });
    const decoded = token && jwt.verify(token, `${process.env.SECRET}`);
    // @ts-ignore
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(404);
    }
    console.log({ decoded });
  } catch (err) {
    handleError(err, res);
  }
};
app.use(morgan("dev"));
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(req.method, req.ip, req.hostname, req.get("User-Agent"));
  next();
});
app.use(express.json());
app.use("/api/products", auth, productRouter);
app.use("/api/users", auth, userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
