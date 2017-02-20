'use strict';

const fs = require('fs');

function filterExtension(data, extention) {
      return data.filter(file => {
            return file.split('.')[1] === extention;
      });
}

module.exports = function(dir, extention, callback) {
      fs.readdir(dir, 'utf8', (err, data) => {
            if(err) {
                  return callback(err);
            }
            callback(null, filterExtension(data, extention));
      });
};

