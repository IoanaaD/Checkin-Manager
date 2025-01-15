import express from 'express'
import { validateData } from '../middleware/validationMiddleware'
import { userProfileSchema } from '../schemas/UserProfileSchemas'

const userRouter = express.Router()
import { getAllUsers, getOneUser, registerUSer, editUser, deleteUser, loginUser } from '../controllers/userController'

userRouter.get("/api/user-profile", getAllUsers)
userRouter.get("/api/user-profile/:id", getOneUser)
userRouter.post("/api/user-profile", validateData(userProfileSchema), registerUSer)
userRouter.post("/api/user-profile/login", loginUser)
userRouter.put("/api/user-profile/:id", editUser)
userRouter.delete("/api/user-profile/:id", deleteUser)

export default userRouter