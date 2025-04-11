const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mobile: { type: String },
        age: { type: Number },
        address: { type: String },
        pinCode: { type: Number },
        githubProfile: { type: String },
        linkedInProfile: { type: String },
        twitterProfile: { type: String },
        facebookProfile: { type: String },
        instagramProfile: { type: String },
        about: { type: String },
        aboutHeading: { type: String },
        skills: {
            frontend: { type: [String] },
            backend: { type: [String] },
            mobileApp: { type: [String] },
            other: { type: [String] }, // Additional skills (e.g., DevOps, UI/UX)
        },
        experience: [
            {
                company: { type: String },
                role: { type: String },
                duration: { type: String }, // e.g., "Jan 2020 - Dec 2023"
                description: { type: String },
            },
        ],
        projects: [
            {
                title: { type: String },
                description: { type: String },
                technologies: { type: [String] },
                link: { type: String },
            },
        ],
        education: [
            {
                degree: { type: String },
                university: { type: String },
                passingYear: { type: String },
                percentage: { type: String },
            },
        ],
        languages: [
            {
                language: { type: String },
                proficiency: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
            },
        ],
        hourlyRate: { type: Number }, // Optional: Hourly rate for freelancers
        availability: { type: String, enum: ["Full-time", "Part-time", "Freelance"] },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
