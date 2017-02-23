'use strict';

const http = require('http'),
      url = require('url');

http.createServer((request, response) => {
     const theUrl = url.parse(request.url, true),
           date = new Date(theUrl.query.iso);
           
     response.setHeader('Content-Type', 'application/json');
     switch(theUrl.pathname) {
         case '/api/parsetime':
            response.end(JSON.stringify({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds()
            }));
            break;
         case '/api/unixtime':
            response.end(JSON.stringify({
                unixtime: date.getTime()
            }));
            break;
     }
}).listen(process.argv[2]);