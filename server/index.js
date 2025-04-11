const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.NODE_ENV === "development"
        ? process.env.LIVE_SERVE
        : process.env.LOCAL_SERVER,
    credentials: true
}))

app.use("/api/gmail", require('./routes/gmail.routes'))  // ✅ Add this line  for google Oauth
app.use("/api/auth", require('./routes/auth.routes'))

app.use((req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
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