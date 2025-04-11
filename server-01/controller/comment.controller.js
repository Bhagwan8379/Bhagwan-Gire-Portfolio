const expressAsyncHandler = require("express-async-handler")
const { CheckEmpty } = require("../utils/checkEmpty");
const { Comment } = require("../models/Comment");

exports.AddComment = expressAsyncHandler(async (req, res) => {
    const { projectId, email, commentText } = req.body;
    const emailPart = email.substring(0, 4).toLowerCase()
    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    const userId = `${emailPart}${randomDigits}`
    const { isError, error } = CheckEmpty({ projectId, userId, email, commentText })
    if (isError) {
        return res.status(400).json({ message: "All fields are required.", error });
    }
    try {
        const comment = await Comment.create({
            projectId,
            userId,
            email,
            commentText,
        });
        res.status(201).json({
            message: "Comment added successfully.",
            data: comment,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to add comment.", error });
    }
})
exports.GetCommentsByProject = expressAsyncHandler(async (req, res) => {
    const { projectId } = req.params;
    try {
        const comments = await Comment.find({ projectId })
            .populate("userId", "email")
            .sort({ createdAt: -1 })
        res.status(200).json({
            message: "Comments retrieved successfully.",
            data: comments,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve comments.", error });
    }
})
exports.GetComments = expressAsyncHandler(async (req, res) => {
    const comments = await Comment.find({ isDelete: false })
        .populate("userId")
        .sort({ createdAt: -1 })
    res.status(200).json({ message: "Comments retrieved successfully.", data: comments, })
})
exports.UpdateCommentStatus = expressAsyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { status } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(
            commentId,
            { status },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        res.status(200).json({
            message: "Comment status updated successfully.",
            data: comment,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update comment status.", error });
    }
})
exports.DeleteComment = expressAsyncHandler(async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByIdAndUpdate(commentId, { isDelete: true });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        res.status(200).json({
            message: "Comment deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete comment.", error });
    }
})
exports.RestoreComment = expressAsyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndUpdate(commentId, { isDelete: false })
    if (!comment) {
        return res.status(404).json({ message: "Comment not found." });
    }
    res.status(200).json({
        message: "Comment Restored successfully.",
    })
})
exports.ReplyComment = expressAsyncHandler(async (req, res) => {
    const { commentId, message } = req.body
    const { isError, error } = CheckEmpty({ commentId, message })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required.", error })
    }
    const result = await Comment.findOne({ _id: commentId })
    if (!result) {
        return res.status(400).json({ message: "Comment Not Found." })
    }
    const replies = [...result.replies]
    replies.push({ message })
    await Comment.findByIdAndUpdate(result._id, { replies })
    return res.json({ message: "Comment Reply Send Success" })
})
exports.LikeComment = expressAsyncHandler(async (req, res) => {
    const { like } = req.body
    const { commentId } = req.params
    const result = await Comment.findOne({ _id: commentId })
    if (!result) {
        return res.status(400).json({ message: "Comment Not Found." })
    }
    let likes = result.likes
    let dislikes = result.dislikes
    if (like) {
        likes = likes + 1
    } else {
        dislikes = dislikes + 1
    }
    await Comment.findByIdAndUpdate(result._id, { likes, dislikes })
    return res.json({ message: `${like ? "Comment Liked" : "Comment Disliked."}` })
})