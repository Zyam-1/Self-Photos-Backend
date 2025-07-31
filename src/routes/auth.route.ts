import { Router } from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const userRouter: Router = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile", protect, getProfile)


export default userRouter;