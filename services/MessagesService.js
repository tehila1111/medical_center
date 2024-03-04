const MessagesTable = require("../models/messages");


exports.getAllMessagesTable = async () => {
  return MessagesTable.find();
};

exports.createMessagesTable = async (message) => {
  const data = {
    "message": message
  };

  return MessagesTable.create(data);
};


exports.getMessageById = async (id) => {
  return MessagesTable.findById(id);
};

exports.updateMessage = async (id, data) => {
  return MessagesTable.findByIdAndUpdate(id, data, { new: true });
};

// Instead of findByIdAndRemove
exports.deleteMessages = async (id) => {
  // Use findOneAndDelete
  return MessagesTable.findOneAndDelete({ _id: id });
};
