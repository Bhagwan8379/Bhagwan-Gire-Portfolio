const expressAsyncHandler = require('express-async-handler')
const { CheckEmpty } = require('../utils/checkEmpty')
const Admin = require('../models/Admin')
const validator = require('validator')

exports.CreateProfile = expressAsyncHandler(async (req, res) => {
    const { age, mobile, Address, pincode, GithubProfile, LinkedInProfile, FaceBookProfile, InstagramProfile, About, AboutHeading, Frontend, Backend, MobileApp, languages } = req.body
    const { isError, error } = CheckEmpty({ age, mobile, Address, pincode, GithubProfile, LinkedInProfile, FaceBookProfile, InstagramProfile, About, AboutHeading, languages })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error: error })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "Provide a Valid Mobile" })
    }
    const result = await Admin.findByIdAndUpdate(req.user, {
        age, mobile, Address, pincode, GithubProfile, LinkedInProfile, FaceBookProfile, InstagramProfile, About, AboutHeading, languages,
        skills: {
            Frontend: Frontend,
            Backend: Backend,
            MobileApp: MobileApp
        }
    })
    res.json({ message: "Admin Profile Create Success", data: result })
})
exports.UpdateProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    await Admin.findByIdAndUpdate(id, req.body)
    res.json({ message: "Admin Profile Updated Successed." })
})