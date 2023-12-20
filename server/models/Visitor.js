const mongoose = require("mongoose");
const moment = require("moment");


const visiterSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'required'],
        enum: ['Case-Hearing', 'General-Visitor', 'Contractor', 'Vendor', 'Guest']
    },
    passNo: {
        type: Number,
        trim: true,
        required: [true, 'required'],
    },
    visitorName:{
        type: String,
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
        enum: ['ADHAR CARD', 'PAN CARD', 'DRIVING LICENCE']

    },
    idProofNo: {
        type: String,
        required: [true, 'required'],
    },
    validOn: {
        type: Date,
        required: [true, 'required'],
        default: function () {
            return this.isNew ? moment().format("DD MMM YYYY, hh:mm A") : undefined;
        },
    },
    validUpTo: {
        type: Date,
        required: [true, 'required'],
        default: function () {
            return this.isNew ? moment().format("DD MMM YYYY, hh:mm A") : undefined;
        },
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Visitor", visiterSchema);