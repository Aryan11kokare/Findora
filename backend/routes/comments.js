import { Router } from "express";
import { authMiddelware } from "../middelware.js";
import { createCommnet, deleteComment } from "../controllers/comment.js";

const router = Router();

router.post("/comment", authMiddelware, createCommnet);
router.delete("/comment", authMiddelware, deleteComment);

export default router;
