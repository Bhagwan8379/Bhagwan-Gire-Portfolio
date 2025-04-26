const router = require("express").Router()
const ContactController = require("../controllers/contact.controller")

router
    .get("/get-all-messages", ContactController.getAllMessage)
    .delete("/delete-messages/:id", ContactController.deleteMessage)
    .post("/send-message", ContactController.sendMessage)


module.exports = router



