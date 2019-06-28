// mypromise 模拟promise实现原理（最简单版本，仅供自身学习使用）
function MyPromise(fn) {
  if (this instanceof MyPromise === false) console.log('must be init by new operate'); // 必须用new操作符进行初始化
  this.state = 'pending'; // promise 的内部状态转换，pending fullfilled, reject
  this.thenCb; // 记录then方法的回调函数
  this.data; // 记录返回的数据
  this.subResolve; // 积累下一个promise方法的resolve方法

  /**
   * 模拟resole方法
   * 第一步 将状态设置为完成 FULFILLED
   * 第二步 设置内部的传递数据
   * 第三部 触发记录的then回调方法
   */
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
  /**
   * 模拟then方法
   * 判断当前promise是否已完成，如果状态为FULFILLED，执行传递的then回调方法
   * 判断返回参数是否为promise对象，如果是，需要将保存的下一步promise的resolve需要传递到返回的promise
   * 对象中，确保返回的promise执行完成后再执行下一步返回的promise；如果返回普通值，就调用下一步的promise对象的resolve方法
   * 如果promise状态是未完成，则记录then对象的回调函数，并返回新的promise对象，完成链式调用。
   * 
   */
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