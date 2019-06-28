function newAction() {
  const Obj = new Object(); // 创建一个新的对象
  const Constructor = [].shift.apply(arguments) // 获取需要新建的对象
  Obj.__proto__ = Constructor.prototype; // 将新对象的原型指向目标对象的原型
  const reset = Constructor.apply(Obj, arguments)
  console.log(Obj);
  return typeof ret=="object"? ret : Obj; //如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象
}

function Person({name = 123, age= 123}) {
  this.name = name;
  this.age = age;
  this.hello = function() {
    console.log(`${this.name},${this.age}`);
  }
}

const aa = newAction(Person, {name: 123, age: 333});
aa.hello();