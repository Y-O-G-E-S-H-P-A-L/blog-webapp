import express from "express";

import { getAllUser, signUp, logIn } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/", getAllUser);

userRouter.post("/signup", signUp);

userRouter.post("/login", logIn);

export default userRouter;
