import express from "express";
import { authenticateMiddleware } from "../auth/Jwt.js";
import { addCommentController, getAllCommentsController } from "../comment/CommentController.js";

const router = express.Router();

// using the middleware to authenticate the user
router.use(authenticateMiddleware);

// POST: Add a new comment to a given post { postId, message }
router.post('/add', addCommentController);

// GET: Fetch all comments for a given post (e.g., via query param like ?postId=123)
router.get('/all', getAllCommentsController);

export default router;
