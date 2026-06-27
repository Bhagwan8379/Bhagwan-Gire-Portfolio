const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()



app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.LOCAL_SERVER,
            process.env.LIVE_SERVER,
            "http://localhost:5173",
            "http://localhost:5000",
            "https://bhagwan-gire-portfolio.vercel.app",
            "https://bhagwan-gire-portfolio-server.vercel.app"
        ].filter(Boolean);
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.startsWith('http://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/contact", require('./routes/contacts.routes'))
app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/projects", require('./routes/project.routes'))
app.use("/api/education", require('./routes/education.routes'))

app.use((req, res) => {
    res.status(404).json({ message: "Resource Not Found 404" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})
const seedData = async () => {
    try {
        const Auth = require("./model/Auth");
        const Projects = require("./model/Projects");
        const Education = require("./model/Education");
        const bcrypt = require("bcryptjs");

        // 1. Seed Admin
        const adminCount = await Auth.countDocuments();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash("Admin@12345", 10);
            await Auth.create({
                name: "Bhagwan Gire",
                email: "bhagwangire05@gmail.com",
                mobile: "9876543210",
                password: hashedPassword
            });
            console.log("Seeded default admin user successfully.");
        }

        // 2. Seed Projects
        const projectCount = await Projects.countDocuments();
        if (projectCount === 0) {
            await Projects.create([
                {
                    name: "Personal Portfolio",
                    desc: "A premium animated personal portfolio showcase built with React, Framer Motion, and Tailwind CSS.",
                    technology: ["React", "Redux", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB"],
                    hero: "https://res.cloudinary.com/dmolheokh/image/upload/v1744097393/Bhagwan_au3zhm.jpg",
                    onlineLink: "https://bhagwan-gire-portfolio.vercel.app"
                },
                {
                    name: "Matic UI App",
                    desc: "A full-featured application developed during my 6-month internship at Matic UI.",
                    technology: ["React Native", "Expo", "React Native Paper", "Redux Toolkit"],
                    hero: "https://res.cloudinary.com/dmolheokh/image/upload/v1744097393/Bhagwan_au3zhm.jpg",
                    onlineLink: "https://github.com/Bhagwan8379"
                }
            ]);
            console.log("Seeded default projects successfully.");
        }

        // 3. Seed Education
        const educationCount = await Education.countDocuments();
        if (educationCount === 0) {
            await Education.create([
                {
                    degree: "Bachelor’s in Computer Science",
                    stream: "Computer Science",
                    institute: "Dr. Babasaheb Ambedkar Marathwada University",
                    year: "2021 - 2024",
                    college: "Dr. Babasaheb Ambedkar Marathwada University"
                },
                {
                    degree: "HSC",
                    stream: "Science",
                    institute: "State Board",
                    year: "2019 - 2021",
                    college: "State Board College"
                }
            ]);
            console.log("Seeded default education successfully.");
        }
    } catch (err) {
        console.error("Error seeding data:", err);
    }
};

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", async () => {
    console.log("MONGO CONNECTED 🥭")
    await seedData()
    app.listen(process.env.PORT, console.log("Server Running 🏃‍♀️"))
})

module.exports = app

