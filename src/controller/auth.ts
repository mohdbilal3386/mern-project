import jwt from "jsonwebtoken";
import { User } from "../model/user";
import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import bcrypt from "bcrypt";

// signup
export const createUser = async (req: Request, res: Response) => {
  try {
    const token = jwt.sign({ email: req.body.email }, `${process.env.SECRET}`);
    const hash = bcrypt.hashSync(req.body.password, 10);
    const user = new User({ ...req.body, token, password: hash });
    const response = await user.save();
    res.status(201).json({ token: response.token });
  } catch (err: unknown) {
    handleError(err, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = doc && bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      const token = jwt.sign(
        { email: req.body.email },
        `${process.env.SECRET}`
      );
      doc.token = token;
      const response = await doc.save();
      res.json({ token: response.token });
    } else {
      res.sendStatus(404);
    }
    //   res.status(201).json(response);
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
