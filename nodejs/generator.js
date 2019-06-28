const fs = require('fs');
const path = require('path');

function Thunk(fn) {
  return function(...params) {
    var args = new Array(params.length);
    var ctx = this;
    for (var i = 0; i < args.length; ++i) {
      args[i] = params[i];
    }
    return function(done) {
      args.push(done);
      fn.apply(ctx, args);
    }
  }
}

const readf = Thunk(fs.readFile);

function* reads() {
  yield readf(path.resolve(__dirname, 'index.js'), 'utf-8');
  yield readf(path.resolve(__dirname, 'thunk.js'), 'utf-8');
}

const readssss = reads();
const val1 = readssss.next();
console.log(val1.value.toString());
val1.value((err, data) => {
  const val2 = readssss.next();
  console.log(val2.value.toString());
});