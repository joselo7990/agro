import { Router } from "express";

import { logIn } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/login", logIn);

export default userRouter;
