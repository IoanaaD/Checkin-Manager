import { z } from "zod";

export const userProfileSchema = z.object({
    givenName: z.string(),
    familyName: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
    isAdmin: z.boolean()
})