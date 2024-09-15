// import fs from "fs";
// import path from "path";
import { Request, Response } from "express";
import { userType } from "../types/productType";
import { handleError } from "../utils/errorHandler";
import { User } from "../model/user";

// const getFileName = (pathName: string) => {
//   const incomingFileName = path.resolve(__dirname, "..", "constants", pathName);
//   console.log("Resolved path:", incomingFileName);
//   const afterReadingFile = fs.readFileSync(incomingFileName);
//   return afterReadingFile;
// };
// const fileContent = getFileName("data.json");
// const users: userType[] = JSON.parse(fileContent.toString()).users;

export const getAllUsers = async (_req: Request, res: Response) => {
  // res.json(users);
  try {
    const response = await User.find();
    res.json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
};
export const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  // users.push(req.body);
  // res.json(req.body);
  try {
    const user = new User(req.body);
    const response = await user.save();
    res.status(201).json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
};
export const getUser = async (req: Request, res: Response) => {
  // const id = +req.params.id;
  // const user = users.find((p) => p.id === id);
  // !user && res.sendStatus(404);
  // res.json(user);
  try {
    // const user = new User(req.body);
    const response = await User.findById(req.params.id);
    res.status(201).json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
};
export const replaceUser = async (req: Request, res: Response) => {
  // const id = +req.params.id;
  // const userIndex = users.findIndex((p) => p.id === id);
  // const updated = users.splice(userIndex, 1, { ...req.body, id: id });
  // res.sendStatus(201).json(updated);
  try {
    const response = await User.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
};
export const updateUsers = async (req: Request, res: Response) => {
  // const id = +req.params.id;
  // const userIndex = users.findIndex((p) => p.id === id);
  // const getTheUser = users[userIndex];
  // const updated = users.splice(userIndex, 1, {
  //   ...getTheUser,
  //   ...req.body,
  // });
  // res.sendStatus(201).json(updated);
  try {
    const response = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  // const id = +req.params.id;
  // const userIndex = users.findIndex((p) => p.id === id);
  // const updated = users.splice(userIndex, 1);
  // res.sendStatus(201).json(updated);
  const response = await User.findByIdAndDelete({ _id: req.params.id });
  res.status(201).json(response);
  try {
  } catch (err: unknown) {
    handleError(err, res);
  }
};
