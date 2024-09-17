import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";

export const authController = async (req: Request, res: Response) => {
  try {
    const token = jwt.sign({ email: req.body.email }, `${process.env.SECRET}`);
    const user = new User({ ...req.body, token });
    const response = await user.save();
    res.status(201).json(response);
  } catch (err: unknown) {
    handleError(err, res);
  }
};
// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const token = jwt.sign({ email: req.body.email }, `${process.env.SECRET}`);
//     const user = new User({ ...req.body, token });
//     const response = await user.save();
//     res.status(201).json(response);
//   } catch (err: unknown) {
//     handleError(err, res);
//   }
// };
