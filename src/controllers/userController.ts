
import { Request, Response } from 'express'
import UserProfile, { IUserProfile } from '../models/UserProfile'
import encryptPassword from '../utils/hashing'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

//login user
export const loginUser = async(req:Request, res: Response): Promise<void> => {
    try {
        const user = req.body;
        const { email, password } = user
        const existingUser = await UserProfile.findOne({email: email })
        if(!existingUser) {
             res.status(401).json({
                success: false,
                message: "User not found!"
            })
            return;
        }

        const isPasswordMatching = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordMatching) {
             res.status(401).json({
                success: false,
                message: "Incorrect password!"
            })
            return
        }

        const secret = process.env.JWT_SECRET!
        const token = jwt.sign({id:existingUser._id}, secret, {expiresIn: "1d"})

        res.status(200).json({
            token,
            userInfo: {
                email: existingUser.email,
                id: existingUser._id
            }
        })
        return
    } catch(error: any) {
         res.status(500).json({ message: 'Error logging in', error: error.message });
         return
    }
}

//get all users
export const getAllUsers = async (req: Request,res: Response) => {
    try {
        const users = await UserProfile.find()
        res.status(200).json(users)
        return;
    } catch (error: any) {
        res.status(500).json({
            message: "Error reading all users",
            error: error.message
        })
    }
}

//get one user
export const getOneUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await UserProfile.findById(id)
        res.status(200).json(user)
        return
    } catch (error: any) {
        res.status(500).json({
            message: "Error reading one user by id",
            error: error.message
        })
    }
}

//create user
export const registerUSer = async(req: Request, res: Response) => {
    try{
        const newUser = new UserProfile({
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            email: req.body.email,
            password: await encryptPassword(req.body.password),
            isAdmin: req.body.isAdmin
        })       
        const createdUser = await newUser.save()
        res.status(201).json(createdUser);
    } catch(error:any) {
        res.status(500).json({
            message: "Error creating user profile",
            error: error.message
        })
    }  
}

//update one user
export const editUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const decodedInfo = (req as any).user
        if(decodedInfo.id!=id) {
            res.status(500).json({
                message: "Not allowed to edit this user"
            })
        } else {
            if(req.body.password) {
                req.body.password = await encryptPassword(req.body.password)
            }
            await UserProfile.updateOne({_id:id}, req.body)
            const updatedUser = await UserProfile.findById(id);
            res.status(200).json(updatedUser)
        }
    } catch (error:any) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        })
    }
}

//delete one user 
export const deleteUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await UserProfile.deleteOne({_id:id})
        res.status(200).json({message: "User deleted!"})
    } catch (error:any) {
        res.status(500).json({
            message: "Error deleting user profile",
            error: error.message
        })
    }
}