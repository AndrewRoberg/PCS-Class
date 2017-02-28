'use strict';

const fs = require('fs');
      
module.exports = (req, res, next) => {
    fs.readFile('./' + req.url, 'utf-8', (err, data) => {
        if(err) {
            return next();
        }
        res.send(data);
    });
};