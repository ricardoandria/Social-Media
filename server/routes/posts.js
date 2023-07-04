import express from "express";
import { verifyToken } from "../middleware/auth.js";

import multer from "multer"
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

router.post("/",  upload.single("images"),verifyToken, createPost);
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);
router.patch(":/id/like",verifyToken,likePost);

export default router;