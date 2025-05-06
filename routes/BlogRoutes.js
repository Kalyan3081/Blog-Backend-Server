// Router is that it listines to the end points 

import { Router } from "express";
import { authenticateMiddleware } from "../auth/Jwt.js";
import { BlogController, fetchAllBlogPostsController } from "../blog/BlogController.js";

const router = Router();
router.get('/all', fetchAllBlogPostsController)

router.use(authenticateMiddleware)
router.post('/create', BlogController)

export default router
