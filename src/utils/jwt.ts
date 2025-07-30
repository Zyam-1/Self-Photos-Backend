import { jwt } from "jsonwebtoken";
import { IUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET;

// For token generation
export const generateToken = (user: Pick<IUser, "_id" | "email">) => {
    return jwt.sign({ id: user._id, email: user.email }), JWT_SECRET, {
        expiresIn: "7d"
    }
}

// For token verification
export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}