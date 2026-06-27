const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const AuthController = require("../controllers/auth.controller");

// Configure multer for file uploads
const upload = multer({ dest: os.tmpdir() });

router
    .post("/register-admin", AuthController.RegisterAdmin)
    .post("/login-admin", AuthController.LoginAdmin)
    .post("/voice-login-admin", upload.single('audio'), AuthController.VoiceLoginAdmin)
    .post("/logout-admin", AuthController.logoutAdmin);


module.exports = router;
