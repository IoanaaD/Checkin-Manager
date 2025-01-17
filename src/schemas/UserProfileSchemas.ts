import { z } from "zod";

export const userRegisterSchema = z.object({
    givenName: z.string(),
    familyName: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
    isAdmin: z.boolean()
})

export const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
})

export const userUpdateSchema = userLoginSchema.partial()