const MainTableService = require("../services/MainTableService");
const RoomTableService =require('../services/RoomsTableService')

exports.getAllMainTable = async (req, res) => {
  try {
    const mainTableEntries = await MainTableService.getAllMainTable();
    res.json({ data: mainTableEntries, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorQueue = async (req, res) => {
  try {
    const doctorQueue = await MainTableService.getDoctorQueue();
    res.json({ data: doctorQueue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTriageQueue = async (req, res) => {
  try {
    const triageQueue = await MainTableService.getTriageQueue();
    res.json({ data: triageQueue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTreatmentQueue = async (req, res) => {
  try {
    const treatmentQueue = await MainTableService.getTreatmentQueue();
    res.json({ data: treatmentQueue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEcgQueue = async (req, res) => {
  try {
    const ecgQueue = await MainTableService.getEcgQueue();
    res.json({ data: ecgQueue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReceptionQueue = async (req, res) => {
  try {
    const ecgQueue = await MainTableService.getReceptionQueue();
    res.json({ data: ecgQueue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createMainTable = async (req, res) => {
  try {
    const { name, clinic } = req.body; // Destructure the name and clinic from the request body
    const mainTableEntry = await MainTableService.createMainTable(name, clinic);
    res.json({ data: mainTableEntry, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.moveToOtherRoom = async (req, res) => {
  try {
    const { mainTableId, otherRoomId } = req.body;
    const mainTableMove = await MainTableService.moveToOtherRoom(mainTableId, otherRoomId);
    res.json({ data: mainTableMove, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.moveTop = async (req, res) => {
  try {
    const { mainTableId, otherRoomId } = req.body;
    const mainTableMove = await MainTableService.moveTop(mainTableId, otherRoomId);
    res.json({ data: mainTableMove, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQueueByRoomId = async (req, res) => {
  try {
    const roomId = req.params.id;
    const roomQueue = await MainTableService.getQueueByRoomId(roomId);
    res.json({ data: roomQueue, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getMainTableById = async (req, res) => {
  try {
    const mainTableEntry = await MainTableService.getMainTableById(req.params.id);
    const roomName = await RoomTableService.getRoomsTableById(mainTableEntry.roomId)
    res.json({ data: mainTableEntry, room: roomName, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMainTable = async (req, res) => {
  try {
    const mainTableEntry = await MainTableService.updateMainTable(req.params.id, req.body);
    res.json({ data: mainTableEntry, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMainTable = async (req, res) => {
  try {
    const mainTableEntry = await MainTableService.deleteMainTable(req.params.id);
    res.json({ data: mainTableEntry, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



