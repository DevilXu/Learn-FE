/**
 * 模拟call方法的实现
 */
function mockCallFactory() {
  Function.prototype.mockCall = function(...args) {
    const obj = args.shift(); // 获取第一个绑定的对象元素
    const source = obj['fn']; // 保存原有的fn函数
    obj.fn = this; // 将被调用的函数传递给fn
    obj.fn(...args); // 调用fn函数
    obj['fn'] = source; // 还原原有的fn参数
  }
}
mockCallFactory(); // 初始化绑定mockCall
var testObj = {
  x: 1,
  y: 2
}
function aa() {
  console.log(this.x + this.y);
};
aa.mockCall(testObj, 1, 2);