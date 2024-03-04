const MainTable = require("../models/mainTable");
const RoomsTable = require("../models/roomsTable");

exports.getAllMainTable = async () => {
  return MainTable.find();
};


exports.getDoctorQueue = async () => {
  const roomId = await getDefaultRoomId('חדר רופא');
  return MainTable.find({ roomId }).sort({ turnId: 1 });
};

exports.getTriageQueue = async () => {
  const roomId = await getDefaultRoomId('חדר טריאג');
  return MainTable.find({ roomId }).sort({ turnId: 1 });
};

exports.getTreatmentQueue = async () => {
  const roomId = await getDefaultRoomId('חדר טיפולים');
  return MainTable.find({ roomId }).sort({ turnId: 1 });
};

exports.getEcgQueue = async () => {
  const roomId = await getDefaultRoomId('חדר אקג');
  return MainTable.find({ roomId }).sort({ turnId: 1 });
};

exports.getReceptionQueue = async () => {
  const roomId = await getDefaultRoomId('קבלה');
  return MainTable.find({ roomId }).sort({ turnId: 1 });
};

exports.createMainTable = async (name, clinic) => {
  try {
    const uniqueNumber = await generateNumber();
    const receptionRoomId = await getDefaultRoomId('קבלה');
    const turnId = await getTurnIdForRoom(receptionRoomId);

    const data = {
      "uniqueNumber": uniqueNumber,
      "name": name,
      "clinic": clinic,
      "roomId": receptionRoomId,
      "turnId": turnId
    };

    // Create MainTable entry
    const mainTableEntry = await MainTable.create(data); 
    

    return mainTableEntry;
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.getMainTableById = async (id) => {
  return MainTable.findById(id);
};

exports.updateMainTable = async (id, data) => {
  return MainTable.findByIdAndUpdate(id, data, { new: true });
};


exports.deleteMainTable = async (id) => {
  try {
    // Retrieve the current record from the MainTable
    const currentRecord = await MainTable.findById(id);

    if (!currentRecord) {
      throw new Error("MainTable record not found");
    }

    const roomId = currentRecord.roomId;



    // Delete the current record
    await MainTable.deleteOne({ _id: id });
    // Update turnId values for remaining records in the same room
    await updateTurnIds(roomId);
    return currentRecord;
  } catch (error) {
    console.error('Error deleting MainTable record:', error);
    throw error;
  }
};

// Function to update turnIds for a given room
async function updateTurnIds(roomId) {
  // Find all records in the same room and sort by turnId
  const roomRecords = await MainTable.find({ roomId }).sort({ turnId: 1 });

  // Update turnId values based on the new order
  for (let i = 0; i < roomRecords.length; i++) {
    const record = roomRecords[i];
    record.turnId = i + 1;
    await record.save();
  }
}

// Move to the end of the queue in another room
exports.moveToOtherRoom = async (mainTableId, otherRoomId) => {
  const currentRecord = await MainTable.findById(mainTableId);
  const totalPatientsInOtherRoom = await MainTable.countDocuments({ roomId: otherRoomId });
  const old_roomId = currentRecord.roomId;
  if (!currentRecord) {
    throw new Error("MainTable record not found");
  }

  // Calculate the patientTurnId based on the total number of patients
  const patientTurnId = totalPatientsInOtherRoom + 1;

  // Update the turnId and roomId fields
  currentRecord.turnId = patientTurnId;
  currentRecord.roomId = otherRoomId;

  // Save the updated record and update turnIds for both rooms
  await currentRecord.save();
  await updateTurnIds(old_roomId);
  await updateTurnIds(otherRoomId);

  return currentRecord;
};

// Move to the top of the queue in the same room
exports.moveTop = async (mainTableId, roomId) => {
  const currentRecord = await MainTable.findById(mainTableId);
  const oldRoomId = currentRecord.roomId;
  if (!currentRecord) {
    throw new Error("MainTable record not found");
  }

  // Update the turnId and roomId fields
  currentRecord.turnId = 1;
  currentRecord.roomId = roomId;

  // Save the updated record and update turnIds for the room
  const roomRecords = await MainTable.find({ roomId }).sort({ turnId: 1 });

  // Update turnId values based on the new order
  for (let i = 0; i < roomRecords.length; i++) {
    const record = roomRecords[i];
    record.turnId = record.turnId + 1;
    await record.save();
  }

  await currentRecord.save();
  await updateTurnIds(oldRoomId);
  return currentRecord;

};



exports.getQueueByRoomId = async (roomId) => {
  try {
    const roomQueue = await MainTable.find({ roomId });

    if (!roomQueue) {
      throw new Error("ישנה בעיה בתור....");
    }

    return roomQueue;
  } catch (err) {
    throw new Error(err.message);
  }
};

async function generateNumber() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const i = Math.floor(Math.random() * 10);
  const j = Math.floor(Math.random() * 26);
  const number = letters[j] + numbers[i];

  const mainTableEntries = await exports.getAllMainTable();

  if (!mainTableEntries.some(entry => entry.uniqueNumber === number)) {
    return number;
  } else {
    return generateNumber();
  }

}



async function getDefaultRoomId(roomName) {
  const receptionRoom = await RoomsTable.findOne({ room: roomName });
  if (receptionRoom) {
    return receptionRoom._id; // Assuming _id is the unique identifier for RoomsTable
  } else {
    throw new Error(`${roomName} not found in RoomsTable`);
  }
}

async function getTurnIdForRoom(roomId) {
  const queueLength = await MainTable.countDocuments({ roomId });
  return queueLength + 1;
}