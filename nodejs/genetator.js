function* aa() {
  const one = yield 1;
  console.log(one);
  // return 'haha';
  const two = yield 2;
  console.log(two);
  console.log('Hello' + (yield 123)); // OK
}


const bb = aa();
console.log(bb.next());
bb.throw('error is appear');
console.log(bb.next('haha'));
bb.next(13);
bb.next(11);