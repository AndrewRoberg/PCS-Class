'use strict';

const fs = require('fs'),
      dir = process.argv[2],
      extention = process.argv[3];

fs.readdir(dir, 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }

    data.filter(file => {
        return file.split('.')[1] === extention;
    }).forEach(file => {
        console.log(file);
    });
});