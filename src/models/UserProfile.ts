import mongoose, {Schema, Document} from "mongoose";

export interface IUserProfile extends Document {
    givenName: string;
    familyName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const userProfileSchema = new Schema<IUserProfile>({
    givenName: {type: String, required: true},
    familyName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
})

const UserProfile = mongoose.model<IUserProfile>('UserProfile', userProfileSchema)

export default UserProfile