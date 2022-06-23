const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // _id: {type: ObjectId},
    email: {type: String, required: true},
    password: {type: String, required: true},
    entreDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("User", userSchema);