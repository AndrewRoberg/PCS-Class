'use strict';

const app = require('express')();

app.get('/', (req, res) => {
    res.end('This is the root route.');
});

app.use(require('./fileFinder'));

app.listen(80);