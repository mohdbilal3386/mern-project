import { Router } from "express";
import { authController } from "../controller/auth";

export const authRouter = Router();

authRouter.post("/", authController);
