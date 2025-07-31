import { IUser } from "../models/user.model";
// module.exports isused for jwt instead of export default. That is why import won't work here
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET;

// For token generation
export const generateToken = (user: Pick<IUser, "_id" | "email">) => {
    console.log("JWT: ", JWT_SECRET);
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d"
    })
}

// For token verification
export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}