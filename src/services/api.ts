import axios from "axios";

const API_URL = "http://localhost:3000";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture: string;
}

export interface Comment {
    author: string;
    authorProfilePicture: string;
    message: string;
    createdAt: string;
}

export interface Post {
    _id: string;
    author: string;
    authorProfilePicture: string;
    createdAt: string;
    fishType: string;
    location: string;
    fishWeight: number;
    message: string;
    image: string;
    likes: number;
    likedBy: string[];
    comments: Comment[];
}

export const getUsers = async (): Promise<User[]> => {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
};

export const getUser = async (id: number): Promise<User> => {
    const res = await axios.get(`${API_URL}/users/${id}`);
    return res.data;
};

export const getPosts = async (): Promise<Post[]> => {
    const res = await axios.get(`${API_URL}/posts`);
    return res.data;
};

export const getPost = async (id: string): Promise<Post> => {
    const res = await axios.get(`${API_URL}/posts/${id}`);
    return res.data;
};

export const likePost = async (id: string, userId: string) => {
    const res = await axios.put(`${API_URL}/posts/${id}/like`, {userId});
    return res.data;
};

export const commentOnPost = async (
    id: string,
    commentData: { author: string; authorProfilePicture: string; message: string }
) => {
    const res = await axios.put(`${API_URL}/posts/${id}/comment`, commentData);
    return res.data;
};