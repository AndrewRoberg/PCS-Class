'use strict';

const events = require('events'),
      eventEmitter = new events.EventEmitter();

eventEmitter.on('second', () => {
    console.log(new Date().toLocaleTimeString());
});

setInterval(() => {
    eventEmitter.emit('second');
}, 1000);