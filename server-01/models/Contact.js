const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String },
    message: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ['pending', 'responded'], default: "pending" },
    isDelete: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Contact', ContactSchema);