// import { z } from "zod";
const z = require("zod");

// for register route validation
export const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
}).strict();

// for login validation
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
}).strict();

export const updateProfileSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().optional(),
}).strict();

