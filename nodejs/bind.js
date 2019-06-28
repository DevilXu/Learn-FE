/**
 * 模拟js bind方法的实现
 */
const OBJ = {
  x: 1,
  y: 2
}
function add(y) {
  console.log(this.x + y);
}
function mockBind() {
  Function.prototype.mockBind = function(content) {
    content['fn'] = this;
    return function(...args) {
      content['fn'](...args);
    }
  }
}
mockBind();


const bindAdd = add.mockBind(OBJ);
bindAdd(4);