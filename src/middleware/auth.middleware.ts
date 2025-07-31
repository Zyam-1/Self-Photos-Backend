import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import userModel from "../models/user.model";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No Token Provided" });

    try {
        const decodedToken = verifyToken(token);
        const user = await userModel.findOne({ _id: decodedToken.id }).select("-password");
        if (!user) return res.status(401).json({ error: "User Not Found" });
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ error: "Invalid Token" });
    }
}