const mongoose = require("mongoose");

const caseSchema = mongoose.Schema({
    no: {
        type: Number,
        trim: true,
    },
    casetype: {
        type: String,
        trim: true,
    },
    yr: {
        type: Number,
        trim: true,
    },
    sno:{
        type: Number,
        trim: true,
    },
    law1:{
        type: String,
        trim: true,
    },
    croom:{
        type: Number,
        trim: true,
    },
    res:{
        type: String,
        trim: true,
    },
    case_no:{
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Case", caseSchema);