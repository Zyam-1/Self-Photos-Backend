import { z } from "zod";

// for register route validation
export const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
});

// for login validation
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

