const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesTableSchema = new Schema({
    message: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'active',
    },
});

module.exports = mongoose.model("MessagesTable", MessagesTableSchema);
