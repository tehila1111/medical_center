const MessagesTableService = require("../services/MessagesService");

exports.getAllMessagesTable = async (req, res) => {
  try {
    const MessagesTable = await MessagesTableService.getAllMessagesTable();
    res.json({ data: MessagesTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMessagesTable = async (req, res) => {
  try {
    
    const MessagesTable = await MessagesTableService.createMessagesTable(req.body.message);
    res.json({ data: MessagesTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMessagesTableById = async (req, res) => {
  try {
    const MessagesTable = await MessagesTableService.getMessageById(req.params.id);
    res.json({ data: MessagesTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMessagesTable = async (req, res) => {
  try {
    const MessagesTable = await MessagesTableService.updateMessagesTable(req.params.id, req.body);
    res.json({ data: MessagesTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMessagesTable = async (req, res) => {
  try {
    const MessagesTable = await MessagesTableService.deleteMessages(req.params.id);
    res.json({ data: MessagesTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
