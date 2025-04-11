const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String },
    age: { type: Number },
    Address: { type: String },
    pinCode: { type: Number },
    GithubProfile: { type: String },
    LinkedInProfile: { type: String },
    TwitterProfile: { type: String },
    FaceBookProfile: { type: String },
    InstagramProfile: { type: String },
    About: { type: String },
    AboutHeading: { type: String },
    skills: {
        Frontend: { type: [String] },
        Backend: { type: [String] },
        MobileApp: { type: [String] },
    },
    // education: [
    //     {
    //         std: { type: String },
    //         degree: { type: String },
    //         University: { type: String },
    //         passingYear: { type: String },
    //         percentage: { type: String },
    //     },
    // ],
    languages: [
        {
            language: { type: String },
            proficiency: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] }
        }
    ],
    isDelete: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model("Admin", adminSchema) 