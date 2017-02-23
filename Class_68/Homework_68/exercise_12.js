'use strict';

const http = require('http'),
      map = require('through2-map');

http.createServer((request, response) => {
     if(request.method !== 'POST') {
         return response.end('You must send a POST!');
     }
     request.pipe(map(chunk => {
         return chunk.toString().toUpperCase();
     })).pipe(response);
}).listen(process.argv[2]);