import { Router, Request, Response } from "express";
import { User, IUser } from "../models/User";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ id: parseInt(req.params.id) });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

export default router;
