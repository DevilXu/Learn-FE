// mypromise 模拟promise实现原理（最简单版本，仅供自身学习使用）
function MyPromise(fn) {
  if (this instanceof MyPromise === false) console.log('must be init by new operate');
  this.state = 'pending';
  this.thenCb;
  this.data;
  this.subResolve;

  this.resolve = (data) => {
    this.state = 'FULFILLED'
    this._setValue(data);
    if (typeof this.thenCb === 'function') {
      this.then(this.thenCb);
    } 
  }
  this.reject = () => {
    console.log('reject');
  }
  this.then = (fn) => {
    if (this.state === 'FULFILLED') {
      const returnVal = fn.call(this, this._getValue());
      if (typeof returnVal === 'object' && returnVal.then){
        returnVal.then(this.subResolve);
      } else {
        this._setValue(returnVal);
        if (typeof this.subResolve === 'function') {
          this.subResolve(returnVal);
        }
      }
    } else {
      this.thenCb = fn;
      return new MyPromise((resolve, reject) => {
        if (this.state === 'FULFILLED')
          resolve(this.data);
        else this.subResolve = resolve;
      });
    }
  }
  this._getValue = () => {
    return this.data;
  }
  this._setValue = (val) => {
    this.data = val;
  };
  fn.call(this, this.resolve, this.reject);
}

const test = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 3000);
}).then((data) => {
  return new MyPromise((resolve, reject) => {
    console.log(data);
    resolve(123 + 321)
  });
}).then((data) => {
  console.log(data);
  return data + 333;
}).then((data) => {
  console.log(data);
});