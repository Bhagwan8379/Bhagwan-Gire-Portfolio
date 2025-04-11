const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String },
    password: { type: String, required: true },

}, { timestamps: true })

module.exports = mongoose.model("Auth", authSchema) 