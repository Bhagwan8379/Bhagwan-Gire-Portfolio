const expressAsyncHandler = require("express-async-handler")
const { CheckEmpty } = require("../utils/CheckEmpty")
const cloudinary = require("../utils/cloudinary.config")
const Projects = require("../model/Projects")
const { upload } = require("../utils/upload")

exports.addProjects = expressAsyncHandler(async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                return res.status(400).json({ message: "Multer Error", error: err })
            }
            const { technology, desc, name, onlineLink } = req.body
            const { isError, error } = CheckEmpty({ name, desc, technology, onlineLink })
            if (isError) {
                return res.status(400).json({ message: "All Fields Required", error })
            }
            let hero = []
            if (req.file) {
                const { secure_url } = await cloudinary.uploader.upload(req.file.path)
                hero = secure_url
            }
            await Projects.create({ name, desc, technology: technology.split(","), hero, onlineLink })
            res.status(200).json({ message: "Project Add Success" })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" })
    }
})

exports.deleteProjects = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    await Projects.findByIdAndDelete(id)
    res.status(200).json({ message: "Project Delete Success" })
})
exports.GetAllProjects = expressAsyncHandler(async (req, res) => {
    const result = await Projects.find()
    res.status(200).json({ message: "Project Fetch Success", result })
})