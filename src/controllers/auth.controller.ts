import { Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "../dto/auth.dto";

// Register controller
export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.format() })
    }

    const { name, email, password } = result.data;
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
        return res.status(400).json({ error: "User already Existis" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });

    const token = generateToken({ _id: user._id, email: user.email });
    return res.status(201).json({ token, user });

}

export const login = async (req: Request, res: Response) => {
    console.log("Req: ", req.body);
    const result = loginSchema.safeParse(req.body);
    console.log("Result: ", result);
    if (!result.success) {
        return res.status(400).json({ error: result.error.format() })
    }
    const { email, password } = result.data;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ error: "User Doesn't Exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Password isn't Correct" });

    const token = generateToken({ _id: user._id, email: user.email });
    return res.status(200).json({ token, user });
}

export const getProfile = async (req: Request, res: Response) => {
    //set at protect middleware
    if (!req.user) return res.status(401).json({ error: "Not Authorized" });
    return res.json(req.user);
}