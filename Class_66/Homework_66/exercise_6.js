'use strict';

const fileModule = require('./module_6.js'),
      dir = process.argv[2],
      extention = process.argv[3];

fileModule(dir, extention, (err, data) => {
      if(err) {
            return console.error(err);
      }
      data.forEach(file => {
            console.log(file);
      });
});