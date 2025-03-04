import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};