const expressAsyncHandler = require("express-async-handler")
const validator = require("validator")
const { checkEmpty } = require("../utils/checkEmpty")
const Contact = require("../model/Contact")
const sendEmail = require("../utils/Email")
const Admin = require("../model/Admin")

exports.ContactToAdmin = expressAsyncHandler(async (req, res) => {
    const { name, message, email, subject } = req.body
    const { isError, error } = checkEmpty({ name, email, message, subject })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Enter a Valid Email", error: "Enter a Valid Email" })
    }
    await sendEmail({
        to: email, subject: `Thank you for your message!`,
        message: `<html>
                <body>
                    <h2>Thank you for reaching out!</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for getting in touch with me via my portfolio. I've received your message and will get back to you as soon as possible.</p>
                    <p><strong>Your Subject:</strong></p>
                    <p>${subject}</p>
                    <p><strong>Your Message:</strong></p>
                    <p>${message}</p>
                    <p>If you have any urgent inquiries, feel free to contact me directly at <a href=${process.env.FROM_EMAIL}>${process.env.FROM_EMAIL}</a>.</p>
                    <p>Looking forward to connecting with you!</p>
                    <br />
                    <p>Best regards,</p>
                    <p>Someshwar Holkar</p>
                    <p>https://github.com/holkar-somesh01/</p>
                </body>
             </html>`
    })
    await Contact.create({ name, message, email, subject })
    res.json({ message: "Your Message SuccessFully Send." })
})
exports.getContact = expressAsyncHandler(async (req, res) => {
    const result = await Contact.find()
    res.json({ message: "Contact Fecth Success", result })
})
exports.SendEmailReply = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { message } = req.body
    const isFound = await Contact.findById({ _id: id })
    if (!isFound) {
        return res.status(400).json({ message: "User Not Found" })
    }
    const isFoundAdmin = await Admin.findOne()
    if (!isFound) {
        return res.status(400), json({ message: "User Not Found" })
    }
    await sendEmail({
        to: isFound.email, subject: `Thank You for Reaching Out!`,
        message: `<html>
                <body>
                    <p>Hi ${isFound.name},</p>
                    <p>Thank you for reaching out! I appreciate your interest in my work.</p>
                    <p>I'm glad to hear you're interested in my portfolio. Let me know if you need further details.</p>
                    <p>${message}</p>
                    <p>If you'd like more information or have any further questions, feel free to ask. I'd be happy to help!</p>
                    <p>Looking forward to hearing from you.</p>
                    <p>Best regards,
                    <br>
                   ${isFoundAdmin.name}
                    </p>
                </body>
             </html>`
    })
    await Contact.findByIdAndUpdate(id, { status: "responded" })
    res.json({ message: "Reply send Success", })
})