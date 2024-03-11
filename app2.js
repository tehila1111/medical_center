const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const mongoose = require('mongoose');
const cors = require('cors');

const http=require('http');
const server =http.createServer(app);
const {Server}=require("socket.io");
const io =new Server(server);


const uri = "mongodb+srv://medicalcentersystem1:medical1221@medicalcentercluster.28jmn5r.mongodb.net/?retryWrites=true&w=majority";

const mainTableRoutes = require('./routes/MainTableRoutes');
const roomsTableRoutes = require('./routes/RoomsTableRoutes');
const messagesTableRoutes = require('./routes/MessagesTableRoutes');
const reportTableRoutes = require('./routes/ReportRoutes');
const usersTableRoutes = require('./routes/UsersRoutes');




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


io.on('connection',(socket)=>{

    console.log('a user connected' ,socket.id)  
  
    socket.on('moveToOtherRoom',()=>{
        console.log('move to other room')
        socket.emit('updateQueue',()=>{
            console.log('send the update queue to the fronend')
    
        })
    })
  
})

server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
  