import { addComment, fetchAllCommentsByPostId } from "./CommentService.js"

export async function addCommentController(req, res) {
    // endpoint: /comment/add-comment?postId=741258 (query params)

    const { postId } = req.query // or req.params.postId, destructing the query params from url.
    const { comment } = req.body // getting the comment from the request body.
    if (!postId) {
        return res.status(400).json({ message: "Invalied Post" })
    }
    if (!comment?.trim()) {
        return res.status(400).json({ message: "Please enter Comment" })
    }
    const userId = req.userId
    const statusCode = await addComment(comment.trim(), userId, postId)
    res.status(statusCode).json({ message: statusCode === 201 ? "Comment Added successfully" : statusCode === 400 ? "Invailed Post" : "Internal server error" })
}

export async function getAllCommentsController(req, res) {
    const { postId } = req.query
    if (!postId) {
        return res.status(400).json({ message: "Invalied Post" })
    }
    const response = await fetchAllCommentsByPostId(postId)
    res.status(200).json(response)
}