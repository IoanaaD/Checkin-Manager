import express  from "express";
import { createSubscriptionPlan, deleteOneSubcriptionPlan, editSubscriptionPlan, getAllSubcriptionPlans, getOneSubcriptionPlan } from "../controllers/subscriptionPlanController";
import { validateData } from "../middleware/validationMiddleware";
import { createPlanSchema, userPlanSchema } from "../schemas/SubscriptionPlanSchemas";

const subscriptionPlanRouter = express.Router()

subscriptionPlanRouter.post("/api/subscription-plan", validateData(createPlanSchema), createSubscriptionPlan)
subscriptionPlanRouter.get("/api/subscription-plan", getAllSubcriptionPlans)
subscriptionPlanRouter.get("/api/subscription-plan/:id", getOneSubcriptionPlan)
subscriptionPlanRouter.delete("/api/subscription-plan/:id", deleteOneSubcriptionPlan)
subscriptionPlanRouter.put("/api/subscription-plan/:id", validateData(userPlanSchema), editSubscriptionPlan)

export default subscriptionPlanRouter