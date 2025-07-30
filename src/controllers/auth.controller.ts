import { Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "../dto/auth.dto";


export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() })
    }

    const { name, email, password } = result.data;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already Existis" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });

}