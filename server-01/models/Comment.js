const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, },
        userId: { type: String },
        email: { type: String, required: true, },
        commentText: { type: String, required: true, },
        replies: [
            {
                message: { type: String },
            },
        ],
        status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending", },
        likes: { type: Number, default: 0, },
        dislikes: { type: Number, default: 0, },
        isDelete: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    })

exports.Comment = mongoose.model("Comment", commentSchema);
