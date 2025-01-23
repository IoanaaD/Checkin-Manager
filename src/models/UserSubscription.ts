import mongoose, {Schema, Document, Types} from "mongoose";

export interface IUserSubscription extends Document {
    userId: Types.ObjectId;
    subscriptionPlanId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    checkInDates: Date[];
}

const UserSubscriptionSchema = new Schema<IUserSubscription>({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true
    },
    subscriptionPlanId: {
        type: Schema.Types.ObjectId,
        ref: "SubscriptionPlan",
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true
    },
    checkInDates: {
        type: [Date],
        default: [],
    }
})

const UserSubscription = mongoose.model<IUserSubscription>("UserSubscription", UserSubscriptionSchema);

export default UserSubscription;