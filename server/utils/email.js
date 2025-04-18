const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async ({ email, subject, message }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Bhagwan Gire" <${process.env.FROM_EMAIL} >`,
            to: email,
            subject: subject,
            html: message,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", result.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = sendEmail;
