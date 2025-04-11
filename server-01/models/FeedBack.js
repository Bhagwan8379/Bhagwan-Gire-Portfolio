const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
    isDelete: { type: Boolean, default: false }
},
    {
        timestamps: true
    })

exports.Feedback = mongoose.model("Feedback", feedbackSchema);