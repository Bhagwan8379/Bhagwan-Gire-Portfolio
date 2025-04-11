const asyncHandler = require("express-async-handler");
const { Feedback } = require("../models/FeedBack");
const { CheckEmpty } = require("../utils/checkEmpty");


exports.createFeedback = asyncHandler(async (req, res) => {
    const { name, email, message, rating } = req.body;


    const { isError, error } = CheckEmpty({ name, email, message, rating })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error: error })
    }
    await Feedback.create({ name, email, message, rating });
    res.status(200).json({ message: "Feedback Create Success" });
})
exports.getAllFeedback = asyncHandler(async (req, res) => {
    const result = await Feedback.find({ isDelete: false });
    res.status(200).json({ message: "Feedback Fetch Success", result });
})
exports.getFeedbackById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await Feedback.findOne({ _id: id, isDelete: false });
    if (!result) {
        return res.status(400).json({ message: "Feedback not found or has been deleted" });
    }
    res.status(200).json({ message: "Get Feedback By Id Success", result });
})
exports.updateFeedBack = asyncHandler(async (req, res) => {
    const { name, email, message, rating } = req.body;

    const { isError, error } = CheckEmpty({ name, email, message, rating })

    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error: error })
    }
    const { id } = req.params
    const result = await Feedback.findById(id);

    if (!result) {
        res.status(400).json({ message: "FeedBack Not found" });
    }
    await Feedback.findByIdAndUpdate(id, { name, email, message, rating })
    res.status(200).json({ message: "FeedBack Update Success" });
})
exports.deleteFeedback = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Feedback.findById(id);
    if (!result) {
        res.status(400).json({ message: "FeedBack Not found" });
    }
    await Feedback.findByIdAndUpdate(id, { isDelete: true })

    res.status(200).json({ message: "Feedback deleted successfully" });
})
