import mongoose from "mongoose";

export interface IComment {
    author: string;
    authorProfilePicture: string;
    message: string;
    createdAt: Date;
}

export interface IPost extends mongoose.Document {
    author: string;
    authorProfilePicture: string;
    createdAt: Date;
    fishType: string;
    location: string;
    fishWeight: number;
    message: string;
    image: string;
    likes: number;
    likedBy: string[];
    comments: IComment[];
}

const postSchema = new mongoose.Schema<IPost>({
    author: {type: String, required: true},
    authorProfilePicture: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    fishType: {type: String, required: true},
    location: {type: String, required: true},
    fishWeight: {type: Number, required: true},
    message: {type: String, required: true},
    image: {type: String, required: true},
    likes: {type: Number, default: 0},
    likedBy: {type: [String], default: []},
    comments: {type: [{author: String, authorProfilePicture: String, message: String, createdAt: Date}], default: []},
});

export const Post = mongoose.model<IPost>("Post", postSchema);
