const mongoose = require("mongoose");

const visiterSchema = mongoose.Schema({
    type: {
        type: String,
        trim: true,
        required: [true, 'required']
    },
    passNo: {
        type: Number,
        trim: true,
        required: [true, 'required'],
    },
    fatherName: {
        type: String,
        trim: true,
        required: [true, 'required'],
    },
    advocateName: {
        type: String,
        trim: true,
        required: [true, 'required'],
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'required'],
    },
    mobile: {
        type: String,
        trim: true,
        unique: [true, 'Phone is already exist'],
        required: [true, 'required'],
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Email is already exist'],
        required: [true, 'required']
    },
    idProofType: {
        type: String,
        required: [true, 'required'],
    },
    idProofNo: {
        type: String,
        required: [true, 'required'],
    },
    validUpTo:{
        type:String,
        required: [true, 'required'],
    },
    validOn:{
        type:String,
        required: [true, 'required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Visitor", visiterSchema);