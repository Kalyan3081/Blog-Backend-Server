import Blog from '../model/BlogsModel.js';
import User from '../model/UserModel.js';

/**
 * Add a comment to a blog post
 * @param {string} comment 
 * @param {string} userId 
 * @param {string} postId 
 */
import mongoose from 'mongoose';

export async function addComment(comment, userId, postId) {
    try {
        const commentInstance = {
            text: comment,
            userId: new mongoose.Types.ObjectId(userId), // ✅ cast to ObjectId
            createdAt: Date.now()
        };

        const blog = await Blog.findOneAndUpdate(
            { _id: postId },
            { $push: { comments: commentInstance } },
            { new: true }
        );

        if (!blog) {
            console.log(`Failed to add comment to blog with id ${postId}`);
            return 400;
        }

        return 201;
    } catch (err) {
        console.error("Failed to add comment due to server error:", err);
        return 500;
    }
}


export async function fetchAllCommentsByPostId(postId) {
    try {
        const blog = await Blog.findById(postId, { comments: 1 });
        console.log("Comments found in blog:", blog.comments);

        if (!blog || !blog.comments) return [];

        const comments = blog.comments;

        const userIdnameMap = new Map();

        // Safely map userIds from comments
        comments.forEach((comment) => {
            if (comment.userId) {
                userIdnameMap.set(comment.userId.toString(), "");
            }
        });

        const users = await User.find(
            { _id: { $in: [...userIdnameMap.keys()] } },
            { _id: 1, name: 1 }
        );

        users.forEach((user) => {
            userIdnameMap.set(user._id.toString(), user.name);
        });

        const commentsResponse = comments.map(comment => ({
            commentText: comment.text,
            createdAt: comment.createdAt,
            userName: comment.userId
                ? userIdnameMap.get(comment.userId.toString()) ?? "Anonymous"
                : "Anonymous"
        }));

        return commentsResponse;
    } catch (err) {
        console.error("Error fetching comments:", err);
        return [];
    }
}
