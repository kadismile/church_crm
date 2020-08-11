require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const cors = require('cors');
const io = socketIo(server);
const mongoose = require('mongoose');
const passport = require('passport');
const colors = require('colors');
const connectDb = require('./config/db');

require('./config/passportConfig'); //very important to use passport
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//connect to the database

connectDb();

app.use('/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/church', require('./routes/church'));
app.use('/api/v1/webhook', require('./routes/webhook'));


io.on('connection', (socket) => {
  socket.on('greet', greeting => {
    console.log(greeting.redBG)
  })
});


const port = 5000;
server.listen(port, () => console.log(`server started on port ${port}`.bgCyan));


module.exports = server;
