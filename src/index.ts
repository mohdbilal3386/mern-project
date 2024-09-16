import morgan from "morgan";
import express, { NextFunction, Request, Response } from "express";
import { productRouter } from "./routes/product";
import { userRouter } from "./routes/user";
import mongoose from "mongoose";
import "dotenv/config";

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
console.log(process.env.DB_PASSWORD);

const app = express();
app.use(morgan("dev"));
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(req.method, req.ip, req.hostname, req.get("User-Agent"));
  next();
});
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
