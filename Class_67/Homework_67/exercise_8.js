'use strict';

const http = require('http');
let completeString = '';

http.get(process.argv[2], (response) => {
    response.setEncoding('utf8');
    response.on('error', console.log);
    response.on('data', (data) => {
        completeString += data;
    });
    response.on('end', () => {
        console.log(completeString.length);
        console.log(completeString);
    });
});