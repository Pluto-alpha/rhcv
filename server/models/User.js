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
        default: 'https://res.cloudinary.com/dv3i0t3u9/image/upload/v1704359682/ez15kkvzjtloqcfsyosx.jpg' //chnage to path when project in production 
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