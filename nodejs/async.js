const fs = require('fs');
const path = require('path');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile(path.resolve(__dirname, 'index.js'));
  const f2 = yield readFile(path.resolve(__dirname, 'thunk.js'));
  console.log(f1.toString());
  console.log(f2.toString());
};

console.log('-----------start--------------');
const genf = gen();
const a = genf.next();
a.value.then((data) => {
  const b = genf.next(data);
  b.value.then((data) => {
    genf.next(data);
  });
})
console.log('-----------end--------------');
console.log('-----------startNext--------------');
async function asss() {
  return 'hello world';
}
console.log(asss() + '123');
console.log('-----------startEnd--------------');