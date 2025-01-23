import express from 'express'
import { createUserSubscription, deleteOneUserSubcription, editUserSubscription, getAllUserSubscriptions, getOneUserSubscription } from '../controllers/userSubscriptionController'
import { getOneSubcriptionPlan } from '../controllers/subscriptionPlanController'
import { validateData } from '../middleware/validationMiddleware'
import { updateUserSubscriptionSchema, userSubscriptionSchema } from '../schemas/UserSubscriptionSchemas'

const userSubscriptionRouter = express.Router()

userSubscriptionRouter.get("/api/user-subscription", getAllUserSubscriptions)
userSubscriptionRouter.get("/api/user-subscription/:id", getOneUserSubscription)
userSubscriptionRouter.post("/api/user-subscription", validateData(userSubscriptionSchema), createUserSubscription)
userSubscriptionRouter.delete("/api/user-subscription/:id", deleteOneUserSubcription)
userSubscriptionRouter.put("/api/user-subscription/:id",validateData(updateUserSubscriptionSchema), editUserSubscription)


export default userSubscriptionRouter