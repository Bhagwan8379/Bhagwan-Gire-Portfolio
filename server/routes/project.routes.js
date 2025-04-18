const router = require("express").Router()
const projectController = require("../controllers/projects.controller")

router
    .post("/delete-project/:id", projectController.deleteProjects)
    .get("/get-all-projects", projectController.GetAllProjects)
    .post("/add-projects", projectController.addProjects)


module.exports = router