const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'required']
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Email is already exist'],
        required: [true, 'required']
    },
    phone: {
        type: String,
        trim: true,
        unique: [true, 'Phone is already exist'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'required']
    },
    image: {
        type: String,
        default: `https://${process.env.IP}:5001/files/user.jpeg` //change to path when project in production 
    },
    role: {
        type: String,
        default: 'Receptionist',
        enum: ["Admin", "Receptionist"],
    },
    enabled: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);