'use strict';

const http = require('http'),
      fs = require('fs'),
      readStream = fs.createReadStream(process.argv[3], 'utf-8');

http.createServer((request, response) => {
     response.setHeader('Content-type', 'text/plain');
     readStream.pipe(response);
}).listen(process.argv[2]);