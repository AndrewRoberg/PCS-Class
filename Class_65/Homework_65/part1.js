'use strict';

const fs = require('fs');

function reverse(string) {
    let newString = '';
    for(let i = string.length - 1; i >= 0; i--) {
        newString += string.charAt(i);
    }
    return newString;
}

fs.readFile('reverseMe.txt', (error, data) => {
    console.log('Forwards:\n', data.toString(), '\nBackwords:\n', reverse(data.toString()));
});