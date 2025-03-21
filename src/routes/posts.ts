import { Router, Request, Response } from "express";
import { Post, IPost, IComment } from "../models/Post";

const router = Router();

// Get all posts by location
router.get("/location/:location", async (req: Request<{ location: string }>, res: Response) => {
    try {
        const { location } = req.params;
        const posts: IPost[] = await Post.find({ location });

        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this location" });
        }

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get a post by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
    try {
        const post: IPost | null = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Like a post
router.put("/:id/like", async (req: Request<{ id: string }, object, { userId: string }>, res: Response) => {
    try {
        const { userId } = req.body;
        const post: IPost | null = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (!post.likedBy.includes(userId)) {
            post.likedBy.push(userId);
            post.likes += 1;
        }
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Add a comment
router.put("/:id/comment", async (req: Request<{ id: string }, object, IComment>, res: Response) => {
    try {
        const { author, authorProfilePicture, message } = req.body;
        const post: IPost | null = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const newComment: IComment = {
            author,
            authorProfilePicture,
            message,
            createdAt: new Date(),
        };
        post.comments.push(newComment);
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export default router;
