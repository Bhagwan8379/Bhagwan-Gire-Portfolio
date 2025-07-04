const expressAsyncHandler = require("express-async-handler")
const Education = require("../model/Education")
const { checkEmpty } = require("../utils/checkEmpty")
const { IO } = require("../socket/socket")

exports.GetAllEducation = expressAsyncHandler(async (req, res) => {
    const result = await Education.find()
    res.status(200).json({ message: "Education Fetch Success", result })
})
exports.AddEducation = expressAsyncHandler(async (req, res) => {
    const { degree, stream, year, institute, college } = req.body
    const { isError, error } = checkEmpty({ degree, stream, year, institute })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    await Education.create({ degree, stream, institute, year, college })
    res.status(200).json({ message: "Education Add Success" })
})
exports.DeleteEducation = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    await Education.findByIdAndDelete(id)
    res.status(200).json({ message: "Education Delete Success" })
})