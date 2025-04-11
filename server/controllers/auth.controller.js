const expressAsyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const Auth = require("../model/Auth")
const { CheckEmpty } = require("../utils/CheckEmpty")


// exports.RegisterAdmin = expressAsyncHandler(async (req, res) => {
//     const { name, email, password, mobile } = req.body
//     const { isError, error } = CheckEmpty({ name, email, password })
//     if (isError) {
//         return res.status(400).json({ message: "All Fields Required", error })
//     }
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({ message: "Enter a Valid Email" })
//     }
//     if (!validator.isStrongPassword(password)) {
//         return res.status(400).json({ message: "Provide Strong Password" })
//     }
//     if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
//         return res.status(400).json({ message: "Invalid Mobile Number" })
//     }
//     const isFound = await Auth.findOne({ $or: [{ email }, { mobile }] })
//     if (isFound) {
//         return res.status(400).json({ message: "Admin Already Registered." })
//     }
//     const hash = await bcrypt.hash(password, 10)
//     const result = await Auth.create({ name, email, password: hash, mobile })
//     res.status(200).json({ message: "Register Admin Success", data: result })
// })

exports.LoginAdmin = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    const { isError, error } = CheckEmpty({ username, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" })
    }
    const isFound = await Auth.findOne({ $or: [{ email: username }, { mobile: username }] })
    if (!isFound) {
        return res.status(400).json({ message: "Admin Not Found", error: "Admin Not Registered" })
    }
    const verify = await bcrypt.compare(password, isFound.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Not Matched.", error: "Your Password Do Not Matched" })
    }
    const token = jwt.sign({ userId: isFound._id }, process.env.JWT_KEY, { expiresIn: "1d" })
    res.cookie("Admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    })
    res.status(200).json({
        message: "Admin Login Success", data: {
            _id: isFound._id,
            name: isFound.name,
            email: isFound.email,
        }
    })
})

exports.logoutAdmin = expressAsyncHandler(async (req, res) => {
    res.clearCookie("Admin")
    res.json({ message: "Logout Success" })
})