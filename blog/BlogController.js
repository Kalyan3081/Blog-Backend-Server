// Controller does the filteration of the data

import { createBlogPost, fetchBlogPosts } from "./BlogServices.js"

export const BlogController = async function (req, res) {
    const { description, genre = "Politics" } = req.body
    if (!description || description.length > 500) {
        return res.status(400).json({ message: "Invalid description" })
    }
    await createBlogPost({ userID: req.userId, description, genre });
    res.status(201).json({ message: "Blog post created successfully" })
}


export async function fetchAllBlogPostsController(req, res) {
    console.log("Incoming genre filter:", req.query); // log this

    const { genre } = req.query;
    try {
        const serverRes = {
            data: await fetchBlogPosts(genre),
            message: "Blog posts fetched successfully"
        };
        res.status(200).json(serverRes);
    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

