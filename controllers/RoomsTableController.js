const RoomsTableService = require("../services/RoomsTableService");

exports.getAllRoomsTable = async (req, res) => {
  try {
    const RoomsTable = await RoomsTableService.getAllRoomsTable();
    res.json({ data: RoomsTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRoomsTable = async (req, res) => {
  try {
    
    const RoomsTable = await RoomsTableService.createRoomsTable(req.body.name);
    res.json({ data: RoomsTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getRoomsTableById = async (req, res) => {
  try {
    const RoomsTable = await RoomsTableService.getRoomsTableById(req.params.id);
    res.json({ data: RoomsTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoomsTable = async (req, res) => {
  try {
    const RoomsTable = await RoomsTableService.updateRoomsTable(req.params.id, req.body);
    res.json({ data: RoomsTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRoomsTable = async (req, res) => {
  try {
    const RoomsTable = await RoomsTableService.deleteRoomsTable(req.params.id);
    res.json({ data: RoomsTable, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
