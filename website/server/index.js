const express = require('express');
const cors = require('cors');
const http = require('http');
const fs = require("fs");
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

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json())
app.use(cors());
const server = http.createServer(app);


let beat = 0;
parser.on('data', (data) => {
  beat = parseInt(data);

})
app.get("/message", (req, res) => {  
    res.json({ message: parseInt(beat)});
});

app.post("/emotions", (req, res) => {  
  console.log(req.body);
  fs.writeFileSync("test.txt", JSON.stringify(req.body));
  res.json({message: "success"});
}); //write and read from a text file
app.get("/emotions", (req, res) => {  
  const data = fs.readFileSync("test.txt");
  res.json(data);
});


server.listen(PORT, () => console.log(`server has started on port ${PORT}`));

