const DEMO = [1, 3, 4, 5];
const iterator = DEMO[Symbol.iterator]();

console.log(iterator.next());


const OBJ = {
  data: [1, 2, 4],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
const objIterator = OBJ[Symbol.iterator]();
console.log(objIterator.next());