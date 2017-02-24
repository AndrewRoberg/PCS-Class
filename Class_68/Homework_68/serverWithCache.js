'use strict';

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript'
    },
    root = 'content/';
let cache = {};

http.createServer((request, response) => {
    console.log('serving', request.url);

    const ext = path.extname(request.url);
    if (ext && contentType[ext]) {
        response.setHeader('Content-type', contentType[ext]);
    }
    response.setHeader('X-Powered-By', 'PCS');

    if (cache[request.url]) {
        console.log('Serving from cache');
        cache[request.url].accessed = new Date();
        response.end(cache[request.url].data);
    } else {
        console.log('Serving from disk');
        fs.readFile(root + request.url, 'utf-8', (err, data) => {
            if (err) {
                response.setHeader('Content-type', contentType['.html']);
                if (err.code === 'ENOENT') {
                    response.statusCode = 404;
                    response.write('No such page. Sorry.<br><h1>404</h1>');
                } else {
                    response.statusCode = 500;
                }
                response.end(err.message);
                return;
            }
            cache[request.url] = {
                path: root + request.url,
                accessed: new Date(),
                data: data,
                loaded: new Date()
            };
            response.end(data);
        });
    }
}).listen(80);

setInterval(() => {
    const cutOff = new Date() - 500000;  //Keep the cache full long enough to test fs.stat()
 
    Object.keys(cache).forEach(key => {
        if (cache[key].accessed < cutOff) {
            return delete cache[key];
        }
        fs.stat(cache[key].path, (err, stats) => {
            if(err) {
                return console.error(err);
            }
            if(stats.mtime > cache[key].loaded) {
                delete cache[key];
            }
        });
        
    });
}, 5000);
