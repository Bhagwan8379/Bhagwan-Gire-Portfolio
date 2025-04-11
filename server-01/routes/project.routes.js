const router = require("express").Router();
const ProjectController = require("../controller/project.controller");


router
    .post("/create", ProjectController.addProject) // Create a new project
    .get("/get-all-projects", ProjectController.getAllProjects) // Get all projects
    .get("/get-project/:id", ProjectController.getProjectById) // Get all projects
    .put("/update-project/:id", ProjectController.updateProject) // Update project by ID
    .put("/delete-project/:id", ProjectController.deleteProject); // Delete project by ID

module.exports = router;
