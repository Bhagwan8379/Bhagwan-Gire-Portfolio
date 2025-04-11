const router = require('express').Router()
const AdminController = require('../controller/admin.controller')
const { adminProtected } = require('../middleware/Protected')


router
    .post('/create-profile', adminProtected, AdminController.CreateProfile)

module.exports = router