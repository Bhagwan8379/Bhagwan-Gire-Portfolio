const FeedbackController = require("../controller/feedback.controller");

const router = require("express").Router();

router
    .post("/create", FeedbackController.createFeedback)
    .get("/get-all-feedback", FeedbackController.getAllFeedback)
    .get("/get-feedback/:id", FeedbackController.getFeedbackById)
    .put("/update-feedback/:id", FeedbackController.updateFeedBack)
    .delete("/delete-feedback/:id", FeedbackController.deleteFeedback);

module.exports = router;
