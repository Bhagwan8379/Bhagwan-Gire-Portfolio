const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")
const { app, httpServer } = require("./socket/socket")
require("dotenv").config({ path: "./.env" })

// const app = express()
app.use(cors({
    origin: true,
    // origin: process.env.NODE_ENV === "development"
    //     ? process.env.LOCAL_SERVER
    //     : process.env.LIVE_SERVER,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.static("dist"))

app.use("/api/v1/auth", require("./routes/auth.routes"))
app.use("/api/v1/admin", require("./routes/admin.routes"))
app.use("/api/v1/project", require("./routes/project.routes"))
app.use("/api/v1/feedback", require("./routes/feedback.routes"))
app.use("/api/v1/comment", require("./routes/comment.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
    // res.sendFile(path.join(__dirname, "dist", "index.html"))
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "SERVER ERROR", error: err.message })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED 🔗")
    httpServer.listen(process.env.PORT, console.log("SERVER RUNNING 🏃‍♂️"))
})