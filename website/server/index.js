const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io')
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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods:["GET"],
  }
});

let beat = 0;
parser.on('data', (data) => {
  beat = parseInt(data);

})
app.get("/message", (req, res) => {  
    res.json({ message: parseInt(beat)});
});

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));

