function fb(n) {
  if (n <= 1) return 1;
  return fb(n - 1) + fb( n - 2);
}
console.log(fb(1));
console.log(fb(2));
console.log(fb(3));
console.log(fb(4));


function formatNumber(str) {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


console.log(formatNumber('12341'));

[1,3,4].contains(4);

