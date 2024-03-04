const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'active',
    },
});

module.exports = mongoose.model("Users", UsersSchema);
