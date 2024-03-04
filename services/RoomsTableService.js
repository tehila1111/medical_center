const RoomsTable = require("../models/roomsTable");


exports.getAllRoomsTable = async () => {
  return RoomsTable.find();
};

exports.createRoomsTable = async (name) => {
  const room = name;
  const data = {
    "room": room
  };

  return RoomsTable.create(data);
};


exports.getRoomsTableById = async (id) => {
  return RoomsTable.findById(id);
};

exports.updateRoomsTable = async (id, data) => {
  return RoomsTable.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteRoomsTable = async (id) => {
  return RoomsTable.findByIdAndRemove(id);
};

