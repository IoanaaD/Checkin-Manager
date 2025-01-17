import express from 'express'
import { validateData } from '../middleware/validationMiddleware'
import { auth } from '../middleware/authMiddleware'
import { userRegisterSchema, userLoginSchema, userUpdateSchema } from '../schemas/UserProfileSchemas'

const userRouter = express.Router()
import { getAllUsers, getOneUser, registerUSer, editUser, deleteUser, loginUser } from '../controllers/userController'

userRouter.get("/api/user-profile", getAllUsers)
userRouter.get("/api/user-profile/:id", getOneUser)
userRouter.post("/api/user-profile", validateData(userRegisterSchema), registerUSer)
userRouter.post("/api/user-profile/login",validateData(userLoginSchema), loginUser)
userRouter.put("/api/user-profile/:id",validateData(userUpdateSchema), auth, editUser)
userRouter.delete("/api/user-profile/:id", deleteUser)

export default userRouter