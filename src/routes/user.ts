import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  replaceUser,
  updateUsers,
  deleteUser,
} from "../controller/users";

export const userRouter = express.Router();

// Rest API
userRouter
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .post("/", createUser)
  .put("/:id", replaceUser)
  .patch("/:id", updateUsers)
  .delete("/:id", deleteUser);
