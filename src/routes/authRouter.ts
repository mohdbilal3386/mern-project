import { Router } from "express";
import { createUser, login } from "../controller/auth";

export const authRouter = Router();

authRouter.post("/signup", createUser);
authRouter.post("/login", login);
