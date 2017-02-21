'use strict';

const http = require('http');
let totalContent = [],
    loadCounter = 0;

function myGet(url, i) {
    let completeString = '';
    http.get(url, (response) => {
        response.setEncoding('utf8');
        response.on('error', console.log);
        response.on('data', (data) => {
            completeString += data;
        });
        response.on('end', () => {
            totalContent[i] = completeString;
            
            if(++loadCounter === process.argv.length -2) {
                totalContent.forEach((content) => {
                    console.log(content);
                    });
            }
        });
    });
}

for(let i = 2; i < process.argv.length; i++) {
    myGet(process.argv[i], i - 2);
}