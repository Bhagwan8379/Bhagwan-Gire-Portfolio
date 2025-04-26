const router = require("express").Router()
const educationController = require("../controllers/education.controller")

router
    .delete("/delete-education/:id", educationController.DeleteEducation)
    .get("/get-all-education", educationController.GetAllEducation)
    .post("/add-education", educationController.AddEducation)


module.exports = router



