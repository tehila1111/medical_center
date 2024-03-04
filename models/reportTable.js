const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportTableSchema = new Schema({
    date: {
        type: String
    },

    clinic1: {
        type: Number,
        default: 0

    },
    clinic2: {
        type: Number,
        default: 0

    },
    clinic3: {
        type: Number,
        default: 0

    },
    clinic4: {
        type: Number, 
        default: 0

    },
    clinic5: {
        type: Number,
        default: 0
    },
    patientsAmount: {
        type: Number,
    },

});

module.exports = mongoose.model("ReportTable", ReportTableSchema);