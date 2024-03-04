const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainTableSchema = new Schema({
  uniqueNumber: {
    type: String,
  },
  name: {
    type: String,
  },
  clinic: {
    type: String,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "RoomsTable",
  },
  turnId: {
    type: Number,
  },
  enterTime: {
    type: Date, // Use the Date type for date/time values
    default: Date.now, // Set a default value if needed
  },
});

module.exports = mongoose.model("MainTable", mainTableSchema);







