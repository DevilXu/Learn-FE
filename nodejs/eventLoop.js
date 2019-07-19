const chalk = require('chalk');
const fs = require('fs');
const log = console.log;

log('start eventloop');
setTimeout(() => {
  console.log('1');
}, 0);
// fs.readFile('./index.js', 'utf-8', (err, data) => {
//   console.log('3');
// });
setImmediate(() => {
  console.log('2');
});
log('end eventloop');