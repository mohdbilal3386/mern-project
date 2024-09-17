import mongoose, { Document as MongooseDocument, ObjectId } from "mongoose";
import { Product } from "../model/product";

// import fs from "fs";
// import path from "path";
import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";

// const getFileName = (pathName: string) => {
//   const incomingFileName = path.resolve(
//     __dirname,
//     "..",
//     "src",
//     "constants",
//     pathName
//   );
//   console.log("Resolved path:", incomingFileName);
//   const afterReadingFile = fs.readFileSync(incomingFileName);
//   return afterReadingFile;
// };
// const fileContent = getFileName("data.json");
// const obj: ProductType[] = JSON.parse(fileContent.toString()).products;
// @ts-ignore
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let query = Product.find();
    let order: number = req.query.order === "desc" ? -1 : 1; // default is 1 for ascending order
    let sort: string = typeof req.query.sort === "string" ? req.query.sort : "";
    let limit: number =
      typeof req.query.limit === "string" ? parseInt(req.query.limit) : 0;

    // Only apply sorting and limiting if valid parameters are present
    if (sort && (order === 1 || order === -1)) {
      query = query.sort({ [sort]: order });
    }
    if (limit > 0) {
      query = query.limit(limit);
    }

    const response = await query.exec();
    res.json(response);
    // const response = await Product.find();
    // res.json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
  // res.json(obj);
};
// @ts-ignore
export const createProduct = async (req: Request, res: Response) => {
  // console.log(req.body);
  // obj.push(req.body);
  try {
    const product = new Product(req.body);
    const response: MongooseDocument = await product.save();
    res.status(201).json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // const response = await Product.findById(new mongoose.Types.ObjectId(id));
    const response = await Product.findById(id);
    res.json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
  // const id = +req.params.id;
  // const product = obj.find((p) => p.id === id);
  // !product && res.sendStatus(404);
  // res.json(product);
};

export const replaceProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
  // const id = +req.params.id;
  // const productIndex = obj.findIndex((p) => p.id === id);
  // const updated = obj.splice(productIndex, 1, { ...req.body, id: id });
  // res.sendStatus(201).json(updated);
};
// @ts-ignore
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
  // const id = +req.params.id;
  // const productIndex = obj.findIndex((p) => p.id === id);
  // const getTheProduct = obj[productIndex];
  // const updated = obj.splice(productIndex, 1, {
  //   ...getTheProduct,
  //   ...req.body,
  // });
  // res.sendStatus(201).json(updated);
};
// @ts-ignore
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await Product.findByIdAndDelete({ _id: id });
    res.json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
  // const id = +req.params.id;
  // const productIndex = obj.findIndex((p) => p.id === id);
  // const updated = obj.splice(productIndex, 1);
  // // !productIndex && res.sendStatus(404);
  // res.sendStatus(201).json(updated);
};
