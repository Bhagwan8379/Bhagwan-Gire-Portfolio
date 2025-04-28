const expressAsyncHandler = require("express-async-handler")
const validator = require("validator")
// const { CheckEmpty } = require("../utils/CheckEmpty")
const Contacts = require("../model/Contacts")
const sendEmail = require("../utils/email")
const { CheckEmpty } = require("../utils/checkEmpty")


exports.sendMessage = expressAsyncHandler(async (req, res) => {
    const { name, email, message } = req.body
    const { isError, error } = CheckEmpty({ name, email, message })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Enter a Valid Email" })
    }
    await Contacts.create({ name, email, message })
    // senders
    sendEmail({
        email: process.env.MY_EMAIL,
        subject: "New Message From Portfolio!",
        message: `
        <div style="background: linear-gradient(135deg, #B799FF, #FFB6C1); padding: 50px; border-radius: 25px; max-width: 700px; margin: auto; font-family: 'Arial', sans-serif; box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);">
            <div style="text-align: center;">
                <img src="https://cdn.vectorstock.com/i/1000v/05/98/new-update-neon-text-sign-vector-24280598.jpg" alt="New Message" style="width: 100%; max-width: 400px; border-radius: 50px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); margin-bottom: 30px; transition: transform 0.3s ease-in-out;" />
                <h1 style="color: #4B0082; font-size: 36px; font-weight: bold; margin-top: 20px;">
                    ✨ New Message from Your Portfolio! ✨
                </h1>
                <div style="margin-top: 25px; width: 80%; height: 2px; background: linear-gradient(to right, #8A2BE2, #FF6347); margin: 20px auto;"></div>
                <div style="padding: 20px; border-radius: 12px; margin-top: 20px;">
                    <p style="color: #FFFFFF; font-size: 16px;"><strong>Name:</strong>${name} </p>
                    <p style="color: #FFFFFF; font-size: 16px;"><strong>Email:</strong>${email} </p>
                    <p style="color: #FFFFFF; font-size: 16px;"><strong>Message:</strong> ${message}</p>
                </div>
            </div>
        </div>
    `
    });

    //  Reciever
    sendEmail({
        email: email,
        subject: "Thank You for Visiting My Portfolio!",
        message: `
              <div style="background: linear-gradient(145deg, #f3e7e9, #e3eeff); padding: 40px; border-radius: 20px; border: 1px solid #ddd; max-width: 640px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; box-shadow: 0 0 30px rgba(243, 200, 107, 0.2);">
                <div style="text-align: center; animation: fadeIn 2s ease-in-out;">
                  <img src="https://i.pinimg.com/736x/62/01/46/620146239c4a81b748ef454ddd27ab4c.jpg" alt="VIP Thank You" style="max-width: 100%; border-radius: 15px; box-shadow: 0 8px 30px rgba(255, 215, 0, 0.15); transition: transform 0.3s ease-in-out;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
                  <h1 style="color: #d4af37; font-size: 34px; font-weight: bold; letter-spacing: 1px; margin: 20px 0;">
                     ✨ Thank You for Visiting! ✨
                 </h1>
                   <p style="font-size: 17px; color: #444; line-height: 1.6; margin-top: 10px;">
                    I truly appreciate your time and interest in exploring my portfolio.<br/>
                    It's always a pleasure to share my work and vision with like-minded professionals like you.
                  </p>
                   <p style="font-size: 16px; color: #666; margin-top: 15px;">
                    If you’d like to discuss potential opportunities or collaborations, feel free to reply to this email or reach out directly anytime.
                  </p>
                  <hr  style="margin: 35px auto; width: 80%; height: 1px; background: linear-gradient(to right, #e6b980, #f1e767, #e6b980);"/>
                  <p style="font-size: 15px; color: #555; line-height: 1.8;">
                    <strong style="color: #d4af37; font-size: 16px;">Bhagwan Gire</strong><br/>
                    <span style="font-size: 15px; color: #777;">FullStack Developer | Mobile App Developer</span><br/>
                    📧 <a href="mailto:bhagwangire05@gmail.com" style="color: #c49b0b; text-decoration: none;">bhagwangire05@gmail.com</a><br/>
                    📞 <span  href="tel:+918379832391" style="color: #c49b0b;">+91 8379832391</span>
                  </p>
                </div>
              </div>
            `
    });
    res.status(200).json({ message: "Message Send Success" })
})

exports.deleteMessage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    await Contacts.findByIdAndDelete(id)
    res.status(200).json({ message: "Message Delete Success" })
})

exports.getAllMessage = expressAsyncHandler(async (req, res) => {
    const result = await Contacts.find()
    res.status(200).json({ message: "Message Fetch Success", result })
})