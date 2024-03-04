const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomsTableSchema = new Schema({
    room: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'active',
    },
});

module.exports = mongoose.model("RoomsTable", RoomsTableSchema);
