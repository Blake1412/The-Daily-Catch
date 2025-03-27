import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
