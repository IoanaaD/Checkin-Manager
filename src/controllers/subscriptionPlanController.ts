import { Request, Response } from "express"
import SubscriptionPlan from "../models/SubscriptionPlan"

//create a subccriptionPlan, only admins
export const createSubscriptionPlan = async(req: Request, res: Response) => {
    try {
        const newSubscriptionPlan = new SubscriptionPlan({...req.body})
        const createdSubscriptionPlan = await newSubscriptionPlan.save()
        res.status(201).json({
            message: "Subscription plan created successfully!",
            subscriptionPlan: createdSubscriptionPlan
        })
        return
    } catch (error: any) {
        res.status(500).json({
            message: "Error creating subscription plan",
            error: error.message
        })
        return
    }
}

export const getAllSubcriptionPlans = async(req: Request, res: Response) => {
    try {
        const subscriptions = await SubscriptionPlan.find()
        res.status(200).json(subscriptions)
    } catch (error: any) {
        res.status(500).json({
            message: "Error reading all subscription plans",
            error: error.message
        })
        return
    }
}

export const getOneSubcriptionPlan = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const subscription = await SubscriptionPlan.findById(id)
        res.status(200).json(subscription)
    } catch (error: any) {
        res.status(500).json({
            message: "Error reading one subscription plan by id",
            error: error.message
        })
        return
    }
}

export const deleteOneSubcriptionPlan = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await SubscriptionPlan.deleteOne({_id:id})
        res.status(200).json({message: "Subscription deleted!"})
    } catch (error: any) {
        res.status(500).json({
            message: "Error deleting one subscription plan by id",
            error: error.message
        })
        return
    }
}

export const editSubscriptionPlan = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        await SubscriptionPlan.updateOne({_id:id}, req.body)
        res.status(200).json({message: "Subscription plan updated!"})
    } catch (error: any) {
        res.status(500).json({
            message: "Error updating one subscription plan by id",
            error: error.message
        })
        return
    }
}