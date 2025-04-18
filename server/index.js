const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()


const allowedOrigin = process.env.NODE_ENV === "development"
    ? process.env.LOCAL_SERVER || "http://localhost:5000"
    : process.env.LIVE_SERVER || "https://bhagwan-gire-portfolio.vercel.app"

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/gmail", require('./routes/gmail.routes'))  // ✅ Add this line  for google Oauth
app.use("/api/contact", require('./routes/contacts.routes'))
app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/projects", require('./routes/project.routes'))

app.use((req, res) => {
    res.status(404).json({ message: "Resource Not Found 404" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED 🥭")
    app.listen(process.env.PORT, console.log("Server Running 🏃‍♀️"))
})


