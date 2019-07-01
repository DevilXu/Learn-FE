var aa = {
  b: 123
};

Object.defineProperty(aa, 'a', {
  get: function() {
    return this.b;
  }
})
aa.b = 456;
console.log(aa.b);

