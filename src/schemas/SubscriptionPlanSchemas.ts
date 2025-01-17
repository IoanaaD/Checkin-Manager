import { z } from "zod";

export const createPlanSchema = z.object({
    type: z.string().min(1, "Type is required"),
    description: z.string().min(1, "Description is required"),
    locations: z.array(z.string()),
    price: z.number().min(0),
    duration: z.number().min(1)
})

export const userPlanSchema = createPlanSchema.partial()