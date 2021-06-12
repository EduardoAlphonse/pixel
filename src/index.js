// console.log('Initializing client...');
require('./client');
// console.log('# Client READY! #\n');

// console.log('Initializing commands...');
require('./bot_modules/commands');
// console.log('# Commands READY! #\n');

// console.log('Initializing events...');
require('../src/events');
// console.log('# Events READY! #\n');
