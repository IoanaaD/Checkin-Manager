import mongoose, {Schema, Document} from "mongoose";

export interface ISubscriptionPlan extends Document {
    type: string;
    description: string;
    locations: string[];
    price: number;
    duration: number; //days
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>({
    type: {type: String, required: true},
    description: {type: String, required: true},
    locations: {type: [String], default:[]},
    price: {type: Number, required: true},
    duration: {type: Number, required: true}
})

const SubscriptionPlan = mongoose.model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema)

export default SubscriptionPlan