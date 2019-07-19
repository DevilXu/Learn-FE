function Person(name, age) {
  this.name = name;
  this.age = age; 
}

const student = new Person('xlt', 20);

console.log('student拥有__proto__属性指向Person构造函数的的原形对象Person.prototype:' + (student.__proto__ === Person.prototype));
console.log('Person的原型对象拥有constructor指针指向Person构造函数本身：' + (Person.prototype.constructor === Person));
console.log('Person的原型对象包含__proto__属性指向Object.prototype:' + (Person.prototype.__proto__ === Object.prototype));
console.log('最终__proto__指向null:' + (Person.prototype.__proto__.__proto__ === null));

const teacher = {
  name: 'yy',
  age: '35'
};
console.log('普通对象的__prop__指向object.prototype:' + (teacher.__proto__ === Object.prototype));
console.log('构造函数Object的__proto__属性指向Function.prototype:' + (Object.__proto__ === Function.prototype));