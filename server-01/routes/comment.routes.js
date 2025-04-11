const express = require("express");
const CommentController = require("../controller/comment.controller");
const router = express.Router();

router
    .post("/add-comments", CommentController.AddComment)
    .get("/get-comment/:projectId", CommentController.GetCommentsByProject)
    .get("/fetch-comments", CommentController.GetComments)
    .put("/update-comments/:commentId", CommentController.UpdateCommentStatus)
    .put("/comments-reply", CommentController.ReplyComment)
    .delete("/delete-comments/:commentId", CommentController.DeleteComment)
    .put("/restore-comments/:commentId", CommentController.RestoreComment)
    .put("/like-dislike/:commentId", CommentController.LikeComment)

module.exports = router
