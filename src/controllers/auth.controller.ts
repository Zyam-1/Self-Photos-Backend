import { Request, Response } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { registerSchema, loginSchema, updateProfileSchema } from "../dto/auth.dto";

// Register controller
export const register = async (req: Request, res: Response) => {
    try {
        const result = registerSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({ message: result?.error?.format() })
        }

        const { name, email, password } = result.data;
        const existingUser = await userModel.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "User already Existis" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: hashedPassword });

        const token = generateToken({ _id: user._id, email: user.email });
        return res.status(201).json({ token, user });        
    } catch (error) {
        console.error("Error occured in register controller: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ message: result?.error?.format() })
        }
        const { email, password } = result.data;
        console.log(result.data);
        const user = await userModel.findOne({ email });
        console.log("User:", user);
        if (!user) return res.status(401).json({ message: "User Doesn't Exists" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Password isn't Correct" });

        const token = generateToken({ _id: user._id, email: user.email });
        return res.status(200).json({ token, user });        
    } catch (error) {
        console.error("Error occured in login: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }

}

export const getProfile = async (req: Request, res: Response) => {
    //set at protect middleware
    if (!req.user) return res.status(401).json({ message: "Not Authorized" });
    return res.json(req.user);
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        if(!req.user){
            return res.status(401).json({message: "Not Authorised"});
        }
        console.log(req.body);
        const result = updateProfileSchema.safeParse(req.body);
        console.log(result);
        if(!result.success){
            return res.status(400).json({message: result?.error?.format()});
        } 

        const {_id} = req.user;
        const updatedInfo = result.data;
        const updatedUser = await userModel.findByIdAndUpdate(_id, updatedInfo, {
            new: true
        });

        if(!updatedUser){
            return res.status(404).json({message: "User Not Found"});
        }
        return res.status(200).json({message: "Profile Updated Successfully", user: updatedUser});
    } catch (error) {
        console.error("Error in Updating Profile:", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}