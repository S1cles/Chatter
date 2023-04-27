const mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new mongoose.Schema(
        {
            message: {
                text: { type: String, required: true },
            },
            users: Array,
            sender: {
                type: String,
                ref: "User",
                required: true,
            },
        },
        {
            timestamps: true,
        }
    )
);
module.exports = Message;