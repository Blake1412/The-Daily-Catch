import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
}

const userSchema = new mongoose.Schema<IUser>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);
