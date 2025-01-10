import express from 'express'
import UserProfile from '../models/UserProfile'

const router = express.Router()

//get all users
router.get("/api/user-profile", async (req,res) => {
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
})

//get one user
router.get("/api/user-profile/:id", async (req, res) => {
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
    
})

//create user
router.post("/api/user-profile", async(req, res) => {
    try{
        const newUser = new UserProfile({...req.body})
        console.log("NEW USER", req.body)
        const createdUser = await newUser.save()
        res.status(201).json(createdUser);
    } catch(error:any) {
        res.status(500).json({
            message: "Error creating user profile",
            error: error.message
        })
    }
   
})

//update one user
router.put("/api/user-profile/:id", async(req, res) => {
    try {
        const {id} = req.params;
        await UserProfile.updateOne({_id:id}, req.body)
        const updatedUser = await UserProfile.findById(id);
        res.status(200).json(updatedUser)
    } catch (error:any) {
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        })
    }
})

//delete one user 
router.delete("/api/user-profile/:id", async(req, res) => {
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

})

export default router