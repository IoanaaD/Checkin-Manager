import { Request, Response } from "express";
import UserSubscription from "../models/UserSubscription";

export const getAllUserSubscriptions = async(req: Request, res: Response) => {
    try{
        const userSubscriptions = await UserSubscription.find()
        .populate("userId")
        .populate("subscriptionPlanId")
        res.status(200).json(userSubscriptions)
        return
    }catch(error:any) {
        res.status(500).json({
            message: "Error reading all user subscriptions",
            error: error.message
        })
    }
}

export const getOneUserSubscription = async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const userSubscription = await UserSubscription.findById(id)
        .populate("userId")
        .populate("subscriptionPlanId")
        res.status(200).json(userSubscription)
        return
    }catch(error:any) {
        res.status(500).json({
            message: "Error reading one user subscription",
            error: error.message
        })
    }
}

export const createUserSubscription = async(req: Request, res: Response) => {
    try {
        const newSubscription = new UserSubscription({...req.body})
        const createdSubscription = await newSubscription.save()
        res.status(201).json(createdSubscription)
    } catch (error:any) {
        res.status(500).json({
            message: "Error creating user subscription",
            error: error.message
        })
    }
}

export const deleteOneUserSubcription = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await UserSubscription.deleteOne({_id:id})
        res.status(200).json({message: "User Subscription deleted!"})
    } catch (error: any) {
        res.status(500).json({
            message: "Error deleting one user subscription by id",
            error: error.message
        })
        return
    }
}

export const editUserSubscription = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        await UserSubscription.updateOne({_id:id}, req.body)
        res.status(200).json({message: "User subscription updated!"})
    } catch (error: any) {
        res.status(500).json({
            message: "Error updating one user subscription by id",
            error: error.message
        })
        return
    }
}