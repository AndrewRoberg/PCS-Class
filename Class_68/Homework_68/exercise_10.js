'use strict';

const net = require('net'),
      strftime = require('strftime');

net.createServer((socket) => {
    socket.end(strftime('%F %H:%M', new Date()) + '\n'); 
}).listen(process.argv[2]);