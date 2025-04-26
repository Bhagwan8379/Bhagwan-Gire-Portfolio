const router = require("express").Router()
const AuthController = require("../controllers/auth.controller")

router
    .post("/register-admin", AuthController.RegisterAdmin)
    .post("/login-admin", AuthController.LoginAdmin)
    .post("/logout-admin", AuthController.logoutAdmin)


module.exports = router



