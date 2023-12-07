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
        type:String,
        default:'https://res.cloudinary.com/dv3i0t3u9/image/upload/v1701864592/user-images/bx0rzcfckip5hhzuonxb.jpg'
    },
    role: {
        type: String,
        default:'Receptionist',
        enum: ["Admin", "Receptionist"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);