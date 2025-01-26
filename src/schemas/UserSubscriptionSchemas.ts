import { z } from "zod";

export const userSubscriptionSchema = z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), 
    subscriptionPlanId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    startDate: z.string().refine((date: string) => !isNaN(Date.parse(date)), "Invalid date format"), 
    endDate: z.string().refine((date: string) => !isNaN(Date.parse(date)), "Invalid date format"), 
    checkInDates: z.array(
      z.string().refine((date: string) => !isNaN(Date.parse(date)), "Invalid date format") 
    ).optional(),
  });

export const updateUserSubscriptionSchema = userSubscriptionSchema.partial()