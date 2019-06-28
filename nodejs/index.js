console.log('start');
setImmediate(function immediate () {
  console.log('immediate');
});
setTimeout(() => {
  console.log('timeout');
  new Promise((res, rej) => {
    console.log('innerpromise');
    res();
  }).then(() => {
    console.log('timeout123');
  })
}, 0)
new Promise((resolve, reject) => {
  console.log('firsr promise');
  new Promise((res, rej) => {
    console.log('timeout promise');
    res();
  }).then(() => {
    console.log('timeout promise then');
  });
  resolve(123);
}).then((res) => {
  console.log('firsr promise then');
});
process.nextTick(() => {
  console.log('First nexttick');
})
console.log('end');
