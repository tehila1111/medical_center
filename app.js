const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const mainTableRoutes = require('./routes/MainTableRoutes');
const roomsTableRoutes = require('./routes/RoomsTableRoutes');
const messagesTableRoutes = require('./routes/MessagesTableRoutes');
const reportTableRoutes = require('./routes/ReportRoutes');
const usersTableRoutes = require('./routes/UsersRoutes');



const uri = "mongodb+srv://medicalcentersystem1:medical1221@medicalcentercluster.28jmn5r.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use(express.json());
app.use(cors());


// Use the MainTable routes
app.use('/roomsTable',roomsTableRoutes);
app.use('/main-table', mainTableRoutes);
app.use('/messageTable', messagesTableRoutes);
app.use('/reportTable', reportTableRoutes);
app.use('/users',usersTableRoutes);


app.listen(3001, () => {
  console.log("Server started at port 3001");
});

