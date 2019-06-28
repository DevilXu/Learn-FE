/**
 * 模拟js bind方法的实现
 */
const OBJ1 = {
  x: 1,
  y: 2
}
const OBJ2 = {
  x: 4,
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
const bindAdd = add.mockBind(OBJ1).mockBind(OBJ2);
bindAdd(4);