const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    shortDesc: { type: String, required: true, },
    description: { type: String, required: true, },
    isMobileApp: { type: Boolean, },
    technologies: {
        frontend: { type: [String], required: false },
        backend: { type: [String], required: false },
        mobile: { type: [String], required: false },
        hosting: { type: [String], required: false },
        collaboration: { type: [String], required: false },
    },
    link: {
        type: String, // URL to the live project or demo
        required: false,
    },
    repository: {
        type: String, // URL to the code repository
        required: false,
    },
    features: {
        type: [String], // List of key features of the project
        required: false,
    },
    duration: {
        type: String, // Duration of project development (e.g., "3 months")
        required: false,
    },
    learning: {
        type: String, // Key learning points from the project
        required: false,
    },
    hero: {
        type: String, // URL or path to the main image of the project
        required: false,
    },
    role: {
        type: String, // Role in the project (e.g., "Full-stack Developer")
        required: false,
    },
    challenges: {
        type: String, // Key challenges faced and solutions
        required: false,
    },
    source: {
        type: String, // Source or repo URL for the code
        required: false,
    },
    live: {
        type: String, // Live demo URL of the project
        required: false,
    },
    isDelete: { type: Boolean, default: false },
    screenshots: {
        web: {
            main: { type: String, required: false },
            other: { type: [String], required: false },
        },
        mobile: {
            main: { type: String, required: false },
            other: { type: [String], required: false },
        },
    },
    sections: {
        web: [
            {
                title: { type: String },
                desc: { type: String },
                hero: { type: String },
            }
        ],
        mobile: [
            {
                title: { type: String },
                desc: { type: String },
                hero: { type: String },
            }
        ],
    },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);