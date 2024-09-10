import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { userType } from "../types/productType";

const getFileName = (pathName: string) => {
  const incomingFileName = path.resolve(__dirname, "..", "constants", pathName);
  console.log("Resolved path:", incomingFileName);
  const afterReadingFile = fs.readFileSync(incomingFileName);
  return afterReadingFile;
};
const fileContent = getFileName("data.json");
const users: userType[] = JSON.parse(fileContent.toString()).users;

export const getAllUsers = (_req: Request, res: Response) => {
  res.json(users);
};
export const createUser = (req: Request, res: Response) => {
  console.log(req.body);
  users.push(req.body);
  res.json(req.body);
};
export const getUser = (req: Request, res: Response) => {
  const id = +req.params.id;
  const user = users.find((p) => p.id === id);
  !user && res.sendStatus(404);
  res.json(user);
};
export const replaceUser = (req: Request, res: Response) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const updated = users.splice(userIndex, 1, { ...req.body, id: id });
  res.sendStatus(201).json(updated);
};
export const updateUsers = (req: Request, res: Response) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const getTheUser = users[userIndex];
  const updated = users.splice(userIndex, 1, {
    ...getTheUser,
    ...req.body,
  });
  res.sendStatus(201).json(updated);
};
export const deleteUser = (req: Request, res: Response) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const updated = users.splice(userIndex, 1);

  res.sendStatus(201).json(updated);
};
