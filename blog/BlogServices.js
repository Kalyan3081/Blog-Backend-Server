// Services that executes the buisseness logic of the application

import Blog from '../model/BlogsModel.js'
import User from '../model/UserModel.js'

export async function createBlogPost({ description, genre, userID }) {
    const blog = new Blog({
        description,
        genre,
        userID
    });
    await blog.save();
}

export async function fetchBlogPosts() {
    const posts = await Blog.find({})
        .select("createdAt userID description _id genre")
        .populate("userID", "name"); // just get name field of user

    const uniqueUserIDs = new Set();
    // extracting unique user IDs from the posts array
    posts.forEach((post) => {
        uniqueUserIDs.add(post.userID)
    })
    const users = await User.find(
        { _id: [...uniqueUserIDs] },
        { _id: true, name: true }
    );

    // {userId:name}
    const userMap = new Map();
    users.forEach((user) => {
        userMap.set(user._id, user.name);
    });

    const postResponse = posts.map((post) => ({
        postId: post._id,
        timestamp: post.createdAt,
        description: post.description,
        genre: post.genre,
        authorName: post.userID.name // userID is now populated object
    }));
    return postResponse;
}