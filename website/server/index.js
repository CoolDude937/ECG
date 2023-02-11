const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');
const http = require('http');
const {ReadlineParser} = require('@serialport/parser-readline');

//for collecting data from the a rduino post
const { SerialPort } = require('serialport')
const parsers = SerialPort.parsers;

const port = new SerialPort({
    path:'COM3',
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
})
    

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server (server, {
  cors:{
    origin: "https://localhost:3000",
    methods:["GET"]
  }
}); //instance of socket io



//io.on("connection", (socket) => {
//  console.log("node is listening to the port")
//})

//app.get("/message", (req, res) => {  
//    res.json({ message: "here is a message again hiyu"});
// });

//parser.on('data', (data) => {
//  io.emit('data', data);
//})

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));

