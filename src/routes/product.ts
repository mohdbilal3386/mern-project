import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product";

export const productRouter = express.Router();

// Rest API
productRouter
  .get("/", getAllProducts)
  .get("/:id", getProduct)
  .post("/", createProduct)
  .put("/:id", replaceProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);
